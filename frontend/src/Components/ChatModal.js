// // // // // src/Components/ChatModal.js
// // // // import React, { useState } from 'react';

// // // // const ChatModal = ({ orderId, onClose }) => {
// // // //     const [messages, setMessages] = useState([
// // // //         {
// // // //             id: 1,
// // // //             text: `Hello! I'm here to help you with your order #${orderId}. What would you like to know?`,
// // // //             sender: 'support',
// // // //             timestamp: new Date()
// // // //         }
// // // //     ]);
// // // //     const [inputMessage, setInputMessage] = useState('');

// // // //     const handleSendMessage = () => {
// // // //         if (inputMessage.trim()) {
// // // //             const newMessage = {
// // // //                 id: messages.length + 1,
// // // //                 text: inputMessage,
// // // //                 sender: 'user',
// // // //                 timestamp: new Date()
// // // //             };
// // // //             setMessages([...messages, newMessage]);
// // // //             setInputMessage('');
// // // //         }
// // // //     };

// // // //     return (
// // // //         <div className="chat-modal-overlay">
// // // //             <div className="chat-modal">
// // // //                 <div className="chat-header">
// // // //                     <div className="chat-header-info">
// // // //                         <div className="support-avatar">
// // // //                             <span>👋</span>
// // // //                         </div>
// // // //                         <div className="chat-title">
// // // //                             <h4>Customer Support</h4>
// // // //                             <div className="status-indicator">
// // // //                                 <span className="status-dot"></span>
// // // //                                 <span>Online now</span>
// // // //                             </div>
// // // //                         </div>
// // // //                     </div>
// // // //                     <div className="chat-actions">
// // // //                         <button className="btn-icon" title="Minimize">
// // // //                             <span>−</span>
// // // //                         </button>
// // // //                         <button
// // // //                             className="btn-icon close-btn"
// // // //                             onClick={onClose}
// // // //                             title="Close chat"
// // // //                         >
// // // //                             ×
// // // //                         </button>
// // // //                     </div>
// // // //                 </div>
// // // //                 <div className="order-banner">
// // // //                     <div className="order-info">
// // // //                         <span className="order-label">Order #{orderId}</span>
// // // //                         <span className="order-status">• In Progress</span>
// // // //                     </div>
// // // //                     <button className="btn-link">View Details</button>
// // // //                 </div>
// // // //                 <div className="chat-messages-container">
// // // //                     <div className="chat-messages">
// // // //                         {messages.map((message) => (
// // // //                             <div
// // // //                                 key={message.id}
// // // //                                 className={`message-wrapper ${message.sender}`}
// // // //                             >
// // // //                                 {message.sender === 'support' && (
// // // //                                     <div className="message-avatar">S</div>
// // // //                                 )}
// // // //                                 <div className="message-content">
// // // //                                     <div className={`message-bubble ${message.sender}`}>
// // // //                                         <p>{message.text}</p>
// // // //                                     </div>
// // // //                                     <div className={`message-meta ${message.sender}`}>
// // // //                                         <span>{message.sender === 'support' ? 'Support Agent' : 'You'}</span>
// // // //                                         <span>•</span>
// // // //                                         <span>Just now</span>
// // // //                                     </div>
// // // //                                 </div>
// // // //                                 {message.sender === 'user' && (
// // // //                                     <div className="message-avatar user">Y</div>
// // // //                                 )}
// // // //                             </div>
// // // //                         ))}
// // // //                     </div>
// // // //                 </div>
// // // //                 <div className="chat-input-container">
// // // //                     <div className="input-actions">
// // // //                         <button className="btn-attachment" title="Attach file">📎</button>
// // // //                         <button className="btn-emoji" title="Add emoji">😊</button>
// // // //                     </div>
// // // //                     <div className="input-wrapper">
// // // //                         <input
// // // //                             type="text"
// // // //                             className="chat-input"
// // // //                             placeholder="Type your message..."
// // // //                             value={inputMessage}
// // // //                             onChange={(e) => setInputMessage(e.target.value)}
// // // //                             onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
// // // //                         />
// // // //                     </div>
// // // //                     <button className="btn-send" onClick={handleSendMessage}>
// // // //                         <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
// // // //                             <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
// // // //                         </svg>
// // // //                     </button>
// // // //                 </div>
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // };

// // // // export default ChatModal;







// // // // src/Components/ChatModal.js
// // // import React, { useState, useEffect, useRef } from 'react';
// // // import { Send, Paperclip, Smile, Image, Mic, Phone, Video, MoreVertical, RefreshCw } from 'lucide-react';

// // // const ChatModal = ({ orderId, onClose, userId, userRole = 'user' }) => {
// // //     const [messages, setMessages] = useState([]);
// // //     const [inputMessage, setInputMessage] = useState('');
// // //     const [isLoading, setIsLoading] = useState(true);
// // //     const [isSending, setIsSending] = useState(false);
// // //     const [error, setError] = useState('');
// // //     const [chatSession, setChatSession] = useState(null);
// // //     const messagesEndRef = useRef(null);

// // //     // Scroll to bottom of messages
// // //     const scrollToBottom = () => {
// // //         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // //     };

// // //     useEffect(() => {
// // //         scrollToBottom();
// // //     }, [messages]);

// // //     // Fetch or create chat session when component mounts
// // //     useEffect(() => {
// // //         if (userId) {
// // //             fetchOrCreateChatSession();
// // //         }
// // //     }, [userId]);

// // //     const fetchOrCreateChatSession = async () => {
// // //         try {
// // //             setIsLoading(true);
// // //             setError('');
// // //             const token = localStorage.getItem('token');

// // //             // First, get or create a chat session
// // //             const sessionResponse = await fetch(`/api/chats/sessions/${userId}`, {
// // //                 headers: {
// // //                     'Authorization': `Bearer ${token}`,
// // //                     'Content-Type': 'application/json'
// // //                 }
// // //             });

// // //             if (sessionResponse.ok) {
// // //                 const sessionResult = await sessionResponse.json();
// // //                 if (sessionResult.success) {
// // //                     setChatSession(sessionResult.data);
// // //                     // Now fetch messages for this chat session
// // //                     await fetchMessages(sessionResult.data._id);
// // //                 }
// // //             } else {
// // //                 throw new Error('Failed to create chat session');
// // //             }
// // //         } catch (error) {
// // //             console.error('Error creating chat session:', error);
// // //             setError('Failed to start chat session. Please try again.');
// // //             setIsLoading(false);
// // //         }
// // //     };

// // //     const fetchMessages = async (chatId) => {
// // //         try {
// // //             const token = localStorage.getItem('token');
// // //             const response = await fetch(`/api/chats/sessions/${chatId}/messages`, {
// // //                 headers: {
// // //                     'Authorization': `Bearer ${token}`,
// // //                     'Content-Type': 'application/json'
// // //                 }
// // //             });

// // //             if (response.ok) {
// // //                 const result = await response.json();
// // //                 if (result.success) {
// // //                     setMessages(result.data || []);
// // //                 }
// // //             } else {
// // //                 throw new Error('Failed to fetch messages');
// // //             }
// // //         } catch (error) {
// // //             console.error('Error fetching messages:', error);
// // //             setError('Failed to load messages. Please try again.');
// // //         } finally {
// // //             setIsLoading(false);
// // //         }
// // //     };

// // //     const handleSendMessage = async () => {
// // //         if (!inputMessage.trim() || isSending || !userId) return;

// // //         try {
// // //             setIsSending(true);
// // //             setError('');
// // //             const token = localStorage.getItem('token');
// // //             const messageData = {
// // //                 text: inputMessage.trim(),
// // //                 sender: userRole // 'user' or 'admin'
// // //             };

// // //             console.log('Sending message to user:', userId);

// // //             const response = await fetch(`/api/chats/sessions/${userId}/messages`, {
// // //                 method: 'POST',
// // //                 headers: {
// // //                     'Authorization': `Bearer ${token}`,
// // //                     'Content-Type': 'application/json'
// // //                 },
// // //                 body: JSON.stringify(messageData)
// // //             });

// // //             if (response.ok) {
// // //                 const result = await response.json();
// // //                 if (result.success) {
// // //                     setInputMessage('');
// // //                     // Add the new message to the local state
// // //                     setMessages(prev => [...prev, result.data]);
// // //                     // Update chat session if available
// // //                     if (result.chat) {
// // //                         setChatSession(result.chat);
// // //                     }
// // //                 } else {
// // //                     throw new Error(result.message || 'Failed to send message');
// // //                 }
// // //             } else {
// // //                 const errorData = await response.json().catch(() => ({}));
// // //                 throw new Error(errorData.message || `Failed to send message: ${response.status}`);
// // //             }
// // //         } catch (error) {
// // //             console.error('Error sending message:', error);
// // //             setError(error.message);
// // //         } finally {
// // //             setIsSending(false);
// // //         }
// // //     };

// // //     const handleRetry = () => {
// // //         setError('');
// // //         if (chatSession) {
// // //             fetchMessages(chatSession._id);
// // //         } else {
// // //             fetchOrCreateChatSession();
// // //         }
// // //     };

// // //     const formatTime = (timestamp) => {
// // //         try {
// // //             const date = new Date(timestamp);
// // //             const now = new Date();
// // //             const diffInHours = (now - date) / (1000 * 60 * 60);

// // //             if (diffInHours < 24) {
// // //                 return date.toLocaleTimeString('en-US', { 
// // //                     hour: '2-digit', 
// // //                     minute: '2-digit',
// // //                     hour12: true 
// // //                 });
// // //             } else {
// // //                 return date.toLocaleDateString('en-US', {
// // //                     month: 'short',
// // //                     day: 'numeric',
// // //                     year: 'numeric'
// // //                 });
// // //             }
// // //         } catch (error) {
// // //             return '';
// // //         }
// // //     };

// // //     const formatMessageTime = (timestamp) => {
// // //         try {
// // //             const date = new Date(timestamp);
// // //             const now = new Date();
// // //             const diffInMinutes = (now - date) / (1000 * 60);

// // //             if (diffInMinutes < 1) {
// // //                 return 'Just now';
// // //             } else if (diffInMinutes < 60) {
// // //                 return `${Math.floor(diffInMinutes)} min ago`;
// // //             } else if (diffInMinutes < 1440) {
// // //                 return `${Math.floor(diffInMinutes / 60)} hours ago`;
// // //             } else {
// // //                 return date.toLocaleDateString('en-US', {
// // //                     month: 'short',
// // //                     day: 'numeric'
// // //                 });
// // //             }
// // //         } catch (error) {
// // //             return '';
// // //         }
// // //     };

// // //     // Group messages by date
// // //     const groupMessagesByDate = (messages) => {
// // //         const groups = {};
// // //         messages.forEach(message => {
// // //             try {
// // //                 const date = new Date(message.timestamp).toDateString();
// // //                 if (!groups[date]) {
// // //                     groups[date] = [];
// // //                 }
// // //                 groups[date].push(message);
// // //             } catch (error) {
// // //                 console.error('Error grouping message:', error);
// // //             }
// // //         });
// // //         return groups;
// // //     };

// // //     const messageGroups = groupMessagesByDate(messages);

// // //     return (
// // //         <div className="chat-modal-overlay">
// // //             <div className="chat-modal">
// // //                 {/* Chat Header */}
// // //                 <div className="chat-header">
// // //                     <div className="chat-header-info">
// // //                         <div className="support-avatar">
// // //                             <span>👋</span>
// // //                         </div>
// // //                         <div className="chat-title">
// // //                             <h4>Customer Support</h4>
// // //                             <div className="status-indicator">
// // //                                 <span className="status-dot"></span>
// // //                                 <span>Online now</span>
// // //                             </div>
// // //                         </div>
// // //                     </div>
// // //                     <div className="chat-actions">
// // //                         <button 
// // //                             className="btn-icon" 
// // //                             title="Refresh"
// // //                             onClick={handleRetry}
// // //                             disabled={isLoading}
// // //                         >
// // //                             <RefreshCw size={16} />
// // //                         </button>
// // //                         <button
// // //                             className="btn-icon close-btn"
// // //                             onClick={onClose}
// // //                             title="Close chat"
// // //                         >
// // //                             ×
// // //                         </button>
// // //                     </div>
// // //                 </div>

// // //                 {/* Order Banner */}
// // //                 {orderId && (
// // //                     <div className="order-banner">
// // //                         <div className="order-info">
// // //                             <span className="order-label">Order #{orderId}</span>
// // //                             <span className="order-status">• In Progress</span>
// // //                         </div>
// // //                         <button className="btn-link">View Details</button>
// // //                     </div>
// // //                 )}

// // //                 {/* Error Banner */}
// // //                 {error && (
// // //                     <div className="error-banner">
// // //                         <span>{error}</span>
// // //                         <button onClick={handleRetry} className="retry-btn">
// // //                             Retry
// // //                         </button>
// // //                     </div>
// // //                 )}

// // //                 {/* Messages Container */}
// // //                 <div className="chat-messages-container">
// // //                     <div className="chat-messages">
// // //                         {isLoading ? (
// // //                             <div className="loading-state">
// // //                                 <div className="loading-spinner"></div>
// // //                                 <p>Loading messages...</p>
// // //                             </div>
// // //                         ) : messages.length === 0 ? (
// // //                             <div className="empty-state">
// // //                                 <p>No messages yet. Start a conversation!</p>
// // //                             </div>
// // //                         ) : (
// // //                             Object.entries(messageGroups).map(([date, dayMessages]) => (
// // //                                 <div key={date} className="message-date-group">
// // //                                     <div className="date-divider">
// // //                                         <span>{new Date(date).toLocaleDateString('en-US', {
// // //                                             weekday: 'long',
// // //                                             year: 'numeric',
// // //                                             month: 'long',
// // //                                             day: 'numeric'
// // //                                         })}</span>
// // //                                     </div>
// // //                                     {dayMessages.map((message, index) => (
// // //                                         <div
// // //                                             key={message._id || `${message.timestamp}-${index}`}
// // //                                             className={`message-wrapper ${message.sender}`}
// // //                                         >
// // //                                             {message.sender === 'admin' && (
// // //                                                 <div className="message-avatar">S</div>
// // //                                             )}
// // //                                             <div className="message-content">
// // //                                                 <div className={`message-bubble ${message.sender}`}>
// // //                                                     <p>{message.text}</p>
// // //                                                 </div>
// // //                                                 <div className={`message-meta ${message.sender}`}>
// // //                                                     <span>{message.sender === 'admin' ? 'Support Agent' : 'You'}</span>
// // //                                                     <span>•</span>
// // //                                                     <span>{formatMessageTime(message.timestamp)}</span>
// // //                                                 </div>
// // //                                             </div>
// // //                                             {message.sender === 'user' && (
// // //                                                 <div className="message-avatar user">Y</div>
// // //                                             )}
// // //                                         </div>
// // //                                     ))}
// // //                                 </div>
// // //                             ))
// // //                         )}
// // //                         <div ref={messagesEndRef} />
// // //                     </div>
// // //                 </div>

// // //                 {/* Input Container */}
// // //                 <div className="chat-input-container">
// // //                     <div className="input-actions">
// // //                         <button className="btn-attachment" title="Attach file">
// // //                             <Paperclip size={18} />
// // //                         </button>
// // //                         <button className="btn-emoji" title="Add emoji">
// // //                             <Smile size={18} />
// // //                         </button>
// // //                     </div>
// // //                     <div className="input-wrapper">
// // //                         <input
// // //                             type="text"
// // //                             className="chat-input"
// // //                             placeholder="Type your message..."
// // //                             value={inputMessage}
// // //                             onChange={(e) => setInputMessage(e.target.value)}
// // //                             onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
// // //                             disabled={isSending || !userId}
// // //                         />
// // //                     </div>
// // //                     <button 
// // //                         className={`btn-send ${isSending ? 'sending' : ''}`} 
// // //                         onClick={handleSendMessage}
// // //                         disabled={isSending || !inputMessage.trim() || !userId}
// // //                         title={!userId ? "User ID is required" : "Send message"}
// // //                     >
// // //                         {isSending ? (
// // //                             <div className="sending-spinner"></div>
// // //                         ) : (
// // //                             <Send size={18} />
// // //                         )}
// // //                     </button>
// // //                 </div>
// // //             </div>

// // //             <style jsx>{`
// // //                 .chat-modal-overlay {
// // //                     position: fixed;
// // //                     top: 0;
// // //                     left: 0;
// // //                     right: 0;
// // //                     bottom: 0;
// // //                     background: rgba(0, 0, 0, 0.5);
// // //                     display: flex;
// // //                     align-items: center;
// // //                     justify-content: center;
// // //                     z-index: 1000;
// // //                 }

// // //                 .chat-modal {
// // //                     width: 90%;
// // //                     max-width: 400px;
// // //                     height: 80%;
// // //                     background: white;
// // //                     border-radius: 12px;
// // //                     display: flex;
// // //                     flex-direction: column;
// // //                     box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
// // //                 }

// // //                 .chat-header {
// // //                     display: flex;
// // //                     align-items: center;
// // //                     justify-content: space-between;
// // //                     padding: 16px;
// // //                     border-bottom: 1px solid #e5e7eb;
// // //                     background: white;
// // //                     border-radius: 12px 12px 0 0;
// // //                 }

// // //                 .chat-header-info {
// // //                     display: flex;
// // //                     align-items: center;
// // //                     gap: 12px;
// // //                 }

// // //                 .support-avatar {
// // //                     width: 40px;
// // //                     height: 40px;
// // //                     background: #6366f1;
// // //                     border-radius: 50%;
// // //                     display: flex;
// // //                     align-items: center;
// // //                     justify-content: center;
// // //                     color: white;
// // //                     font-size: 18px;
// // //                 }

// // //                 .chat-title h4 {
// // //                     margin: 0;
// // //                     font-size: 16px;
// // //                     font-weight: 600;
// // //                     color: #1f2937;
// // //                 }

// // //                 .status-indicator {
// // //                     display: flex;
// // //                     align-items: center;
// // //                     gap: 6px;
// // //                     font-size: 12px;
// // //                     color: #10b981;
// // //                 }

// // //                 .status-dot {
// // //                     width: 8px;
// // //                     height: 8px;
// // //                     background: #10b981;
// // //                     border-radius: 50%;
// // //                     animation: pulse 2s infinite;
// // //                 }

// // //                 @keyframes pulse {
// // //                     0% { opacity: 1; }
// // //                     50% { opacity: 0.5; }
// // //                     100% { opacity: 1; }
// // //                 }

// // //                 .chat-actions {
// // //                     display: flex;
// // //                     gap: 8px;
// // //                 }

// // //                 .btn-icon {
// // //                     background: none;
// // //                     border: none;
// // //                     padding: 8px;
// // //                     cursor: pointer;
// // //                     color: #6b7280;
// // //                     border-radius: 6px;
// // //                     transition: all 0.2s;
// // //                     display: flex;
// // //                     align-items: center;
// // //                     justify-content: center;
// // //                 }

// // //                 .btn-icon:hover:not(:disabled) {
// // //                     background: #f3f4f6;
// // //                 }

// // //                 .btn-icon:disabled {
// // //                     opacity: 0.5;
// // //                     cursor: not-allowed;
// // //                 }

// // //                 .close-btn {
// // //                     font-size: 20px;
// // //                     line-height: 1;
// // //                 }

// // //                 .order-banner {
// // //                     display: flex;
// // //                     align-items: center;
// // //                     justify-content: space-between;
// // //                     padding: 12px 16px;
// // //                     background: #f8fafc;
// // //                     border-bottom: 1px solid #e5e7eb;
// // //                 }

// // //                 .order-info {
// // //                     display: flex;
// // //                     align-items: center;
// // //                     gap: 8px;
// // //                     font-size: 14px;
// // //                 }

// // //                 .order-label {
// // //                     font-weight: 500;
// // //                     color: #1f2937;
// // //                 }

// // //                 .order-status {
// // //                     color: #f59e0b;
// // //                 }

// // //                 .btn-link {
// // //                     background: none;
// // //                     border: none;
// // //                     color: #6366f1;
// // //                     font-size: 14px;
// // //                     cursor: pointer;
// // //                     text-decoration: underline;
// // //                 }

// // //                 .error-banner {
// // //                     background: #fef2f2;
// // //                     border: 1px solid #fecaca;
// // //                     color: #dc2626;
// // //                     padding: 12px 16px;
// // //                     display: flex;
// // //                     justify-content: space-between;
// // //                     align-items: center;
// // //                     font-size: 14px;
// // //                 }

// // //                 .retry-btn {
// // //                     background: #dc2626;
// // //                     color: white;
// // //                     border: none;
// // //                     padding: 6px 12px;
// // //                     border-radius: 6px;
// // //                     cursor: pointer;
// // //                     font-size: 12px;
// // //                     transition: background 0.2s;
// // //                 }

// // //                 .retry-btn:hover {
// // //                     background: #b91c1c;
// // //                 }

// // //                 .chat-messages-container {
// // //                     flex: 1;
// // //                     overflow-y: auto;
// // //                     background: #f9fafb;
// // //                 }

// // //                 .chat-messages {
// // //                     padding: 16px;
// // //                     min-height: 100%;
// // //                 }

// // //                 .loading-state, .empty-state {
// // //                     display: flex;
// // //                     flex-direction: column;
// // //                     align-items: center;
// // //                     justify-content: center;
// // //                     height: 200px;
// // //                     color: #6b7280;
// // //                     text-align: center;
// // //                 }

// // //                 .loading-spinner {
// // //                     width: 24px;
// // //                     height: 24px;
// // //                     border: 2px solid #e5e7eb;
// // //                     border-top: 2px solid #6366f1;
// // //                     border-radius: 50%;
// // //                     animation: spin 1s linear infinite;
// // //                     margin-bottom: 8px;
// // //                 }

// // //                 .sending-spinner {
// // //                     width: 16px;
// // //                     height: 16px;
// // //                     border: 2px solid transparent;
// // //                     border-top: 2px solid white;
// // //                     border-radius: 50%;
// // //                     animation: spin 1s linear infinite;
// // //                 }

// // //                 @keyframes spin {
// // //                     0% { transform: rotate(0deg); }
// // //                     100% { transform: rotate(360deg); }
// // //                 }

// // //                 .message-date-group {
// // //                     margin-bottom: 16px;
// // //                 }

// // //                 .date-divider {
// // //                     text-align: center;
// // //                     margin: 16px 0;
// // //                     position: relative;
// // //                 }

// // //                 .date-divider span {
// // //                     background: #f9fafb;
// // //                     padding: 4px 12px;
// // //                     border-radius: 12px;
// // //                     font-size: 12px;
// // //                     color: #6b7280;
// // //                     border: 1px solid #e5e7eb;
// // //                 }

// // //                 .message-wrapper {
// // //                     display: flex;
// // //                     align-items: flex-end;
// // //                     gap: 8px;
// // //                     margin-bottom: 12px;
// // //                 }

// // //                 .message-wrapper.user {
// // //                     flex-direction: row-reverse;
// // //                 }

// // //                 .message-avatar {
// // //                     width: 32px;
// // //                     height: 32px;
// // //                     border-radius: 50%;
// // //                     background: #6366f1;
// // //                     display: flex;
// // //                     align-items: center;
// // //                     justify-content: center;
// // //                     color: white;
// // //                     font-size: 12px;
// // //                     font-weight: 600;
// // //                     flex-shrink: 0;
// // //                 }

// // //                 .message-avatar.user {
// // //                     background: #10b981;
// // //                 }

// // //                 .message-content {
// // //                     max-width: 70%;
// // //                 }

// // //                 .message-bubble {
// // //                     padding: 12px;
// // //                     border-radius: 16px;
// // //                     margin-bottom: 4px;
// // //                 }

// // //                 .message-bubble.admin {
// // //                     background: white;
// // //                     border-bottom-left-radius: 4px;
// // //                     box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
// // //                 }

// // //                 .message-bubble.user {
// // //                     background: #6366f1;
// // //                     color: white;
// // //                     border-bottom-right-radius: 4px;
// // //                 }

// // //                 .message-bubble p {
// // //                     margin: 0;
// // //                     font-size: 14px;
// // //                     line-height: 1.4;
// // //                 }

// // //                 .message-meta {
// // //                     display: flex;
// // //                     align-items: center;
// // //                     gap: 4px;
// // //                     font-size: 11px;
// // //                     color: #6b7280;
// // //                 }

// // //                 .message-meta.user {
// // //                     justify-content: flex-end;
// // //                     color: #9ca3af;
// // //                 }

// // //                 .chat-input-container {
// // //                     display: flex;
// // //                     align-items: center;
// // //                     gap: 12px;
// // //                     padding: 16px;
// // //                     border-top: 1px solid #e5e7eb;
// // //                     background: white;
// // //                     border-radius: 0 0 12px 12px;
// // //                 }

// // //                 .input-actions {
// // //                     display: flex;
// // //                     gap: 8px;
// // //                 }

// // //                 .btn-attachment, .btn-emoji {
// // //                     background: none;
// // //                     border: none;
// // //                     padding: 8px;
// // //                     cursor: pointer;
// // //                     color: #6b7280;
// // //                     border-radius: 6px;
// // //                     transition: background 0.2s;
// // //                 }

// // //                 .btn-attachment:hover, .btn-emoji:hover {
// // //                     background: #f3f4f6;
// // //                 }

// // //                 .input-wrapper {
// // //                     flex: 1;
// // //                 }

// // //                 .chat-input {
// // //                     width: 100%;
// // //                     padding: 12px 16px;
// // //                     border: 1px solid #e5e7eb;
// // //                     border-radius: 24px;
// // //                     font-size: 14px;
// // //                     outline: none;
// // //                     background: #f9fafb;
// // //                     transition: all 0.2s;
// // //                 }

// // //                 .chat-input:focus {
// // //                     background: white;
// // //                     border-color: #6366f1;
// // //                 }

// // //                 .chat-input:disabled {
// // //                     opacity: 0.6;
// // //                     cursor: not-allowed;
// // //                 }

// // //                 .btn-send {
// // //                     background: #6366f1;
// // //                     border: none;
// // //                     padding: 12px;
// // //                     border-radius: 50%;
// // //                     cursor: pointer;
// // //                     color: white;
// // //                     display: flex;
// // //                     align-items: center;
// // //                     justify-content: center;
// // //                     transition: background 0.2s;
// // //                 }

// // //                 .btn-send:hover:not(:disabled) {
// // //                     background: #4f46e5;
// // //                 }

// // //                 .btn-send:disabled {
// // //                     background: #9ca3af;
// // //                     cursor: not-allowed;
// // //                 }

// // //                 .btn-send.sending {
// // //                     background: #9ca3af;
// // //                 }
// // //             `}</style>
// // //         </div>
// // //     );
// // // };

// // // export default ChatModal;


// // // src/Components/ChatModal.js
// // import React, { useState, useEffect, useRef } from 'react';
// // import { Send, Paperclip, Smile, RefreshCw } from 'lucide-react';


// // const API_BASE = 'http://localhost:5000'; // your Express backend


// // const ChatModal = ({ orderId, onClose, userId, userRole = 'user' }) => {
// //     const [messages, setMessages] = useState([]);
// //     const [inputMessage, setInputMessage] = useState('');
// //     const [isLoading, setIsLoading] = useState(true);
// //     const [isSending, setIsSending] = useState(false);
// //     const [error, setError] = useState('');
// //     const messagesEndRef = useRef(null);

// //     // Scroll to bottom
// //     const scrollToBottom = () => {
// //         messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// //     };

// //     useEffect(() => {
// //         scrollToBottom();
// //     }, [messages]);

// //     useEffect(() => {
// //         if (!userId) {
// //             console.warn('⚠️ ChatModal: userId missing.');
// //             setError('Cannot start chat — please log in again.');
// //             setIsLoading(false);
// //             return;
// //         }
// //         fetchMessages();
// //     }, [userId]);

// //     const fetchMessages = async () => {
// //         try {
// //             setIsLoading(true);
// //             const token = localStorage.getItem('token');
// //             const res = await fetch(`${API_BASE}/api/chats/${userId}/messages`, {
// //                   method: 'POST', // or GET
// //                 headers: {
// //                     'Authorization': `Bearer ${token}`,
// //                     'Content-Type': 'application/json'
// //                 },
// //                   body: JSON.stringify(messages),
// //             });
// //             const result = await res.json();
// //             if (res.ok && result.success) {
// //                 setMessages(result.data || []);
// //             } else {
// //                 setError(result.message || 'Failed to load chat');
// //             }
// //         } catch (err) {
// //             console.error(err);
// //             setError('Error connecting to chat API');
// //         } finally {
// //             setIsLoading(false);
// //         }
// //     };

// //     // ✅ Send message when clicking Send button
// //     const handleSendMessage = async () => {
// //         if (!inputMessage.trim() || isSending) return;
// //         const messageText = inputMessage.trim();
// //         setInputMessage('');

// //         // Add locally for instant feedback
// //         const tempMsg = {
// //             _id: `temp-${Date.now()}`,
// //             sender: userRole,
// //             text: messageText,
// //             timestamp: new Date()
// //         };
// //         setMessages((prev) => [...prev, tempMsg]);
// //         scrollToBottom();

// //         try {
// //             setIsSending(true);
// //             const token = localStorage.getItem('token');
// //             const res = await fetch(`/api/chats/${userId}/messages`, {
// //                 method: 'POST',
// //                 headers: {
// //                     'Authorization': `Bearer ${token}`,
// //                     'Content-Type': 'application/json'
// //                 },
// //                 body: JSON.stringify({ text: messageText, sender: userRole })
// //             });
// //             const result = await res.json();
// //             if (res.ok && result.success) {
// //                 // Replace temp message with saved message
// //                 setMessages((prev) =>
// //                     prev.map((msg) => (msg._id === tempMsg._id ? result.data : msg))
// //                 );
// //             } else {
// //                 setError(result.message || 'Send failed');
// //             }
// //         } catch (err) {
// //             console.error(err);
// //             setError('Send error');
// //         } finally {
// //             setIsSending(false);
// //         }
// //     };


// //     const handleRetry = () => {
// //         setError('');
// //         fetchMessages();
// //     };

// //     const formatTime = (timestamp) => {
// //         const date = new Date(timestamp);
// //         const now = new Date();
// //         const diffMin = (now - date) / (1000 * 60);
// //         if (diffMin < 1) return 'Just now';
// //         if (diffMin < 60) return `${Math.floor(diffMin)} min ago`;
// //         if (diffMin < 1440) return `${Math.floor(diffMin / 60)} hours ago`;
// //         return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
// //     };

// //     const groupedMessages = messages.reduce((acc, msg) => {
// //         const day = new Date(msg.timestamp).toDateString();
// //         if (!acc[day]) acc[day] = [];
// //         acc[day].push(msg);
// //         return acc;
// //     }, {});

// //     return (
// //         <div className="chat-modal-overlay">
// //             <div className="chat-modal">
// //                 {/* Header */}
// //                 <div className="chat-header">
// //                     <div className="chat-header-info">
// //                         <div className="support-avatar">💬</div>
// //                         <div className="chat-title">
// //                             <h4>Customer Support</h4>
// //                             <div className="status-indicator">
// //                                 <span className="status-dot"></span>
// //                                 <span>Online</span>
// //                             </div>
// //                         </div>
// //                     </div>
// //                     <div className="chat-actions">
// //                         <button className="btn-icon" onClick={handleRetry}>
// //                             <RefreshCw size={16} />
// //                         </button>
// //                         <button className="btn-icon close-btn" onClick={onClose}>
// //                             ×
// //                         </button>
// //                     </div>
// //                 </div>

// //                 {/* Order Info */}
// //                 {orderId && (
// //                     <div className="order-banner">
// //                         <span>Order #{orderId}</span>
// //                         <button className="btn-link">View Details</button>
// //                     </div>
// //                 )}

// //                 {/* Error */}
// //                 {error && (
// //                     <div className="error-banner">
// //                         <span>{error}</span>
// //                         <button onClick={handleRetry}>Retry</button>
// //                     </div>
// //                 )}

// //                 {/* Messages */}
// //                 <div className="chat-messages-container">
// //                     {isLoading ? (
// //                         <div className="loading-state">
// //                             <div className="loading-spinner"></div>
// //                             <p>Loading messages...</p>
// //                         </div>
// //                     ) : messages.length === 0 ? (
// //                         <div className="empty-state">
// //                             <p>No messages yet. Start chatting!</p>
// //                         </div>
// //                     ) : (
// //                         Object.entries(groupedMessages).map(([date, msgs]) => (
// //                             <div key={date}>
// //                                 <div className="date-divider">
// //                                     <span>{new Date(date).toLocaleDateString()}</span>
// //                                 </div>
// //                                 {msgs.map((msg, i) => (
// //                                     <div
// //                                         key={msg._id || i}
// //                                         className={`message-wrapper ${msg.sender === 'user' ? 'user' : 'admin'
// //                                             }`}
// //                                     >
// //                                         {msg.sender === 'admin' && (
// //                                             <div className="message-avatar">A</div>
// //                                         )}
// //                                         <div className="message-content">
// //                                             <div className={`message-bubble ${msg.sender}`}>
// //                                                 <p>{msg.text}</p>
// //                                             </div>
// //                                             <div className="message-meta">
// //                                                 <span>{msg.sender === 'user' ? 'You' : 'Support'}</span>
// //                                                 <span>•</span>
// //                                                 <span>{formatTime(msg.timestamp)}</span>
// //                                             </div>
// //                                         </div>
// //                                         {msg.sender === 'user' && (
// //                                             <div className="message-avatar user">U</div>
// //                                         )}
// //                                     </div>
// //                                 ))}
// //                             </div>
// //                         ))
// //                     )}
// //                     <div ref={messagesEndRef} />
// //                 </div>

// //                 {/* Input */}
// //                 <div className="chat-input-container">
// //                     <div className="input-actions">
// //                         <button className="btn-attachment">
// //                             <Paperclip size={18} />
// //                         </button>
// //                         <button className="btn-emoji">
// //                             <Smile size={18} />
// //                         </button>
// //                     </div>
// //                     <div className="input-wrapper">
// //                         <input
// //                             type="text"
// //                             placeholder="Type your message..."
// //                             value={inputMessage}
// //                             onChange={(e) => setInputMessage(e.target.value)}
// //                             onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
// //                             disabled={isSending}
// //                         />
// //                     </div>
// //                     <button
// //                         className={`btn-send ${isSending ? 'sending' : ''}`}
// //                         onClick={handleSendMessage}
// //                         disabled={!inputMessage.trim() || isSending}
// //                     >
// //                         {isSending ? <div className="sending-spinner"></div> : <Send size={18} />}
// //                     </button>
// //                 </div>
// //             </div>

// //             <style jsx>{`
// //                 .chat-modal-overlay {
// //                     position: fixed;
// //                     inset: 0;
// //                     background: rgba(0, 0, 0, 0.5);
// //                     display: flex;
// //                     align-items: center;
// //                     justify-content: center;
// //                     z-index: 1000;
// //                 }
// //                 .chat-modal {
// //                     width: 90%;
// //                     max-width: 400px;
// //                     height: 80%;
// //                     background: white;
// //                     border-radius: 12px;
// //                     display: flex;
// //                     flex-direction: column;
// //                 }
// //                 .chat-header {
// //                     display: flex;
// //                     justify-content: space-between;
// //                     align-items: center;
// //                     padding: 16px;
// //                     border-bottom: 1px solid #e5e7eb;
// //                 }
// //                 .chat-header-info {
// //                     display: flex;
// //                     align-items: center;
// //                     gap: 12px;
// //                 }
// //                 .support-avatar {
// //                     width: 40px;
// //                     height: 40px;
// //                     background: #6366f1;
// //                     border-radius: 50%;
// //                     color: white;
// //                     display: flex;
// //                     align-items: center;
// //                     justify-content: center;
// //                     font-size: 20px;
// //                 }
// //                 .chat-messages-container {
// //                     flex: 1;
// //                     overflow-y: auto;
// //                     background: #f9fafb;
// //                     padding: 16px;
// //                 }
// //                 .message-wrapper {
// //                     display: flex;
// //                     gap: 8px;
// //                     margin-bottom: 12px;
// //                 }
// //                 .message-wrapper.user {
// //                     flex-direction: row-reverse;
// //                 }
// //                 .message-bubble {
// //                     padding: 10px 14px;
// //                     border-radius: 16px;
// //                     max-width: 70%;
// //                 }
// //                 .message-bubble.user {
// //                     background: #6366f1;
// //                     color: white;
// //                 }
// //                 .message-bubble.admin {
// //                     background: white;
// //                     border: 1px solid #e5e7eb;
// //                 }
// //                 .chat-input-container {
// //                     display: flex;
// //                     align-items: center;
// //                     padding: 12px 16px;
// //                     border-top: 1px solid #e5e7eb;
// //                     background: white;
// //                 }
// //                 .chat-input-container input {
// //                     flex: 1;
// //                     padding: 10px 14px;
// //                     border: 1px solid #e5e7eb;
// //                     border-radius: 24px;
// //                     outline: none;
// //                 }
// //                 .btn-send {
// //                     background: #6366f1;
// //                     border: none;
// //                     color: white;
// //                     border-radius: 50%;
// //                     padding: 10px;
// //                     margin-left: 8px;
// //                     cursor: pointer;
// //                 }
// //                 .btn-send.sending {
// //                     background: #9ca3af;
// //                 }
// //             `}</style>
// //         </div>
// //     );
// // };

// // export default ChatModal;



// import React, { useState, useEffect, useRef } from 'react';
// import { Send } from 'lucide-react';
// import { io } from 'socket.io-client';
// import axiosInstance from '../utils/axiosInstance';

// const ChatModal = ({ orderId, onClose }) => {
//     const [messages, setMessages] = useState([]);
//     const [inputMessage, setInputMessage] = useState('');
//     const [socket, setSocket] = useState(null);
//     const [userId, setUserId] = useState(null);
//     const [chatId, setChatId] = useState(null);
//     const messagesEndRef = useRef(null);

//     // ✅ Initialize userId & socket
//     useEffect(() => {
//         const storedId = localStorage.getItem('userId');
//         if (!storedId) {
//             alert('Please log in before using chat.');
//             onClose();
//             return;
//         }
//         setUserId(storedId);

//         const newSocket = io('http://localhost:5000');
//         setSocket(newSocket);
//         return () => newSocket.disconnect();
//     }, [onClose]);

//     // ✅ Real-time updates
//     useEffect(() => {
//         if (!socket) return;
//         socket.on('newMessage', (msg) => {
//             if (msg.chatId === chatId) {
//                 setMessages((prev) => [...prev, msg]);
//             }
//         });
//     }, [socket, chatId]);

//     // ✅ Get or create chat, then load messages
//     useEffect(() => {
//         if (userId) initChat();
//     }, [userId]);

//     const initChat = async () => {
//         try {
//             // 1️⃣ Find or create a chat session for this user
//             const chatRes = await axiosInstance.get(`/chats/find/${userId}`);
//             if (chatRes.data.success && chatRes.data.chat) {
//                 setChatId(chatRes.data.chat._id);
//                 // 2️⃣ Load messages for that chat
//                 const msgRes = await axiosInstance.get(`/chats/sessions/${chatRes.data.chat._id}/messages`);
//                 if (msgRes.data.success) setMessages(msgRes.data.data);
//             }
//         } catch (err) {
//             console.error('❌ Chat initialization error:', err.message);
//         }
//     };

//     const handleSend = async () => {
//         if (!inputMessage.trim() || !userId) return;
//         const text = inputMessage.trim();
//         setInputMessage('');
//         const newMsg = { _id: Date.now(), text, sender: 'user', timestamp: new Date() };
//         setMessages((prev) => [...prev, newMsg]);

//         try {
//             const res = await axiosInstance.post(`/chats/${userId}/messages`, { text, sender: 'user' });
//             if (res.data.success && res.data.data?.chatId) {
//                 setChatId(res.data.data.chatId); // In case new chat created
//             }
//         } catch (err) {
//             console.error('❌ Send message failed:', err.message);
//         }
//     };

//     useEffect(() => {
//         messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }, [messages]);

//     return (
//         <div className="chat-modal-overlay">
//             <div className="chat-modal">
//                 <div className="chat-header">
//                     <h4>💬 Customer Support</h4>
//                     <button onClick={onClose} className="close-btn">×</button>
//                 </div>

//                 <div className="chat-messages">
//                     {messages.length === 0 ? (
//                         <p style={{ textAlign: 'center', color: '#888' }}>No messages yet.</p>
//                     ) : (
//                         messages.map((msg) => (
//                             <div key={msg._id} className={`msg ${msg.sender === 'user' ? 'user' : 'admin'}`}>
//                                 <div className="bubble">
//                                     <p>{msg.text}</p>
//                                     <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
//                                 </div>
//                             </div>
//                         ))
//                     )}
//                     <div ref={messagesEndRef} />
//                 </div>

//                 <div className="chat-inputs">
//                     <input
//                         value={inputMessage}
//                         onChange={(e) => setInputMessage(e.target.value)}
//                         onKeyDown={(e) => e.key === 'Enter' && handleSend()}
//                         placeholder="Type your message..."
//                     />
//                     <button onClick={handleSend}><Send size={18} /></button>
//                 </div>
//             </div>

//             <style>{`
//         .chat-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.3); display: flex; justify-content: center; align-items: center; z-index: 1000; }
//         .chat-modal { background: white; width: 400px; height: 550px; border-radius: 10px; display: flex; flex-direction: column; overflow: hidden; }
//         .chat-header { background: #8788c2; color: white; padding: 10px; display: flex; justify-content: space-between; align-items: center; }
//         .chat-messages { flex: 1; overflow-y: auto; padding: 10px; background: #f3f4f6; }
//         .chat-inputs { display: flex; gap: 5px;padding:15px; border-top: 1px solid #ddd; }
//         .chat-inputs input { flex: 1; border-radius: 20px; border: 1px solid #ccc; padding: 8px 12px; }
//         .msg { margin: 6px 0; display: flex; }
//         .msg.user { justify-content: flex-end; }
//         .bubble { background: white; padding: 8px 12px; border-radius: 14px; max-width: 70%; }
//         .msg.user .bubble { background: #dcdcf8;border:1px solid #c3c3da; color: white; }
//         .bubble span { font-size: 10px;color:#020229; display: block; text-align: right; opacity: 0.6; }
//         .close-btn { background: none; color: white; border: none; font-size: 22px; cursor: pointer; }
//         .chat-header h4{color:#28163c;}
//         .close-btn:hover{background: rgb(122 123 182);padding: 5px;border-radius: 100px;width: 35px;}
//       `}</style>
//         </div>
//     );
// };

// export default ChatModal;





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

        const newSocket = io('http://localhost:5000');
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