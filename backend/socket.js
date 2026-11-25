// const socketIo = require('socket.io');

// let io;

// const init = (server) => {
//   io = socketIo(server, {
//     cors: {
//       origin: "http://localhost:3000", // Replace with your frontend URL
//       methods: ["GET", "POST"],
//       credentials: true,
//     },
//   });

//   io.on('connection', (socket) => {
//     console.log('New client connected:', socket.id);

//     socket.on('joinChat', (chatId) => {
//       socket.join(chatId);
//       console.log(`User joined chat: ${chatId}`);
//     });

//     socket.on('sendMessage', (message) => {
//       io.to(message.chatId).emit('receiveMessage', message);
//     });

//     socket.on('disconnect', () => {
//       console.log('Client disconnected:', socket.id);
//     });
//   });
// };

// const getIO = () => {
//   if (!io) {
//     throw new Error('Socket.IO not initialized!');
//   }
//   return io;
// };

// module.exports = { init, getIO };





const socketIo = require('socket.io');
let io;

const init = (server) => {
  io = socketIo(server, {
    cors: {
      origin: (origin, callback) => callback(null, true),
      methods: ["GET", "POST", "DELETE"],
      credentials: true,
    },
  });

  // ✅ When a new client connects
  io.on('connection', (socket) => {
    console.log(`🟢 [Socket Connected] ID: ${socket.id}`);

    // ✅ Join a chat room (user or admin)
    socket.on('joinChat', (chatId) => {
      if (chatId) {
        socket.join(chatId);
        console.log(`👥 [Room Join] Socket ${socket.id} joined chat room: ${chatId}`);
      } else {
        console.warn(`⚠️ [Room Join] Missing chatId from socket ${socket.id}`);
      }
    });

    // ✅ When a new message is sent (via frontend socket)
    socket.on('sendMessage', (message) => {
      if (!message?.chatId) {
        console.warn(`⚠️ [Socket Message] No chatId in message from ${socket.id}`);
        return;
      }

      console.log(`📨 [Socket Message] From ${socket.id} → Chat ${message.chatId}`);

      // Send message to that room
      io.to(message.chatId).emit('receiveMessage', message);

      // Broadcast globally for admin dashboards
      io.emit('newMessage', message);
    });

    // ✅ When a message is deleted
    socket.on('deleteMessage', (data) => {
      if (!data?.chatId || !data?.messageId) {
        console.warn('⚠️ [Socket Delete] Missing data:', data);
        return;
      }
      console.log(`🗑️ [Message Deleted] ${data.messageId} from chat ${data.chatId}`);
      io.to(data.chatId).emit('messageDeleted', { messageId: data.messageId });
    });

    // ✅ Optional: typing indicator
    socket.on('typing', ({ chatId, sender }) => {
      if (chatId && sender) {
        socket.to(chatId).emit('userTyping', { chatId, sender });
      }
    });

    // ✅ Disconnect handling
    socket.on('disconnect', (reason) => {
      console.log(`🔴 [Socket Disconnected] ${socket.id} — Reason: ${reason}`);
    });
  });

  console.log('✅ Socket.IO initialized successfully');
  return io;
};

// ✅ Global getter
const getIO = () => {
  if (!io) {
    throw new Error('❌ Socket.IO not initialized! Did you forget socket.init(server)?');
  }
  return io;
};

module.exports = { init, getIO };
