import React, { useState, useEffect, useRef } from 'react';
import { Send, Trash2, X } from 'lucide-react';
import { io } from 'socket.io-client';
import axiosInstance from '../utils/axiosInstance';

const ChatModal = ({ orderId, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const [userId, setUserId] = useState(null);
    const [chatId, setChatId] = useState(null);
    const [loading, setLoading] = useState(false);
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

    // ✅ Initialize userId & socket
    useEffect(() => {
        const storedId = localStorage.getItem('userId');
        if (!storedId) {
            alert('Please log in before using chat.');
            onClose();
            return;
        }
        setUserId(storedId);

        const newSocket = io('https://cctvshoppee.onrender.com');
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [onClose]);

    // ✅ Real-time updates for new messages and deletions
    useEffect(() => {
        if (!socket) return;

        socket.on('newMessage', (msg) => {
            if (msg.chatId === chatId) {
                setMessages((prev) => {
                    const newMessages = [...prev, { ...msg, _id: msg.messageId || msg._id }];
                    return getUniqueMessages(newMessages);
                });
            }
        });

        socket.on('messageDeleted', (data) => {
            if (data.chatId === chatId) {
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
            if (data.chatId === chatId) {
                alert('This chat has been deleted');
                setMessages([]);
                setChatId(null);
            }
        });

        return () => {
            socket.off('newMessage');
            socket.off('messageDeleted');
            socket.off('chatDeleted');
        };
    }, [socket, chatId]);

    // ✅ Get or create chat, then load messages
    useEffect(() => {
        if (userId) initChat();
    }, [userId]);

    const initChat = async () => {
        setLoading(true);
        try {
            // 1️⃣ Get user's chat history
            const historyRes = await axiosInstance.get(`/chats/user/${userId}/history`);
            if (historyRes.data.success) {
                const { chat, messages: chatMessages } = historyRes.data.data;

                if (chat) {
                    setChatId(chat._id);
                    const uniqueMessages = getUniqueMessages(
                        chatMessages.map(msg => ({
                            ...msg,
                            _id: msg._id || msg.messageId
                        }))
                    );
                    setMessages(uniqueMessages);
                } else {
                    // 2️⃣ If no active chat, create one
                    const chatRes = await axiosInstance.get(`/chats/find/${userId}`);
                    if (chatRes.data.success && chatRes.data.chat) {
                        setChatId(chatRes.data.chat._id);
                        setMessages([]);
                    }
                }
            }
        } catch (err) {
            console.error('❌ Chat initialization error:', err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSend = async () => {
        if (!inputMessage.trim() || !userId) return;
        const text = inputMessage.trim();
        setInputMessage('');

        // Optimistic update
        const tempId = Date.now().toString();
        const newMsg = {
            _id: tempId,
            text,
            sender: 'user',
            timestamp: new Date(),
            isDeleted: false
        };
        setMessages((prev) => getUniqueMessages([...prev, newMsg]));

        try {
            const res = await axiosInstance.post(`/chats/${userId}/messages`, {
                text,
                sender: 'user'
            });

            if (res.data.success && res.data.data?.chatId) {
                setChatId(res.data.data.chatId);

                // Replace optimistic message with actual one
                if (res.data.data._id) {
                    setMessages((prev) =>
                        getUniqueMessages(
                            prev.map(msg =>
                                msg._id === tempId
                                    ? { ...res.data.data, _id: res.data.data._id }
                                    : msg
                            )
                        )
                    );
                }
            }
        } catch (err) {
            console.error('❌ Send message failed:', err.message);
            // Remove optimistic message on error
            setMessages((prev) => getUniqueMessages(prev.filter(msg => msg._id !== tempId)));
        }
    };

    const deleteMessage = async (messageId) => {
        if (!messageId || !chatId) return;

        try {
            const res = await axiosInstance.delete(`/chats/messages/${messageId}`, {
                data: { deletedBy: 'user' }
            });

            if (res.data.success) {
                // Update local state to show deleted message
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

    const deleteChat = async () => {
        if (!chatId || !userId) return;

        if (!window.confirm('Are you sure you want to delete this entire chat? This action cannot be undone.')) {
            return;
        }

        try {
            const res = await axiosInstance.delete(`/chats/${chatId}`, {
                data: {
                    deletedBy: userId,
                    userType: 'user'
                }
            });

            if (res.data.success) {
                setMessages([]);
                setChatId(null);
                alert('Chat deleted successfully');
            }
        } catch (err) {
            console.error('❌ Delete chat failed:', err.message);
            alert('Failed to delete chat');
        }
    };

    // Format time to 12-hour format with seconds (like: 12:30:28 PM)
    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="chat-modal-overlay">
            <div className="chat-modal">
                <div className="chat-header">
                    <div className="chat-header-info">
                        <h4> <span style={{padding:'0px 10px'}}><i class="fas fa-comments"></i></span>
                              Customer Support</h4>
                        {chatId && (
                            <button
                                onClick={deleteChat}
                                className="delete-chat-btn"
                                title="Delete entire chat"
                            >
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>
                    <button onClick={onClose} className="close-btn">
                        <X size={20} />
                    </button>
                </div>

                <div className="chat-messages">
                    {loading ? (
                        <div className="loading-state">
                            <p>Loading chat history...</p>
                        </div>
                    ) : messages.length === 0 ? (
                        <div className="empty-state">
                            <p>No messages yet. Start a conversation!</p>
                        </div>
                    ) : (
                        getUniqueMessages(messages).map((msg) => (
                            <div
                                key={msg._id}
                                className={`msg ${msg.sender === 'user' ? 'user' : 'admin'} ${msg.isDeleted ? 'deleted' : ''}`}
                            >
                                <div className="message-content">
                                    <div className="bubble">
                                        <p>{msg.text}</p>
                                        <span>{formatTime(msg.timestamp)}</span>
                                    </div>

                                    {/* Delete button for user's messages */}
                                    {msg.sender === 'user' && !msg.isDeleted && (
                                        <div className="message-actions">
                                            <button
                                                className="menu-trigger"
                                                onClick={() => deleteMessage(msg._id)}
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

                <div className="chat-inputs">
                    <input
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type your message..."
                        disabled={!chatId}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!inputMessage.trim() || !chatId}
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>

            <style>{`
                .chat-modal-overlay { 
                    position: fixed; 
                    inset: 0; 
                    background: rgba(0,0,0,0.3); 
                    display: flex; 
                    justify-content: center; 
                    align-items: center; 
                    z-index: 1000; 
                }
                .chat-modal { 
                    background: white; 
                    width: 400px; 
                    height: 550px; 
                    border-radius: 12px; 
                    display: flex; 
                    flex-direction: column; 
                    overflow: hidden; 
                    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                    border: 1px solid #e1e5e9;
                }
                .chat-header { 
                    background: linear-gradient(135deg, #8788c2 0%, #6b6ca3 100%); 
                    color: white; 
                    padding: 16px 20px; 
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center; 
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .chat-header-info {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .delete-chat-btn {
                    background: rgba(255,255,255,0.2);
                    border: none;
                    border-radius: 6px;
                    padding: 6px;
                    cursor: pointer;
                    color: white;
                    display: flex;
                    align-items: center;
                    transition: all 0.2s;
                }
                .delete-chat-btn:hover {
                    background: rgba(255,255,255,0.3);
                    transform: scale(1.05);
                }
                .chat-messages { 
                    flex: 1; 
                    overflow-y: auto; 
                    padding: 16px; 
                    background-image: 
                        radial-gradient(circle at 20px 20px, rgba(102, 126, 234, 0.05) 2%, transparent 2.5%),
                        radial-gradient(circle at 60px 60px, rgba(102, 126, 234, 0.05) 2%, transparent 2.5%);
                    background-size: 80px 80px;
                    background-color: #f8fafc;
                    position: relative;
                }
                .chat-messages::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: 
                        linear-gradient(45deg, transparent 49%, rgba(102, 126, 234, 0.02) 50%, transparent 51%),
                        linear-gradient(-45deg, transparent 49%, rgba(102, 126, 234, 0.02) 50%, transparent 51%);
                    background-size: 15px 15px;
                    pointer-events: none;
                }
                .chat-inputs { 
                    display: flex; 
                    gap: 10px;
                    padding: 20px; 
                    border-top: 1px solid #e1e5e9; 
                    background: white;
                    align-items: center;
                }
                .chat-inputs input { 
                    flex: 1; 
                    border-radius: 24px; 
                    border: 1px solid #d1d5db; 
                    padding: 12px 18px; 
                    outline: none;
                    font-size: 14px;
                    background: #f9fafb;
                    transition: all 0.2s;
                }
                .chat-inputs input:focus {
                    border-color: #8788c2;
                    background: white;
                    box-shadow: 0 0 0 3px rgba(135, 136, 194, 0.1);
                }
                .chat-inputs input:disabled {
                    background: #f3f4f6;
                    cursor: not-allowed;
                    color: #9ca3af;
                }
                .chat-inputs button { 
                    background: linear-gradient(135deg, #8788c2 0%, #6b6ca3 100%);
                    border: none;
                    border-radius: 50%;
                    width: 44px;
                    height: 44px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    color: white;
                    transition: all 0.2s;
                    box-shadow: 0 2px 8px rgba(135, 136, 194, 0.3);
                }
                .chat-inputs button:hover:not(:disabled) {
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(135, 136, 194, 0.4);
                }
                .chat-inputs button:disabled {
                    background: #d1d5db;
                    cursor: not-allowed;
                    transform: none;
                    box-shadow: none;
                }
                .msg { 
                    margin: 12px 0; 
                    display: flex; 
                    position: relative;
                    z-index: 1;
                }
                .msg.user { 
                    justify-content: flex-end; 
                }
                .message-content {
                    position: relative;
                    display: flex;
                    align-items: flex-start;
                    gap: 8px;
                    max-width: 85%;
                }
                .msg.user .message-content {
                    flex-direction: row-reverse;
                }
                .bubble { 
                    background: white; 
                    padding: 12px 16px; 
                    border-radius: 18px; 
                    max-width: 100%;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                    border: 1px solid #f1f1f1;
                    position: relative;
                }
                .msg.user .bubble { 
                    background: linear-gradient(135deg, #667eeab3 0%, #764ba282 100%);
                    color: white;
                    border: none;
                }
                .msg.admin .bubble {
                    background: white;
                    color: #374151;
                    border-top-left-radius: 6px;
                }
                .msg.user .bubble {
                    border-top-right-radius: 6px;
                }
                .msg.deleted .bubble {
                    background: #f9fafb;
                    color: #9ca3af;
                    font-style: italic;
                    border: 1px dashed #d1d5db;
                    box-shadow: none;
                }
                .bubble p { 
                    margin: 0 0 6px 0;
                    word-wrap: break-word;
                    line-height: 1.4;
                    font-size: 14px;
                }
                .bubble span { 
                    font-size: 11px;
                    color: #6b7280; 
                    display: block; 
                    text-align: right; 
                    opacity: 0.8; 
                    font-weight: 500;
                    font-family: 'Courier New', monospace;
                }
                .msg.user .bubble span {
                    color: rgba(255, 255, 255, 0.8);
                }
                .close-btn { 
                    background: none; 
                    color: white; 
                    border: none; 
                    cursor: pointer; 
                    padding: 6px;
                    border-radius: 6px;
                    display: flex;
                    align-items: center;
                    transition: all 0.2s;
                }
                .close-btn:hover {
                    background: rgba(255,255,255,0.2);
                    transform: scale(1.1);
                }
                .chat-header h4 {
                    color: white;
                    margin: 0;
                    font-size: 16px;
                    font-weight: 600;
                }
                .message-actions {
                    position: relative;
                    flex-shrink: 0;
                }
                .menu-trigger {
                    background: rgba(255, 255, 255, 0.9);
                    border: 1px solid #e5e7eb;
                    cursor: pointer;
                    padding: 6px;
                    border-radius: 6px;
                    opacity: 0;
                    transition: all 0.2s;
                    color: #6b7280;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                }
                .msg:hover .menu-trigger {
                    opacity: 0.8;
                }
                .menu-trigger:hover {
                    opacity: 1 !important;
                    background: white;
                    border-color: #e53e3e;
                    color: #e53e3e;
                    transform: scale(1.05);
                    box-shadow: 0 2px 6px rgba(0,0,0,0.15);
                }
                .loading-state, .empty-state {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                    color: #6b7280;
                    font-size: 14px;
                    position: relative;
                    z-index: 1;
                    background: transparent;
                }
                .loading-state p, .empty-state p {
                    margin: 0;
                    padding: 12px 20px;
                    background: white;
                    border-radius: 10px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    border: 1px solid #f1f1f1;
                }

                /* Custom scrollbar */
                .chat-messages::-webkit-scrollbar {
                    width: 6px;
                }
                .chat-messages::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 3px;
                }
                .chat-messages::-webkit-scrollbar-thumb {
                    background: #c1c1c1;
                    border-radius: 3px;
                }
                .chat-messages::-webkit-scrollbar-thumb:hover {
                    background: #a8a8a8;
                }
            `}</style>
        </div>
    );
};

export default ChatModal;
