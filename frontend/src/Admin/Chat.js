import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { Send, Search, RefreshCw, Trash2 } from 'lucide-react';
import axiosInstance from '../utils/publicAxios';

const AdminChat = () => {
  const [chats, setChats] = useState([]);
  const [filteredChats, setFilteredChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Function to remove duplicate messages
  const getUniqueMessages = (messages) => {
    const seen = new Set();
    return messages.filter(msg => {
      const identifier = `${msg._id}-${msg.timestamp}-${msg.text}`;
      if (seen.has(identifier)) {
        return false;
      }
      seen.add(identifier);
      return true;
    });
  };

  // Connect to Socket.IO
  useEffect(() => {
    const socket = io('https://cctvshoppee.onrender.com');
    socketRef.current = socket;

    socket.on('newMessage', (msg) => {
      setChats((prev) =>
        prev.map((chat) =>
          chat._id === msg.chatId
            ? {
                ...chat,
                lastMessage: msg.text,
                lastMessageTime: msg.timestamp,
                unreadCount:
                  selectedChat && selectedChat._id === msg.chatId
                    ? 0
                    : (chat.unreadCount || 0) + 1,
              }
            : chat
        )
      );
      if (selectedChat && msg.chatId === selectedChat._id) {
        setMessages((prev) => {
          const newMessages = [...prev, { ...msg, _id: msg.messageId || msg._id }];
          return getUniqueMessages(newMessages);
        });
      }
    });

    socket.on('messageDeleted', (data) => {
      if (selectedChat && data.chatId === selectedChat._id) {
        setMessages((prev) => 
          prev.map(msg => 
            msg._id === data.messageId 
              ? { ...msg, text: 'This message was deleted', isDeleted: true }
              : msg
          )
        );
      }
    });

    socket.on('chatDeleted', (data) => {
      setChats((prev) => prev.filter(chat => chat._id !== data.chatId));
      if (selectedChat && selectedChat._id === data.chatId) {
        setSelectedChat(null);
        setMessages([]);
        alert('This chat has been deleted by the user');
      }
    });

    return () => {
      socket.off('newMessage');
      socket.off('messageDeleted');
      socket.off('chatDeleted');
      socket.disconnect();
    };
  }, [selectedChat]);

  // Fetch all chats
  const fetchChats = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/chats/admin/chats');
      if (res.data.success) {
        const sorted = (res.data.data || []).sort(
          (a, b) => new Date(b.lastMessageTime || b.updatedAt) - new Date(a.lastMessageTime || a.updatedAt)
        );
        setChats(sorted);
        setFilteredChats(sorted);
      }
    } catch (err) {
      console.error('Error fetching chats:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  // Filter search
  useEffect(() => {
    if (!searchTerm.trim()) return setFilteredChats(chats);
    const lower = searchTerm.toLowerCase();
    const filtered = chats.filter(
      (c) =>
        (c.userId?.name || '').toLowerCase().includes(lower) ||
        (c.lastMessage || '').toLowerCase().includes(lower) ||
        (c.userId?.email || '').toLowerCase().includes(lower)
    );
    setFilteredChats(filtered);
  }, [searchTerm, chats]);

  // Fetch messages
  const fetchMessages = async (chatId) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/chats/sessions/${chatId}/messages`);
      if (res.data.success) {
        const uniqueMessages = getUniqueMessages(
          res.data.data.map(msg => ({
            ...msg,
            _id: msg._id || msg.messageId
          }))
        );
        setMessages(uniqueMessages);
        scrollToBottom();
      }
    } catch (err) {
      console.error('Error fetching messages:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    fetchMessages(chat._id);
    
    setChats((prev) =>
      prev.map((c) => (c._id === chat._id ? { ...c, unreadCount: 0 } : c))
    );
  };

  const handleSend = async () => {
    if (!text.trim() || !selectedChat) return;
    const msg = text.trim();
    setText('');
    
    const tempId = Date.now().toString();
    const tempMsg = {
      _id: tempId,
      text: msg,
      sender: 'admin',
      timestamp: new Date(),
      isDeleted: false
    };
    setMessages((prev) => getUniqueMessages([...prev, tempMsg]));
    scrollToBottom();
    
    try {
      const userId = selectedChat.userId?._id || selectedChat.userId;
      const res = await axiosInstance.post(`/chats/${userId}/messages`, {
        text: msg,
        sender: 'admin',
      });
      
      if (res.data.success && res.data.data?._id) {
        setMessages((prev) => 
          getUniqueMessages(
            prev.map(m => 
              m._id === tempId 
                ? { ...res.data.data, _id: res.data.data._id }
                : m
            )
          )
        );
      }
    } catch (err) {
      console.error('Error sending message:', err.message);
      setMessages((prev) => getUniqueMessages(prev.filter(m => m._id !== tempId)));
    }
  };

  // Delete a specific message
  const deleteMessage = async (messageId) => {
    if (!messageId || !selectedChat) return;
    
    try {
      const res = await axiosInstance.delete(`/chats/messages/${messageId}`, {
        data: { deletedBy: 'admin' }
      });
      
      if (res.data.success) {
        setMessages((prev) => 
          prev.map(msg => 
            msg._id === messageId 
              ? { ...msg, text: 'This message was deleted', isDeleted: true }
              : msg
          )
        );
      }
    } catch (err) {
      console.error('❌ Delete message failed:', err.message);
      alert('Failed to delete message');
    }
  };

  // Delete entire chat
  const deleteChat = async (chatId) => {
    if (!chatId) return;
    
    if (!window.confirm('Are you sure you want to delete this entire chat? This action cannot be undone.')) {
      return;
    }

    try {
      const res = await axiosInstance.delete(`/chats/${chatId}`, {
        data: { 
          deletedBy: 'admin',
          userType: 'admin' 
        }
      });
      
      if (res.data.success) {
        setChats((prev) => prev.filter(chat => chat._id !== chatId));
        if (selectedChat && selectedChat._id === chatId) {
          setSelectedChat(null);
          setMessages([]);
        }
        alert('Chat deleted successfully');
      }
    } catch (err) {
      console.error('❌ Delete chat failed:', err.message);
      alert('Failed to delete chat');
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Format time to HH:MM:SS (24-hour format)
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  // Format chat time in sidebar (HH:MM without seconds)
  const formatChatTime = (timestamp) => {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="admin-chat">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>Customer Chats</h3>
          <div className="header-actions">
            <button onClick={fetchChats} className="refresh-btn" title="Refresh chats">
              <RefreshCw size={16} />
            </button>
          </div>
        </div>
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search user or message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="chat-list">
          {loading ? (
            <div className="loading-state">
              <p>Loading chats...</p>
            </div>
          ) : filteredChats.length === 0 ? (
            <p className="empty">No chats found</p>
          ) : (
            filteredChats.map((c) => (
              <div
                key={c._id}
                className={`chat-item ${selectedChat?._id === c._id ? 'active' : ''}`}
                onClick={() => handleSelectChat(c)}
              >
                <div className="chat-avatar">
                  {c.userId?.avatar ? (
                    <img
                      src={c.userId.avatar}
                      alt="User Avatar"
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                      }}
                    />
                  ) : (
                    <div className="avatar-placeholder">
                      {(c.userId?.name?.[0] || 'U').toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="chat-info">
                  <div className="chat-name-row">
                    <div className="chat-name">{c.userId?.name || 'Unknown User'}</div>
                    <button 
                      className="delete-chat-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteChat(c._id);
                      }}
                      title="Delete chat"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                  <div className="chat-preview">
                    <span>{c.lastMessage || 'No messages yet'}</span>
                    {c.unreadCount > 0 && (
                      <span className="badge">{c.unreadCount}</span>
                    )}
                  </div>
                  {c.lastMessageTime && (
                    <div className="chat-time">
                      {formatChatTime(c.lastMessageTime)}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="chat-area">
        {selectedChat ? (
          <>
            <div className="chat-header">
              <div className="chat-user-info">
                <div className="chat-avatar">
                  {selectedChat.userId?.avatar ? (
                    <img
                      src={selectedChat.userId.avatar}
                      alt="User Avatar"
                      style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                    />
                  ) : (
                    <div className="avatar-placeholder-small">
                      {(selectedChat.userId?.name?.[0] || 'C').toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="user-details">
                  <h4>{selectedChat.userId?.name || 'Customer'}</h4>
                  {selectedChat.userId?.email && (
                    <span className="user-email">{selectedChat.userId.email}</span>
                  )}
                </div>
              </div>
              <div className="chat-actions">
                <button 
                  onClick={() => deleteChat(selectedChat._id)}
                  className="delete-chat-btn"
                  title="Delete entire chat"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="chat-body">
              {loading ? (
                <div className="loading-state">
                  <p>Loading messages...</p>
                </div>
              ) : messages.length === 0 ? (
                <p className="empty">No messages yet. Start a conversation!</p>
              ) : (
                getUniqueMessages(messages).map((m) => (
                  <div 
                    key={m._id} 
                    className={`msg ${m.sender === 'admin' ? 'admin' : 'user'} ${m.isDeleted ? 'deleted' : ''}`}
                  >
                    <div className="message-content">
                      <div className="bubble">
                        <p>{m.text}</p>
                        <span>
                          {formatTime(m.timestamp)}
                        </span>
                      </div>
                      
                      {/* Delete button for messages */}
                      {!m.isDeleted && (
                        <div className="message-actions">
                          <button 
                            className="menu-trigger"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteMessage(m._id);
                            }}
                            title="Delete message"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-input">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type message..."
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button onClick={handleSend} disabled={!text.trim()}>
                <Send size={18} />
              </button>
            </div>
          </>
        ) : (
          <div className="empty-state">
            <p>Select a chat to start messaging</p>
          </div>
        )}
      </div>

      {/* CSS */}
      <style>{`
        .admin-chat { 
          display: flex; 
          height: 100vh; 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
          background: #f8f9fa;
        }

        .sidebar { 
          width: 350px; 
          background: white; 
          border-right: 1px solid #e1e5e9; 
          display: flex; 
          flex-direction: column;
          box-shadow: 1px 0 2px rgba(0,0,0,0.05);
        }

        .sidebar-header { 
          padding: 20px; 
          border-bottom: 1px solid #e1e5e9; 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          background: white;
        }

        .sidebar-header h3 { 
          margin: 0; 
          font-size: 18px; 
          color: #2d3748; 
          font-weight: 600;
        }

        .header-actions { 
          display: flex; 
          gap: 8px; 
        }

        .search-box { 
          position: relative; 
          padding: 16px 20px; 
          border-bottom: 1px solid #e1e5e9; 
          background: white;
        }

        .search-box input { 
          width: 100%; 
          padding: 12px 16px 12px 40px; 
          border: 1px solid #e1e5e9; 
          border-radius: 25px; 
          font-size: 14px; 
          outline: none;
          background: #f7fafc;
          transition: all 0.2s;
        }

        .search-box input:focus { 
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .search-icon { 
          position: absolute; 
          left: 36px; 
          top: 50%; 
          transform: translateY(-50%); 
          color: #a0aec0; 
        }

        .chat-list { 
          flex: 1; 
          overflow-y: auto; 
          background: white;
        }

        .chat-item { 
          display: flex; 
          align-items: center; 
          padding: 16px 20px; 
          border-bottom: 1px solid #f7fafc; 
          cursor: pointer; 
          transition: all 0.2s;
          position: relative;
        }

        .chat-item:hover { 
          background: #f7fafc; 
        }

        .chat-item.active { 
          background: #edf2ff; 
          border-right: 3px solid #667eea;
        }

        .chat-avatar { 
          width: 48px; 
          height: 48px; 
          border-radius: 50%; 
          margin-right: 16px; 
          overflow: hidden; 
          flex-shrink: 0;
          border: 2px solid #e9ecef;
        }

        .avatar-placeholder, .avatar-placeholder-small {
          display: flex; 
          align-items: center; 
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white; 
          font-weight: 600; 
          border-radius: 50%;
        }

        .avatar-placeholder { 
          width: 48px; 
          height: 48px; 
          font-size: 18px; 
        }

        .avatar-placeholder-small { 
          width: 36px; 
          height: 36px; 
          font-size: 16px; 
        }

        .chat-info { 
          flex: 1; 
          min-width: 0; 
        }

        .chat-name-row { 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          margin-bottom: 4px; 
        }

        .chat-name { 
          font-weight: 600; 
          font-size: 15px; 
          color: #2d3748; 
          white-space: nowrap; 
          overflow: hidden; 
          text-overflow: ellipsis; 
        }

        .chat-preview { 
          font-size: 13px; 
          color: #718096; 
          display: flex; 
          align-items: center; 
          white-space: nowrap; 
          overflow: hidden; 
          text-overflow: ellipsis; 
          margin-bottom: 2px;
        }

        .chat-time { 
          font-size: 11px; 
          color: #a0aec0; 
          margin-top: 2px; 
        }

        .badge { 
          background: #e53e3e; 
          color: white; 
          border-radius: 12px; 
          padding: 2px 8px; 
          font-size: 11px; 
          font-weight: 600;
          margin-left: 8px; 
          flex-shrink: 0; 
          min-width: 18px;
          text-align: center;
        }

        .delete-chat-btn {
          background: none;
          border: none;
          padding: 6px;
          border-radius: 6px;
          cursor: pointer;
          color: #a0aec0;
          opacity: 0;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chat-item:hover .delete-chat-btn,
        .chat-header .delete-chat-btn {
          opacity: 0.6;
        }

        .delete-chat-btn:hover {
          opacity: 1 !important;
          background: rgba(229, 62, 62, 0.1);
          color: #e53e3e;
        }

        .chat-area { 
          flex: 1; 
          display: flex; 
          flex-direction: column; 
          background: #f8f9fa;
        }

        .chat-header { 
          padding: 20px 24px; 
          background: white; 
          border-bottom: 1px solid #e1e5e9; 
          display: flex; 
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        .chat-user-info {
          display: flex;
          align-items: center;
          flex: 1;
        }

        .user-details {
          margin-left: 16px;
        }

        .user-details h4 { 
          margin: 0 0 4px 0; 
          font-size: 17px;
          color: #2d3748;
          font-weight: 600;
        }

        .user-email {
          font-size: 13px;
          color: #718096;
        }

        .chat-actions {
          display: flex;
          gap: 12px;
        }

        .chat-body { 
          flex: 1; 
          overflow-y: auto; 
          padding: 24px; 
          background-image: 
            radial-gradient(circle at 25px 25px, rgba(255,255,255,0.3) 2%, transparent 2.5%),
            radial-gradient(circle at 75px 75px, rgba(255,255,255,0.3) 2%, transparent 2.5%);
          background-size: 100px 100px;
          background-color: #f0f4f8;
          position: relative;
        }

        .chat-body::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            linear-gradient(45deg, transparent 49%, rgba(102, 126, 234, 0.03) 50%, transparent 51%),
            linear-gradient(-45deg, transparent 49%, rgba(102, 126, 234, 0.03) 50%, transparent 51%);
          background-size: 20px 20px;
          pointer-events: none;
        }

        .msg { 
          display: flex; 
          margin-bottom: 16px; 
          position: relative;
          z-index: 1;
        }

        .msg.user { 
          justify-content: flex-start; 
        }

        .msg.admin { 
          justify-content: flex-end; 
        }

        .message-content {
          position: relative;
          display: flex;
          align-items: flex-start;
          gap: 12px;
          max-width: 70%;
        }

        .msg.user .message-content {
          flex-direction: row;
        }

        .msg.admin .message-content {
          flex-direction: row-reverse;
        }

        .bubble {
          max-width: 100%; 
          padding: 12px 16px; 
          border-radius: 18px; 
          position: relative;
          font-size: 14px; 
          line-height: 1.5; 
          word-wrap: break-word;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .msg.user .bubble {
          background: white; 
          border: 1px solid #e1e5e9; 
          border-top-left-radius: 6px;
          color: #2d3748;
        }

        .msg.admin .bubble {
          background: linear-gradient(135deg, #667eeab3 0%, #764ba282 100%); 
          color: white; 
          border-top-right-radius: 6px;
        }

        .msg.deleted .bubble {
          background: #f7fafc;
          color: #a0aec0;
          font-style: italic;
          border: 1px dashed #e1e5e9;
          box-shadow: none;
        }

        .bubble p { 
          margin: 0 0 6px 0;
          word-wrap: break-word;
          line-height: 1.4;
        }

        .bubble span { 
          display: block; 
          font-size: 11px; 
          text-align: right; 
          opacity: 0.8; 
          margin-top: 4px; 
          font-weight: 500;
          font-family: 'Courier New', monospace;
        }

        .message-actions {
          position: relative;
          flex-shrink: 0;
        }

        .menu-trigger {
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid #e1e5e9;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          opacity: 0;
          transition: all 0.2s;
          color: #718096;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .menu-trigger:hover {
          opacity: 1 !important;
          background: white;
          border-color: #e53e3e;
          color: #e53e3e;
          transform: scale(1.05);
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
        }

        .msg:hover .menu-trigger {
          opacity: 0.8;
        }

        .chat-input { 
          display: flex; 
          padding: 20px 24px; 
          background: white; 
          border-top: 1px solid #e1e5e9; 
          gap: 12px; 
          align-items: center;
        }

        .chat-input input { 
          flex: 1; 
          padding: 14px 20px; 
          border: 1px solid #e1e5e9; 
          border-radius: 25px; 
          font-size: 15px; 
          outline: none;
          background: #f7fafc;
          transition: all 0.2s;
        }

        .chat-input input:focus {
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .chat-input button { 
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
          border: none; 
          border-radius: 50%; 
          width: 48px; 
          height: 48px; 
          color: white; 
          cursor: pointer; 
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
        }

        .chat-input button:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .chat-input button:disabled {
          background: #a0aec0;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .empty-state, .empty, .loading-state { 
          text-align: center; 
          color: #a0aec0; 
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          font-size: 15px;
          background: transparent;
          position: relative;
          z-index: 1;
        }

        .loading-state p {
          margin: 0;
          padding: 12px 24px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .refresh-btn {
          background: #f7fafc;
          border: 1px solid #e1e5e9;
          padding: 8px;
          border-radius: 8px;
          cursor: pointer;
          color: #718096;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .refresh-btn:hover {
          background: #667eea;
          color: white;
          border-color: #667eea;
          transform: rotate(90deg);
        }

        /* Custom scrollbar */
        .chat-list::-webkit-scrollbar,
        .chat-body::-webkit-scrollbar {
          width: 6px;
        }

        .chat-list::-webkit-scrollbar-track,
        .chat-body::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }

        .chat-list::-webkit-scrollbar-thumb,
        .chat-body::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }

        .chat-list::-webkit-scrollbar-thumb:hover,
        .chat-body::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>
    </div>
  );
};

export default AdminChat;
