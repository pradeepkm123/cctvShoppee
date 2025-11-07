// const Chat = require('../models/Chat');
// const Message = require('../models/Message');
// const socket = require('../socket');

// exports.getAllChatsForAdmin = async (req, res) => {
//   try {
//     const chats = await Chat.find().populate('userId', 'name email').sort({ updatedAt: -1 });
//     res.json({ success: true, data: chats });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// exports.getChatMessages = async (req, res) => {
//   try {
//     const chatId = req.params.chatId;
//     if (!chatId) return res.status(400).json({ success: false, message: 'chatId missing' });
//     const messages = await Message.find({ chatId }).sort({ createdAt: 1 });
//     res.json({ success: true, data: messages });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// exports.sendMessage = async (req, res) => {
//   try {
//     const { text, sender } = req.body;
//     const userId = req.params.userId;

//     if (!userId || userId === 'undefined' || userId === 'null') {
//       return res
//         .status(400)
//         .json({ success: false, message: 'Valid userId is required' });
//     }

//     if (!text) {
//       return res
//         .status(400)
//         .json({ success: false, message: 'Message text is required' });
//     }

//     // ✅ find or create chat
//     let chat = await Chat.findOne({ userId });
//     if (!chat) chat = await Chat.create({ userId });

//     // ✅ create message
//     const newMsg = await Message.create({
//       chatId: chat._id,
//       sender,
//       text,
//     });

//     // ✅ update chat metadata
//     chat.lastMessage = text;
//     chat.lastMessageTime = new Date();
//     if (sender === 'user') chat.unreadCount += 1;
//     await chat.save();

//     // ✅ emit socket event (safe way)
//     try {
//       const io = socket.getIO();
//       io.emit('newMessage', {
//         chatId: chat._id,
//         text,
//         sender,
//         timestamp: newMsg.timestamp,
//       });
//     } catch (e) {
//       console.warn('⚠️ Socket.IO emit skipped: not initialized yet');
//     }

//     res.json({ success: true, data: newMsg });
//   } catch (err) {
//     console.error('❌ Send message error:', err.message);
//     res
//       .status(500)
//       .json({ success: false, message: err.message });
//   }
// };
// exports.findOrCreateChat = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     if (!userId) return res.status(400).json({ success: false, message: 'userId required' });
//     let chat = await Chat.findOne({ userId });
//     if (!chat) chat = await Chat.create({ userId });
//     res.json({ success: true, chat });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };




const Chat = require('../models/Chat');
const Message = require('../models/Message');
const socket = require('../socket');

// Get all chats for admin (exclude deleted chats)
exports.getAllChatsForAdmin = async (req, res) => {
  try {
    const chats = await Chat.find({ isActive: true })
      .populate('userId', 'name email')
      .sort({ updatedAt: -1 });
    res.json({ success: true, data: chats });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get chat messages (exclude deleted messages)
exports.getChatMessages = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    if (!chatId) return res.status(400).json({ success: false, message: 'chatId missing' });
    
    const messages = await Message.find({ 
      chatId, 
      isDeleted: false 
    }).sort({ createdAt: 1 });
    
    res.json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Send message (automatically saves history for logged-in users)
exports.sendMessage = async (req, res) => {
  try {
    const { text, sender } = req.body;
    const userId = req.params.userId;

    if (!userId || userId === 'undefined' || userId === 'null') {
      return res.status(400).json({ success: false, message: 'Valid userId is required' });
    }

    if (!text) {
      return res.status(400).json({ success: false, message: 'Message text is required' });
    }

    // ✅ Find or create chat (reactivate if previously deleted)
    let chat = await Chat.findOne({ userId });
    if (!chat) {
      chat = await Chat.create({ userId });
    } else if (!chat.isActive) {
      // Reactivate chat if it was previously deleted
      chat.isActive = true;
      chat.deletedBy = [];
      await chat.save();
    }

    // ✅ Create message
    const newMsg = await Message.create({
      chatId: chat._id,
      sender,
      text,
    });

    // ✅ Update chat metadata
    chat.lastMessage = text;
    chat.lastMessageTime = new Date();
    if (sender === 'user') chat.unreadCount += 1;
    await chat.save();

    // ✅ Emit socket event
    try {
      const io = socket.getIO();
      io.emit('newMessage', {
        chatId: chat._id,
        messageId: newMsg._id,
        text,
        sender,
        timestamp: newMsg.timestamp,
      });
    } catch (e) {
      console.warn('⚠️ Socket.IO emit skipped: not initialized yet');
    }

    res.json({ success: true, data: newMsg });
  } catch (err) {
    console.error('❌ Send message error:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Find or create chat for user
exports.findOrCreateChat = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ success: false, message: 'userId required' });
    
    let chat = await Chat.findOne({ userId });
    if (!chat) {
      chat = await Chat.create({ userId });
    } else if (!chat.isActive) {
      // Reactivate if previously deleted
      chat.isActive = true;
      chat.deletedBy = [];
      await chat.save();
    }
    
    res.json({ success: true, chat });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete a specific message
exports.deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { deletedBy } = req.body; // 'user' or 'admin'

    if (!messageId || !deletedBy) {
      return res.status(400).json({ 
        success: false, 
        message: 'messageId and deletedBy are required' 
      });
    }

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ 
        success: false, 
        message: 'Message not found' 
      });
    }

    // Soft delete the message
    message.isDeleted = true;
    message.deletedBy = deletedBy;
    message.deletedAt = new Date();
    message.originalText = message.text; // Store original message
    message.text = 'This message was deleted'; // Or any placeholder text
    
    await message.save();

    // Emit socket event for real-time update
    try {
      const io = socket.getIO();
      io.emit('messageDeleted', {
        messageId: message._id,
        chatId: message.chatId
      });
    } catch (e) {
      console.warn('⚠️ Socket.IO emit skipped: not initialized yet');
    }

    res.json({ 
      success: true, 
      message: 'Message deleted successfully' 
    });
  } catch (err) {
    console.error('❌ Delete message error:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete entire chat (soft delete)
exports.deleteChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { deletedBy, userType } = req.body; // userType: 'user' or 'admin'

    if (!chatId || !deletedBy || !userType) {
      return res.status(400).json({ 
        success: false, 
        message: 'chatId, deletedBy, and userType are required' 
      });
    }

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ 
        success: false, 
        message: 'Chat not found' 
      });
    }

    // Soft delete the chat
    chat.isActive = false;
    chat.deletedBy.push({
      userType,
      userId: deletedBy,
      deletedAt: new Date()
    });
    
    await chat.save();

    // Emit socket event
    try {
      const io = socket.getIO();
      io.emit('chatDeleted', { chatId });
    } catch (e) {
      console.warn('⚠️ Socket.IO emit skipped: not initialized yet');
    }

    res.json({ 
      success: true, 
      message: 'Chat deleted successfully' 
    });
  } catch (err) {
    console.error('❌ Delete chat error:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get user's chat history
exports.getUserChatHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({ 
        success: false, 
        message: 'userId is required' 
      });
    }

    // Find active chat for user
    const chat = await Chat.findOne({ 
      userId, 
      isActive: true 
    });

    if (!chat) {
      return res.json({ 
        success: true, 
        data: { chat: null, messages: [] } 
      });
    }

    // Get all non-deleted messages
    const messages = await Message.find({ 
      chatId: chat._id, 
      isDeleted: false 
    }).sort({ createdAt: 1 });

    res.json({ 
      success: true, 
      data: { chat, messages } 
    });
  } catch (err) {
    console.error('❌ Get chat history error:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};