// // // // import React, { useState } from 'react';
// // // // import { MessageCircle, Phone, Video, MoreVertical, Search, Paperclip, Mic, Smile, Image, Send } from 'lucide-react';

// // // // const ChatApp = () => {
// // // //   const [selectedChat, setSelectedChat] = useState(null);
// // // //   const [message, setMessage] = useState('');
// // // //   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

// // // //   const contacts = [
// // // //     { id: 1, name: 'Patrick Griffith', message: 'Hello every one...', time: 'Just Now', active: true },
// // // //     { id: 2, name: 'David Martinez', message: 'How are you...', time: 'Wed 5:51 PM', active: false },
// // // //     { id: 3, name: 'Sutherland Lee', message: 'How can I help you...', time: 'Feb 3, 8:49 AM', active: true },
// // // //     { id: 4, name: 'Tony Wright', message: 'Tony sent a photo...', time: 'Feb 7, 5:29 AM', active: true },
// // // //     { id: 5, name: 'William Frost', message: 'What are you doing...', time: 'Feb 9, 9:32 AM', active: false },
// // // //     { id: 6, name: 'Paul Cupp', message: 'Voice message', time: 'Feb 9, 3:49 PM', active: true },
// // // //     { id: 7, name: 'Edward Cuellar', message: 'Edward attachment...', time: 'Feb 10, 8:49 PM', active: true },
// // // //     { id: 8, name: 'Janice Brown', message: 'Hello!', time: 'Feb 12, 5:29 AM', active: false },
// // // //     { id: 9, name: 'Carole Mathis', message: 'Carole sent a group', time: 'Feb 15, 2:56 PM', active: true },
// // // //     { id: 10, name: 'Robert Higgins', message: '', time: 'Feb 16, 6:35 PM', active: false }
// // // //   ];

// // // //   const chatMessages = [
// // // //     {
// // // //       id: 1,
// // // //       sender: 'Teresa Gilliam',
// // // //       messages: ['Hello', 'Good evening, how are you', 'I want to discuss our new project hotel management system'],
// // // //       time: '25 Feb at 3:30 PM',
// // // //       isOwn: false
// // // //     },
// // // //     {
// // // //       id: 2,
// // // //       sender: 'You',
// // // //       messages: ['Fine! How can I help you today?'],
// // // //       time: '25 Feb at 3:31 PM',
// // // //       isOwn: true
// // // //     },
// // // //     {
// // // //       id: 3,
// // // //       sender: 'Teresa Gilliam',
// // // //       messages: ['Hello', 'Good evening, how are you', 'I want to discuss with you about my new project'],
// // // //       time: '27 Feb at 4:35 PM',
// // // //       isOwn: false
// // // //     },
// // // //     {
// // // //       id: 4,
// // // //       sender: 'You',
// // // //       messages: ['Well, how can I help you?'],
// // // //       time: '27 Feb at 4:36 PM',
// // // //       isOwn: true
// // // //     },
// // // //     {
// // // //       id: 5,
// // // //       sender: 'You',
// // // //       messages: ['Hi, what happened'],
// // // //       time: '27 Feb at 4:37 PM',
// // // //       isOwn: true
// // // //     },
// // // //     {
// // // //       id: 6,
// // // //       sender: 'You',
// // // //       messages: ['Let me know what you need, I will help you with all kinds of information, thanks'],
// // // //       time: '25 Feb at 3:30 PM',
// // // //       isOwn: true
// // // //     }
// // // //   ];

// // // //   const getInitials = (name) => {
// // // //     return name.split(' ').map(n => n[0]).join('');
// // // //   };

// // // //   return (
// // // //     <div className="chat-container">
// // // //       <style>{`
// // // //         * {
// // // //           margin: 0;
// // // //           padding: 0;
// // // //           box-sizing: border-box;
// // // //         }

// // // //         body {
// // // //           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
// // // //         }

// // // //         .chat-container {
// // // //           display: flex;
// // // //           height: 100vh;
// // // //           background: #f5f7fb;
// // // //         }

// // // //         .sidebar {
// // // //           width: 380px;
// // // //           background: white;
// // // //           border-right: 1px solid #e5e7eb;
// // // //           display: flex;
// // // //           flex-direction: column;
// // // //           transition: transform 0.3s ease;
// // // //         }

// // // //         .sidebar.mobile-hidden {
// // // //           transform: translateX(-100%);
// // // //           position: absolute;
// // // //           z-index: 1000;
// // // //           height: 100%;
// // // //         }

// // // //         .sidebar-header {
// // // //           padding: 20px;
// // // //           border-bottom: 1px solid #e5e7eb;
// // // //         }

// // // //         .sidebar-title {
// // // //           font-size: 20px;
// // // //           font-weight: 600;
// // // //           color: #1f2937;
// // // //           margin-bottom: 15px;
// // // //         }

// // // //         .search-box {
// // // //           position: relative;
// // // //         }

// // // //         .search-input {
// // // //           width: 100%;
// // // //           padding: 10px 15px 10px 40px;
// // // //           border: 1px solid #e5e7eb;
// // // //           border-radius: 8px;
// // // //           font-size: 14px;
// // // //           outline: none;
// // // //           background: #f9fafb;
// // // //         }

// // // //         .search-input:focus {
// // // //           background: white;
// // // //           border-color: #6366f1;
// // // //         }

// // // //         .search-icon {
// // // //           position: absolute;
// // // //           left: 12px;
// // // //           top: 50%;
// // // //           transform: translateY(-50%);
// // // //           color: #9ca3af;
// // // //         }

// // // //         .tabs {
// // // //           display: flex;
// // // //           gap: 20px;
// // // //           padding: 15px 20px;
// // // //           border-bottom: 1px solid #e5e7eb;
// // // //         }

// // // //         .tab {
// // // //           padding: 8px 0;
// // // //           font-size: 14px;
// // // //           color: #6b7280;
// // // //           cursor: pointer;
// // // //           border-bottom: 2px solid transparent;
// // // //           transition: all 0.2s;
// // // //         }

// // // //         .tab.active {
// // // //           color: #1f2937;
// // // //           border-bottom-color: #6366f1;
// // // //           font-weight: 500;
// // // //         }

// // // //         .contacts-list {
// // // //           flex: 1;
// // // //           overflow-y: auto;
// // // //         }

// // // //         .contact-item {
// // // //           display: flex;
// // // //           align-items: center;
// // // //           padding: 15px 20px;
// // // //           cursor: pointer;
// // // //           transition: background 0.2s;
// // // //           border-bottom: 1px solid #f3f4f6;
// // // //         }

// // // //         .contact-item:hover {
// // // //           background: #f9fafb;
// // // //         }

// // // //         .contact-item.active {
// // // //           background: #eff6ff;
// // // //         }

// // // //         .avatar {
// // // //           width: 48px;
// // // //           height: 48px;
// // // //           border-radius: 50%;
// // // //           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
// // // //           display: flex;
// // // //           align-items: center;
// // // //           justify-content: center;
// // // //           color: white;
// // // //           font-weight: 600;
// // // //           font-size: 16px;
// // // //           margin-right: 12px;
// // // //           position: relative;
// // // //           flex-shrink: 0;
// // // //         }

// // // //         .avatar.online::after {
// // // //           content: '';
// // // //           position: absolute;
// // // //           bottom: 2px;
// // // //           right: 2px;
// // // //           width: 12px;
// // // //           height: 12px;
// // // //           background: #10b981;
// // // //           border: 2px solid white;
// // // //           border-radius: 50%;
// // // //         }

// // // //         .contact-info {
// // // //           flex: 1;
// // // //           min-width: 0;
// // // //         }

// // // //         .contact-name {
// // // //           font-weight: 500;
// // // //           color: #1f2937;
// // // //           margin-bottom: 4px;
// // // //           font-size: 15px;
// // // //         }

// // // //         .contact-message {
// // // //           color: #6b7280;
// // // //           font-size: 13px;
// // // //           white-space: nowrap;
// // // //           overflow: hidden;
// // // //           text-overflow: ellipsis;
// // // //         }

// // // //         .contact-time {
// // // //           font-size: 12px;
// // // //           color: #9ca3af;
// // // //           flex-shrink: 0;
// // // //           margin-left: 8px;
// // // //         }

// // // //         .chat-area {
// // // //           flex: 1;
// // // //           display: flex;
// // // //           flex-direction: column;
// // // //           background: white;
// // // //         }

// // // //         .chat-header {
// // // //           display: flex;
// // // //           align-items: center;
// // // //           padding: 15px 25px;
// // // //           border-bottom: 1px solid #e5e7eb;
// // // //           background: white;
// // // //         }

// // // //         .mobile-menu-btn {
// // // //           display: none;
// // // //           background: none;
// // // //           border: none;
// // // //           padding: 8px;
// // // //           margin-right: 10px;
// // // //           cursor: pointer;
// // // //           color: #6b7280;
// // // //         }

// // // //         .chat-header-info {
// // // //           flex: 1;
// // // //           display: flex;
// // // //           align-items: center;
// // // //         }

// // // //         .chat-header-avatar {
// // // //           width: 40px;
// // // //           height: 40px;
// // // //           border-radius: 50%;
// // // //           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
// // // //           display: flex;
// // // //           align-items: center;
// // // //           justify-content: center;
// // // //           color: white;
// // // //           font-weight: 600;
// // // //           margin-right: 12px;
// // // //         }

// // // //         .chat-header-details h3 {
// // // //           font-size: 16px;
// // // //           font-weight: 600;
// // // //           color: #1f2937;
// // // //           margin-bottom: 2px;
// // // //         }

// // // //         .chat-header-details p {
// // // //           font-size: 13px;
// // // //           color: #10b981;
// // // //         }

// // // //         .chat-actions {
// // // //           display: flex;
// // // //           gap: 15px;
// // // //         }

// // // //         .icon-btn {
// // // //           background: none;
// // // //           border: none;
// // // //           padding: 8px;
// // // //           cursor: pointer;
// // // //           color: #6b7280;
// // // //           display: flex;
// // // //           align-items: center;
// // // //           justify-content: center;
// // // //           transition: color 0.2s;
// // // //         }

// // // //         .icon-btn:hover {
// // // //           color: #4f46e5;
// // // //         }

// // // //         .messages-container {
// // // //           flex: 1;
// // // //           overflow-y: auto;
// // // //           padding: 50px;
// // // //           background: #f9fafb;
// // // //         }

// // // //         .message-group {
// // // //           margin-bottom: 20px;
// // // //         }

// // // //         .message-time {
// // // //           text-align: center;
// // // //           color: #9ca3af;
// // // //           font-size: 12px;
// // // //           margin-bottom: 15px;
// // // //         }

// // // //         .message-bubble {
// // // //           max-width: 60%;
// // // //           margin-bottom: 8px;
// // // //           animation: slideIn 0.3s ease;
// // // //         }

// // // //         @keyframes slideIn {
// // // //           from {
// // // //             opacity: 0;
// // // //             transform: translateY(10px);
// // // //           }
// // // //           to {
// // // //             opacity: 1;
// // // //             transform: translateY(0);
// // // //           }
// // // //         }

// // // //         .message-bubble.own {
// // // //           margin-left: auto;
// // // //         }

// // // //         .message-content {
// // // //           background: white;
// // // //           padding: 12px 16px;
// // // //           border-radius: 16px;
// // // //           font-size: 14px;
// // // //           color: #1f2937;
// // // //           box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
// // // //         }

// // // //         .message-bubble.own .message-content {
// // // //           background: #6366f1;
// // // //           color: white;
// // // //           border-bottom-right-radius: 4px;
// // // //         }

// // // //         .message-bubble:not(.own) .message-content {
// // // //           border-bottom-left-radius: 4px;
// // // //         }

// // // //         .message-input-container {
// // // //           padding: 20px 25px;
// // // //           border-top: 1px solid #e5e7eb;
// // // //           background: white;
// // // //         }

// // // //         .message-input-wrapper {
// // // //           display: flex;
// // // //           align-items: center;
// // // //           gap: 12px;
// // // //         }

// // // //         .input-icons {
// // // //           display: flex;
// // // //           gap: 10px;
// // // //         }

// // // //         .message-input {
// // // //           flex: 1;
// // // //           padding: 12px 16px;
// // // //           border: 1px solid #e5e7eb;
// // // //           border-radius: 24px;
// // // //           font-size: 14px;
// // // //           outline: none;
// // // //           background: #f9fafb;
// // // //         }

// // // //         .message-input:focus {
// // // //           background: white;
// // // //           border-color: #6366f1;
// // // //         }

// // // //         .send-btn {
// // // //           background: #6366f1;
// // // //           border: none;
// // // //           padding: 12px;
// // // //           border-radius: 50%;
// // // //           cursor: pointer;
// // // //           color: white;
// // // //           display: flex;
// // // //           align-items: center;
// // // //           justify-content: center;
// // // //           transition: background 0.2s;
// // // //         }

// // // //         .send-btn:hover {
// // // //           background: #4f46e5;
// // // //         }

// // // //         .empty-state {
// // // //           display: flex;
// // // //           flex-direction: column;
// // // //           align-items: center;
// // // //           justify-content: center;
// // // //           height: 100%;
// // // //           color: #9ca3af;
// // // //         }

// // // //         .empty-state svg {
// // // //           width: 64px;
// // // //           height: 64px;
// // // //           margin-bottom: 16px;
// // // //         }

// // // //         @media (max-width: 768px) {
// // // //           .sidebar {
// // // //             width: 100%;
// // // //             position: absolute;
// // // //             z-index: 1000;
// // // //           }

// // // //           .sidebar.mobile-hidden {
// // // //             transform: translateX(-100%);
// // // //           }

// // // //           .mobile-menu-btn {
// // // //             display: block;
// // // //           }

// // // //           .message-bubble {
// // // //             max-width: 80%;
// // // //           }

// // // //           .chat-actions {
// // // //             gap: 8px;
// // // //           }

// // // //           .input-icons {
// // // //             gap: 6px;
// // // //           }
// // // //         }

// // // //         @media (max-width: 480px) {
// // // //           .sidebar {
// // // //             width: 100%;
// // // //           }

// // // //           .contact-item {
// // // //             padding: 12px 15px;
// // // //           }

// // // //           .avatar {
// // // //             width: 40px;
// // // //             height: 40px;
// // // //             font-size: 14px;
// // // //           }

// // // //           .messages-container {
// // // //             padding: 15px;
// // // //           }

// // // //           .message-input-container {
// // // //             padding: 15px;
// // // //           }

// // // //           .message-bubble {
// // // //             max-width: 85%;
// // // //           }

// // // //           .contact-time {
// // // //             display: none;
// // // //           }
// // // //         }
// // // //       `}</style>

// // // //       <div className={`sidebar ${!isSidebarOpen ? 'mobile-hidden' : ''}`}>
// // // //         <div className="sidebar-header">
// // // //           <h2 className="sidebar-title">Teresa Gilliam</h2>
// // // //           <div className="search-box">
// // // //             <Search className="search-icon" size={18} />
// // // //             <input 
// // // //               type="text" 
// // // //               className="search-input" 
// // // //               placeholder="Search here..."
// // // //             />
// // // //           </div>
// // // //         </div>

// // // //         <div className="tabs">
// // // //           <div className="tab active">All Message</div>
// // // //           <div className="tab">Group Chat</div>
// // // //         </div>

// // // //         <div className="contacts-list">
// // // //           {contacts.map(contact => (
// // // //             <div 
// // // //               key={contact.id}
// // // //               className={`contact-item ${selectedChat === contact.id ? 'active' : ''}`}
// // // //               onClick={() => {
// // // //                 setSelectedChat(contact.id);
// // // //                 if (window.innerWidth <= 768) {
// // // //                   setIsSidebarOpen(false);
// // // //                 }
// // // //               }}
// // // //             >
// // // //               <div className={`avatar ${contact.active ? 'online' : ''}`}>
// // // //                 {getInitials(contact.name)}
// // // //               </div>
// // // //               <div className="contact-info">
// // // //                 <div className="contact-name">{contact.name}</div>
// // // //                 <div className="contact-message">{contact.message}</div>
// // // //               </div>
// // // //               <div className="contact-time">{contact.time}</div>
// // // //             </div>
// // // //           ))}
// // // //         </div>
// // // //       </div>

// // // //       <div className="chat-area">
// // // //         {selectedChat ? (
// // // //           <>
// // // //             <div className="chat-header">
// // // //               <button 
// // // //                 className="mobile-menu-btn"
// // // //                 onClick={() => setIsSidebarOpen(true)}
// // // //               >
// // // //                 ☰
// // // //               </button>
// // // //               <div className="chat-header-info">
// // // //                 <div className="chat-header-avatar">TG</div>
// // // //                 <div className="chat-header-details">
// // // //                   <h3>Teresa Gilliam</h3>
// // // //                   <p>Active Now</p>
// // // //                 </div>
// // // //               </div>
// // // //               <div className="chat-actions">
// // // //                 <button className="icon-btn">
// // // //                   <Phone size={20} />
// // // //                 </button>
// // // //                 <button className="icon-btn">
// // // //                   <Video size={20} />
// // // //                 </button>
// // // //                 <button className="icon-btn">
// // // //                   <MoreVertical size={20} />
// // // //                 </button>
// // // //               </div>
// // // //             </div>

// // // //             <div className="messages-container">
// // // //               {chatMessages.map(msg => (
// // // //                 <div key={msg.id} className="message-group">
// // // //                   <div className="message-time">{msg.time}</div>
// // // //                   {msg.messages.map((text, idx) => (
// // // //                     <div key={idx} className={`message-bubble ${msg.isOwn ? 'own' : ''}`}>
// // // //                       <div className="message-content">{text}</div>
// // // //                     </div>
// // // //                   ))}
// // // //                 </div>
// // // //               ))}
// // // //             </div>

// // // //             <div className="message-input-container">
// // // //               <div className="message-input-wrapper">
// // // //                 <div className="input-icons">
// // // //                   <button className="icon-btn">
// // // //                     <Smile size={20} />
// // // //                   </button>
// // // //                   <button className="icon-btn">
// // // //                     <Paperclip size={20} />
// // // //                   </button>
// // // //                   <button className="icon-btn">
// // // //                     <Mic size={20} />
// // // //                   </button>
// // // //                   <button className="icon-btn">
// // // //                     <Image size={20} />
// // // //                   </button>
// // // //                 </div>
// // // //                 <input
// // // //                   type="text"
// // // //                   className="message-input"
// // // //                   placeholder="Type your message..."
// // // //                   value={message}
// // // //                   onChange={(e) => setMessage(e.target.value)}
// // // //                   onKeyPress={(e) => {
// // // //                     if (e.key === 'Enter' && message.trim()) {
// // // //                       setMessage('');
// // // //                     }
// // // //                   }}
// // // //                 />
// // // //                 <button className="send-btn">
// // // //                   <Send size={20} />
// // // //                 </button>
// // // //               </div>
// // // //             </div>
// // // //           </>
// // // //         ) : (
// // // //           <div className="empty-state">
// // // //             <MessageCircle size={64} />
// // // //             <p>Select a conversation to start messaging</p>
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ChatApp;









// // // import React, { useState, useEffect, useRef } from 'react';
// // // import { Search, MessageCircle, Phone, Video, MoreVertical, Send, Paperclip, Smile, Image, Mic, Filter, Download, Users, RefreshCw } from 'lucide-react';
// // // import { io } from 'socket.io-client';

// // // const AdminChat = () => {
// // //   const [selectedChat, setSelectedChat] = useState(null);
// // //   const [chats, setChats] = useState([]);
// // //   const [messages, setMessages] = useState([]);
// // //   const [inputMessage, setInputMessage] = useState('');
// // //   const [isLoading, setIsLoading] = useState(true);
// // //   const [isSending, setIsSending] = useState(false);
// // //   const [searchTerm, setSearchTerm] = useState('');
// // //   const [activeFilter, setActiveFilter] = useState('all');
// // //   const [error, setError] = useState('');
// // //   const [socket, setSocket] = useState(null);
// // //   const messagesEndRef = useRef(null);

// // //   // Initialize socket connection
// // //   useEffect(() => {
// // //     const newSocket = io('http://localhost:5000');
// // //     setSocket(newSocket);

// // //     return () => {
// // //       if (newSocket) {
// // //         newSocket.disconnect();
// // //       }
// // //     };
// // //   }, []);

// // //   // Join chat room when selectedChat changes
// // //   useEffect(() => {
// // //     if (socket && selectedChat) {
// // //       socket.emit('joinChat', selectedChat._id);
// // //       return () => {
// // //         socket.emit('leaveChat', selectedChat._id);
// // //       };
// // //     }
// // //   }, [socket, selectedChat]);

// // //   // Listen for new messages
// // //   useEffect(() => {
// // //     if (socket) {
// // //       socket.on('newMessage', (newMessage) => {
// // //         if (selectedChat && newMessage.chatId === selectedChat._id) {
// // //           setMessages(prev => [...prev, newMessage]);
// // //         } else {
// // //           // Update the chat list with the new message
// // //           setChats(prevChats =>
// // //             prevChats.map(chat =>
// // //               chat._id === newMessage.chatId
// // //                 ? {
// // //                     ...chat,
// // //                     lastMessage: newMessage.text,
// // //                     lastMessageTime: newMessage.timestamp,
// // //                     unreadCount: (chat.unreadCount || 0) + 1
// // //                   }
// // //                 : chat
// // //             )
// // //           );
// // //         }
// // //       });
// // //     }
// // //   }, [socket, selectedChat]);

// // //   // Scroll to bottom when messages change
// // //   useEffect(() => {
// // //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// // //   }, [messages]);

// // //   // Fetch all chats for admin
// // //   const fetchChats = async () => {
// // //     try {
// // //       setIsLoading(true);
// // //       setError('');
// // //       const token = localStorage.getItem('token');

// // //       const response = await fetch('/api/chats/admin/chats', {
// // //         headers: {
// // //           'Authorization': `Bearer ${token}`,
// // //           'Content-Type': 'application/json'
// // //         }
// // //       });

// // //       if (response.ok) {
// // //         const result = await response.json();
// // //         if (result.success) {
// // //           setChats(result.data || []);
// // //         } else {
// // //           throw new Error(result.message || 'Failed to fetch chats');
// // //         }
// // //       } else {
// // //         const errorData = await response.json().catch(() => ({}));
// // //         throw new Error(errorData.message || 'Failed to fetch chats');
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching chats:', error);
// // //       setError(error.message);
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   // Fetch messages for selected chat
// // //   const fetchMessages = async (chat) => {
// // //     if (!chat || !chat._id) {
// // //       console.error('No chat or chatId provided');
// // //       return;
// // //     }

// // //     try {
// // //       setIsLoading(true);
// // //       setError('');
// // //       const token = localStorage.getItem('token');

// // //       const response = await fetch(`/api/chats/sessions/${chat._id}/messages`, {
// // //         headers: {
// // //           'Authorization': `Bearer ${token}`,
// // //           'Content-Type': 'application/json'
// // //         }
// // //       });

// // //       if (response.ok) {
// // //         const result = await response.json();
// // //         if (result.success) {
// // //           setMessages(result.data || []);
// // //         } else {
// // //           throw new Error(result.message || 'Failed to fetch messages');
// // //         }
// // //       } else {
// // //         const errorData = await response.json().catch(() => ({}));
// // //         throw new Error(errorData.message || 'Failed to fetch messages');
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching messages:', error);
// // //       setError(error.message);
// // //       setMessages([]);
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   // Send message as admin
// // //   const handleSendMessage = async () => {
// // //     if (!inputMessage.trim() || isSending || !selectedChat) {
// // //       return;
// // //     }

// // //     try {
// // //       setIsSending(true);
// // //       setError('');
// // //       const token = localStorage.getItem('token');

// // //       // Get the user ID from the selected chat
// // //       const userId = selectedChat.userId?._id || selectedChat.userId;

// // //       if (!userId) {
// // //         throw new Error('User ID is not available for this chat');
// // //       }

// // //       const messageData = {
// // //         text: inputMessage.trim(),
// // //         sender: 'admin'
// // //       };

// // //       const response = await fetch(`/api/chats/sessions/${userId}/messages`, {
// // //         method: 'POST',
// // //         headers: {
// // //           'Authorization': `Bearer ${token}`,
// // //           'Content-Type': 'application/json'
// // //         },
// // //         body: JSON.stringify(messageData)
// // //       });

// // //       if (response.ok) {
// // //         const result = await response.json();
// // //         if (result.success) {
// // //           setInputMessage('');
// // //           // The new message will be added via socket
// // //         } else {
// // //           throw new Error(result.message || 'Failed to send message');
// // //         }
// // //       } else {
// // //         const errorData = await response.json().catch(() => ({}));
// // //         throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
// // //       }
// // //     } catch (error) {
// // //       console.error('Error sending message:', error);
// // //       setError(error.message);
// // //     } finally {
// // //       setIsSending(false);
// // //     }
// // //   };

// // //   // Handle chat selection
// // //   const handleSelectChat = (chat) => {
// // //     setSelectedChat(chat);
// // //     setError('');
// // //     fetchMessages(chat);

// // //     // Mark chat as read
// // //     if (chat.unreadCount > 0) {
// // //       setChats(prevChats =>
// // //         prevChats.map(c =>
// // //           c._id === chat._id ? { ...c, unreadCount: 0 } : c
// // //         )
// // //       );
// // //     }
// // //   };

// // //   // Filter chats based on search and filter
// // //   const filteredChats = chats.filter(chat => {
// // //     const userName = chat.userId?.name || 'Unknown User';
// // //     const matchesSearch = userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //                          (chat.lastMessage || '').toLowerCase().includes(searchTerm.toLowerCase());

// // //     if (activeFilter === 'unread') {
// // //       return matchesSearch && (chat.unreadCount > 0);
// // //     }
// // //     return matchesSearch;
// // //   });

// // //   // Format time for chat list
// // //   const formatChatTime = (timestamp) => {
// // //     if (!timestamp) return '';
// // //     try {
// // //       const date = new Date(timestamp);
// // //       const now = new Date();
// // //       const diffInHours = (now - date) / (1000 * 60 * 60);

// // //       if (diffInHours < 24) {
// // //         return date.toLocaleTimeString('en-US', {
// // //           hour: '2-digit',
// // //           minute: '2-digit',
// // //           hour12: true
// // //         });
// // //       } else {
// // //         return date.toLocaleDateString('en-US', {
// // //           month: 'short',
// // //           day: 'numeric'
// // //         });
// // //       }
// // //     } catch (error) {
// // //       return '';
// // //     }
// // //   };

// // //   // Format time for messages
// // //   const formatMessageTime = (timestamp) => {
// // //     try {
// // //       const date = new Date(timestamp);
// // //       return date.toLocaleTimeString('en-US', {
// // //         hour: '2-digit',
// // //         minute: '2-digit',
// // //         hour12: true
// // //       });
// // //     } catch (error) {
// // //       return '';
// // //     }
// // //   };

// // //   // Group messages by date
// // //   const groupMessagesByDate = (messages) => {
// // //     const groups = {};
// // //     messages.forEach(message => {
// // //       try {
// // //         const date = new Date(message.timestamp).toDateString();
// // //         if (!groups[date]) {
// // //           groups[date] = [];
// // //         }
// // //         groups[date].push(message);
// // //       } catch (error) {
// // //         console.error('Error grouping message:', error);
// // //       }
// // //     });
// // //     return groups;
// // //   };

// // //   // Initialize data
// // //   useEffect(() => {
// // //     fetchChats();
// // //   }, []);

// // //   const messageGroups = groupMessagesByDate(messages);

// // //   return (
// // //     <div className="admin-chat-container">
// // //       <div className="chat-layout">
// // //         {/* Sidebar */}
// // //         <div className="sidebar">
// // //           <div className="sidebar-header">
// // //             <div className="sidebar-title-section">
// // //               <h2 className="sidebar-title">Customer Chats</h2>
// // //               <span className="chat-count">{filteredChats.length} conversations</span>
// // //             </div>
// // //             <div className="search-box">
// // //               <Search className="search-icon" size={18} />
// // //               <input
// // //                 type="text"
// // //                 className="search-input"
// // //                 placeholder="Search chats..."
// // //                 value={searchTerm}
// // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // //               />
// // //             </div>
// // //           </div>
// // //           <div className="filters-section">
// // //             <div className="filter-tabs">
// // //               <button
// // //                 className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
// // //                 onClick={() => setActiveFilter('all')}
// // //               >
// // //                 All Chats
// // //               </button>
// // //               <button
// // //                 className={`filter-tab ${activeFilter === 'unread' ? 'active' : ''}`}
// // //                 onClick={() => setActiveFilter('unread')}
// // //               >
// // //                 Unread
// // //                 {chats.filter(chat => chat.unreadCount > 0).length > 0 && (
// // //                   <span className="unread-badge">
// // //                     {chats.filter(chat => chat.unreadCount > 0).length}
// // //                   </span>
// // //                 )}
// // //               </button>
// // //             </div>
// // //             <button className="export-btn" onClick={fetchChats}>
// // //               <RefreshCw size={16} />
// // //               Refresh
// // //             </button>
// // //           </div>
// // //           {error && (
// // //             <div className="error-banner">
// // //               {error}
// // //               <button onClick={() => setError('')} className="error-close">×</button>
// // //             </div>
// // //           )}
// // //           <div className="chats-list">
// // //             {isLoading ? (
// // //               <div className="loading-chats">
// // //                 <div className="loading-spinner"></div>
// // //                 <p>Loading chats...</p>
// // //               </div>
// // //             ) : filteredChats.length === 0 ? (
// // //               <div className="empty-chats">
// // //                 <Users size={48} className="empty-icon" />
// // //                 <p>No chats found</p>
// // //                 <span>Customer messages will appear here</span>
// // //               </div>
// // //             ) : (
// // //               filteredChats.map(chat => (
// // //                 <div
// // //                   key={chat._id}
// // //                   className={`chat-item ${selectedChat?._id === chat._id ? 'active' : ''}`}
// // //                   onClick={() => handleSelectChat(chat)}
// // //                 >
// // //                   <div className="chat-avatar">
// // //                     {(chat.userId?.name?.charAt(0) || 'U').toUpperCase()}
// // //                     {chat.unreadCount > 0 && (
// // //                       <span className="unread-indicator">
// // //                         {chat.unreadCount}
// // //                       </span>
// // //                     )}
// // //                   </div>
// // //                   <div className="chat-info">
// // //                     <div className="chat-header">
// // //                       <h4 className="chat-name">{chat.userId?.name || 'Unknown User'}</h4>
// // //                       <span className="chat-time">{formatChatTime(chat.lastMessageTime)}</span>
// // //                     </div>
// // //                     <div className="chat-preview">
// // //                       <p className="last-message">
// // //                         {chat.lastMessage || 'No messages yet'}
// // //                       </p>
// // //                       {chat.unreadCount > 0 && (
// // //                         <div className="unread-dot"></div>
// // //                       )}
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               ))
// // //             )}
// // //           </div>
// // //         </div>

// // //         {/* Chat Area */}
// // //         <div className="chat-area">
// // //           {selectedChat ? (
// // //             <>
// // //               <div className="chat-header">
// // //                 <div className="chat-user-info">
// // //                   <div className="user-avatar">
// // //                     {(selectedChat.userId?.name?.charAt(0) || 'U').toUpperCase()}
// // //                   </div>
// // //                   <div className="user-details">
// // //                     <h3>{selectedChat.userId?.name || 'Unknown User'}</h3>
// // //                     <p className="user-status">
// // //                       <span className="status-dot online"></span>
// // //                       Online
// // //                     </p>
// // //                   </div>
// // //                 </div>
// // //                 <div className="chat-actions">
// // //                   <button className="icon-btn" title="Call">
// // //                     <Phone size={20} />
// // //                   </button>
// // //                   <button className="icon-btn" title="Video Call">
// // //                     <Video size={20} />
// // //                   </button>
// // //                   <button className="icon-btn" title="More options">
// // //                     <MoreVertical size={20} />
// // //                   </button>
// // //                 </div>
// // //               </div>

// // //               <div className="messages-container">
// // //                 {isLoading ? (
// // //                   <div className="loading-messages">
// // //                     <div className="loading-spinner"></div>
// // //                     <p>Loading messages...</p>
// // //                   </div>
// // //                 ) : messages.length === 0 ? (
// // //                   <div className="empty-messages">
// // //                     <MessageCircle size={48} className="empty-icon" />
// // //                     <p>No messages yet</p>
// // //                     <span>Start a conversation with {selectedChat.userId?.name || 'the user'}</span>
// // //                   </div>
// // //                 ) : (
// // //                   Object.entries(messageGroups).map(([date, dayMessages]) => (
// // //                     <div key={date} className="message-date-group">
// // //                       <div className="date-divider">
// // //                         <span>{new Date(date).toLocaleDateString('en-US', {
// // //                           weekday: 'long',
// // //                           year: 'numeric',
// // //                           month: 'long',
// // //                           day: 'numeric'
// // //                         })}</span>
// // //                       </div>
// // //                       {dayMessages.map((message, index) => (
// // //                         <div
// // //                           key={message._id || `${message.timestamp}-${index}`}
// // //                           className={`message-bubble ${message.sender === 'admin' ? 'own' : ''}`}
// // //                         >
// // //                           <div className="message-content">
// // //                             <p>{message.text}</p>
// // //                             <span className="message-time">
// // //                               {formatMessageTime(message.timestamp)}
// // //                             </span>
// // //                           </div>
// // //                         </div>
// // //                       ))}
// // //                     </div>
// // //                   ))
// // //                 )}
// // //                 <div ref={messagesEndRef} />
// // //               </div>

// // //               <div className="message-input-container">
// // //                 <div className="input-actions">
// // //                   <button className="icon-btn">
// // //                     <Smile size={20} />
// // //                   </button>
// // //                   <button className="icon-btn">
// // //                     <Paperclip size={20} />
// // //                   </button>
// // //                   <button className="icon-btn">
// // //                     <Image size={20} />
// // //                   </button>
// // //                 </div>
// // //                 <input
// // //                   type="text"
// // //                   className="message-input"
// // //                   placeholder="Type your message..."
// // //                   value={inputMessage}
// // //                   onChange={(e) => setInputMessage(e.target.value)}
// // //                   onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
// // //                   disabled={isSending}
// // //                 />
// // //                 <button
// // //                   className="send-btn"
// // //                   onClick={handleSendMessage}
// // //                   disabled={isSending || !inputMessage.trim() || !selectedChat}
// // //                 >
// // //                   {isSending ? (
// // //                     <div className="sending-spinner"></div>
// // //                   ) : (
// // //                     <Send size={20} />
// // //                   )}
// // //                 </button>
// // //               </div>
// // //             </>
// // //           ) : (
// // //             <div className="empty-chat">
// // //               <MessageCircle size={64} className="empty-icon" />
// // //               <h3>Select a conversation</h3>
// // //               <p>Choose a chat from the sidebar to start messaging</p>
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>

// // //       <style jsx>{`
// // //         .admin-chat-container {
// // //           height: 100vh;
// // //           background: #f8fafc;
// // //         }

// // //         .chat-layout {
// // //           display: flex;
// // //           height: 100%;
// // //           background: white;
// // //         }

// // //         /* Error Banner */
// // //         .error-banner {
// // //           background: #fef2f2;
// // //           border: 1px solid #fecaca;
// // //           color: #dc2626;
// // //           padding: 12px 16px;
// // //           margin: 0 16px;
// // //           border-radius: 8px;
// // //           display: flex;
// // //           justify-content: space-between;
// // //           align-items: center;
// // //           font-size: 14px;
// // //         }

// // //         .error-close {
// // //           background: none;
// // //           border: none;
// // //           color: #dc2626;
// // //           font-size: 18px;
// // //           cursor: pointer;
// // //           margin-left: auto;
// // //         }

// // //         /* Sidebar */
// // //         .sidebar {
// // //           width: 400px;
// // //           border-right: 1px solid #e5e7eb;
// // //           display: flex;
// // //           flex-direction: column;
// // //           background: white;
// // //         }

// // //         .sidebar-header {
// // //           padding: 24px;
// // //           border-bottom: 1px solid #e5e7eb;
// // //         }

// // //         .sidebar-title-section {
// // //           margin-bottom: 16px;
// // //         }

// // //         .sidebar-title {
// // //           font-size: 24px;
// // //           font-weight: 700;
// // //           color: #1f2937;
// // //           margin: 0 0 4px 0;
// // //         }

// // //         .chat-count {
// // //           font-size: 14px;
// // //           color: #6b7280;
// // //         }

// // //         .search-box {
// // //           position: relative;
// // //         }

// // //         .search-input {
// // //           width: 100%;
// // //           padding: 12px 16px 12px 40px;
// // //           border: 1px solid #e5e7eb;
// // //           border-radius: 12px;
// // //           font-size: 14px;
// // //           outline: none;
// // //           background: #f9fafb;
// // //           transition: all 0.2s;
// // //         }

// // //         .search-input:focus {
// // //           background: white;
// // //           border-color: #6366f1;
// // //           box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
// // //         }

// // //         .search-icon {
// // //           position: absolute;
// // //           left: 12px;
// // //           top: 50%;
// // //           transform: translateY(-50%);
// // //           color: #9ca3af;
// // //         }

// // //         .filters-section {
// // //           display: flex;
// // //           justify-content: space-between;
// // //           align-items: center;
// // //           padding: 16px 24px;
// // //           border-bottom: 1px solid #e5e7eb;
// // //         }

// // //         .filter-tabs {
// // //           display: flex;
// // //           gap: 8px;
// // //           background: #f3f4f6;
// // //           padding: 4px;
// // //           border-radius: 8px;
// // //         }

// // //         .filter-tab {
// // //           padding: 8px 16px;
// // //           border: none;
// // //           background: none;
// // //           border-radius: 6px;
// // //           font-size: 14px;
// // //           font-weight: 500;
// // //           color: #6b7280;
// // //           cursor: pointer;
// // //           display: flex;
// // //           align-items: center;
// // //           gap: 6px;
// // //           transition: all 0.2s;
// // //           position: relative;
// // //         }

// // //         .filter-tab.active {
// // //           background: white;
// // //           color: #1f2937;
// // //           box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
// // //         }

// // //         .unread-badge {
// // //           background: #ef4444;
// // //           color: white;
// // //           font-size: 12px;
// // //           padding: 2px 6px;
// // //           border-radius: 8px;
// // //           font-weight: 600;
// // //         }

// // //         .export-btn {
// // //           display: flex;
// // //           align-items: center;
// // //           gap: 6px;
// // //           padding: 8px 12px;
// // //           border: 1px solid #e5e7eb;
// // //           border-radius: 6px;
// // //           background: white;
// // //           color: #6b7280;
// // //           font-size: 14px;
// // //           cursor: pointer;
// // //           transition: all 0.2s;
// // //         }

// // //         .export-btn:hover {
// // //           background: #f9fafb;
// // //           border-color: #d1d5db;
// // //         }

// // //         .chats-list {
// // //           flex: 1;
// // //           overflow-y: auto;
// // //         }

// // //         .loading-chats {
// // //           display: flex;
// // //           flex-direction: column;
// // //           align-items: center;
// // //           justify-content: center;
// // //           height: 200px;
// // //           color: #6b7280;
// // //         }

// // //         .loading-spinner {
// // //           width: 32px;
// // //           height: 32px;
// // //           border: 3px solid #e5e7eb;
// // //           border-top: 3px solid #6366f1;
// // //           border-radius: 50%;
// // //           animation: spin 1s linear infinite;
// // //           margin-bottom: 12px;
// // //         }

// // //         .chat-item {
// // //           display: flex;
// // //           align-items: center;
// // //           padding: 16px 24px;
// // //           cursor: pointer;
// // //           transition: background 0.2s;
// // //           border-bottom: 1px solid #f3f4f6;
// // //           position: relative;
// // //         }

// // //         .chat-item:hover {
// // //           background: #f9fafb;
// // //         }

// // //         .chat-item.active {
// // //           background: #eff6ff;
// // //           border-right: 3px solid #6366f1;
// // //         }

// // //         .chat-avatar {
// // //           width: 48px;
// // //           height: 48px;
// // //           border-radius: 50%;
// // //           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
// // //           display: flex;
// // //           align-items: center;
// // //           justify-content: center;
// // //           color: white;
// // //           font-weight: 600;
// // //           font-size: 16px;
// // //           margin-right: 12px;
// // //           position: relative;
// // //           flex-shrink: 0;
// // //         }

// // //         .unread-indicator {
// // //           position: absolute;
// // //           top: -4px;
// // //           right: -4px;
// // //           background: #ef4444;
// // //           color: white;
// // //           font-size: 12px;
// // //           font-weight: 600;
// // //           padding: 2px 6px;
// // //           border-radius: 8px;
// // //           min-width: 18px;
// // //           text-align: center;
// // //         }

// // //         .chat-info {
// // //           flex: 1;
// // //           min-width: 0;
// // //         }

// // //         .chat-header {
// // //           display: flex;
// // //           justify-content: space-between;
// // //           align-items: center;
// // //           margin-bottom: 4px;
// // //         }

// // //         .chat-name {
// // //           font-weight: 600;
// // //           color: #1f2937;
// // //           margin: 0;
// // //           font-size: 15px;
// // //         }

// // //         .chat-time {
// // //           font-size: 12px;
// // //           color: #9ca3af;
// // //         }

// // //         .chat-preview {
// // //           display: flex;
// // //           justify-content: space-between;
// // //           align-items: center;
// // //         }

// // //         .last-message {
// // //           color: #6b7280;
// // //           font-size: 14px;
// // //           margin: 0;
// // //           white-space: nowrap;
// // //           overflow: hidden;
// // //           text-overflow: ellipsis;
// // //           flex: 1;
// // //         }

// // //         .unread-dot {
// // //           width: 8px;
// // //           height: 8px;
// // //           background: #6366f1;
// // //           border-radius: 50%;
// // //           margin-left: 8px;
// // //           flex-shrink: 0;
// // //         }

// // //         .empty-chats {
// // //           display: flex;
// // //           flex-direction: column;
// // //           align-items: center;
// // //           justify-content: center;
// // //           height: 200px;
// // //           color: #9ca3af;
// // //           text-align: center;
// // //           padding: 0 24px;
// // //         }

// // //         .empty-chats .empty-icon {
// // //           margin-bottom: 12px;
// // //           opacity: 0.5;
// // //         }

// // //         /* Chat Area Styles */
// // //         .chat-area {
// // //           flex: 1;
// // //           display: flex;
// // //           flex-direction: column;
// // //           background: white;
// // //         }

// // //         .chat-header {
// // //           display: flex;
// // //           align-items: center;
// // //           justify-content: space-between;
// // //           padding: 16px 24px;
// // //           border-bottom: 1px solid #e5e7eb;
// // //           background: white;
// // //         }

// // //         .chat-user-info {
// // //           display: flex;
// // //           align-items: center;
// // //           gap: 12px;
// // //         }

// // //         .user-avatar {
// // //           width: 48px;
// // //           height: 48px;
// // //           border-radius: 50%;
// // //           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
// // //           display: flex;
// // //           align-items: center;
// // //           justify-content: center;
// // //           color: white;
// // //           font-weight: 600;
// // //           font-size: 18px;
// // //         }

// // //         .user-details h3 {
// // //           font-size: 18px;
// // //           font-weight: 600;
// // //           color: #1f2937;
// // //           margin: 0 0 4px 0;
// // //         }

// // //         .user-status {
// // //           display: flex;
// // //           align-items: center;
// // //           gap: 6px;
// // //           font-size: 14px;
// // //           color: #10b981;
// // //           margin: 0;
// // //         }

// // //         .status-dot {
// // //           width: 8px;
// // //           height: 8px;
// // //           background: #10b981;
// // //           border-radius: 50%;
// // //           animation: pulse 2s infinite;
// // //         }

// // //         @keyframes pulse {
// // //           0% { opacity: 1; }
// // //           50% { opacity: 0.5; }
// // //           100% { opacity: 1; }
// // //         }

// // //         .chat-actions {
// // //           display: flex;
// // //           gap: 8px;
// // //         }

// // //         .icon-btn {
// // //           background: none;
// // //           border: none;
// // //           padding: 8px;
// // //           cursor: pointer;
// // //           color: #6b7280;
// // //           border-radius: 6px;
// // //           transition: all 0.2s;
// // //         }

// // //         .icon-btn:hover {
// // //           background: #f3f4f6;
// // //           color: #374151;
// // //         }

// // //         .messages-container {
// // //           flex: 1;
// // //           overflow-y: auto;
// // //           padding: 24px;
// // //           background: #f9fafb;
// // //         }

// // //         .loading-messages, .empty-messages {
// // //           display: flex;
// // //           flex-direction: column;
// // //           align-items: center;
// // //           justify-content: center;
// // //           height: 100%;
// // //           color: #6b7280;
// // //           text-align: center;
// // //         }

// // //         .loading-spinner {
// // //           width: 32px;
// // //           height: 32px;
// // //           border: 3px solid #e5e7eb;
// // //           border-top: 3px solid #6366f1;
// // //           border-radius: 50%;
// // //           animation: spin 1s linear infinite;
// // //           margin-bottom: 12px;
// // //         }

// // //         .message-date-group {
// // //           margin-bottom: 24px;
// // //         }

// // //         .date-divider {
// // //           text-align: center;
// // //           margin: 24px 0;
// // //           position: relative;
// // //         }

// // //         .date-divider span {
// // //           background: white;
// // //           padding: 8px 16px;
// // //           border-radius: 16px;
// // //           font-size: 14px;
// // //           color: #6b7280;
// // //           border: 1px solid #e5e7eb;
// // //           box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
// // //         }

// // //         .message-bubble {
// // //           margin-bottom: 16px;
// // //           animation: slideIn 0.3s ease;
// // //           max-width: 70%;
// // //         }

// // //         @keyframes slideIn {
// // //           from {
// // //             opacity: 0;
// // //             transform: translateY(10px);
// // //           }
// // //           to {
// // //             opacity: 1;
// // //             transform: translateY(0);
// // //           }
// // //         }

// // //         .message-bubble.own {
// // //           margin-left: auto;
// // //         }

// // //         .message-content {
// // //           background: white;
// // //           padding: 16px;
// // //           border-radius: 16px;
// // //           font-size: 14px;
// // //           color: #1f2937;
// // //           box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
// // //           position: relative;
// // //         }

// // //         .message-bubble.own .message-content {
// // //           background: #6366f1;
// // //           color: white;
// // //           border-bottom-right-radius: 4px;
// // //         }

// // //         .message-bubble:not(.own) .message-content {
// // //           border-bottom-left-radius: 4px;
// // //         }

// // //         .message-content p {
// // //           margin: 0 0 8px 0;
// // //           line-height: 1.4;
// // //         }

// // //         .message-time {
// // //           font-size: 12px;
// // //           opacity: 0.7;
// // //           display: block;
// // //           text-align: right;
// // //         }

// // //         .message-input-container {
// // //           display: flex;
// // //           align-items: center;
// // //           gap: 12px;
// // //           padding: 20px 24px;
// // //           border-top: 1px solid #e5e7eb;
// // //           background: white;
// // //         }

// // //         .input-actions {
// // //           display: flex;
// // //           gap: 8px;
// // //         }

// // //         .message-input {
// // //           flex: 1;
// // //           padding: 16px 20px;
// // //           border: 1px solid #e5e7eb;
// // //           border-radius: 24px;
// // //           font-size: 14px;
// // //           outline: none;
// // //           background: #f9fafb;
// // //           transition: all 0.2s;
// // //         }

// // //         .message-input:focus {
// // //           background: white;
// // //           border-color: #6366f1;
// // //           box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
// // //         }

// // //         .message-input:disabled {
// // //           opacity: 0.6;
// // //           cursor: not-allowed;
// // //         }

// // //         .send-btn {
// // //           background: #6366f1;
// // //           border: none;
// // //           padding: 12px;
// // //           border-radius: 50%;
// // //           cursor: pointer;
// // //           color: white;
// // //           display: flex;
// // //           align-items: center;
// // //           justify-content: center;
// // //           transition: background 0.2s;
// // //         }

// // //         .send-btn:hover:not(:disabled) {
// // //           background: #4f46e5;
// // //         }

// // //         .send-btn:disabled {
// // //           background: #9ca3af;
// // //           cursor: not-allowed;
// // //         }

// // //         .sending-spinner {
// // //           width: 16px;
// // //           height: 16px;
// // //           border: 2px solid transparent;
// // //           border-top: 2px solid white;
// // //           border-radius: 50%;
// // //           animation: spin 1s linear infinite;
// // //         }

// // //         .empty-chat {
// // //           display: flex;
// // //           flex-direction: column;
// // //           align-items: center;
// // //           justify-content: center;
// // //           height: 100%;
// // //           color: #9ca3af;
// // //           text-align: center;
// // //           padding: 0 24px;
// // //         }

// // //         .empty-chat .empty-icon {
// // //           margin-bottom: 16px;
// // //           opacity: 0.5;
// // //         }

// // //         .empty-chat h3 {
// // //           font-size: 20px;
// // //           font-weight: 600;
// // //           color: #6b7280;
// // //           margin: 0 0 8px 0;
// // //         }

// // //         .empty-chat p {
// // //           font-size: 14px;
// // //           margin: 0;
// // //         }

// // //         @keyframes spin {
// // //           0% { transform: rotate(0deg); }
// // //           100% { transform: rotate(360deg); }
// // //         }

// // //         /* Responsive Design */
// // //         @media (max-width: 768px) {
// // //           .sidebar {
// // //             width: 100%;
// // //             position: absolute;
// // //             z-index: 1000;
// // //             height: 100%;
// // //           }

// // //           .chat-area {
// // //             width: 100%;
// // //           }

// // //           .message-bubble.own,
// // //           .message-bubble:not(.own) {
// // //             max-width: 85%;
// // //           }

// // //           .messages-container {
// // //             padding: 16px;
// // //           }

// // //           .message-input-container {
// // //             padding: 16px;
// // //           }
// // //         }
// // //       `}</style>
// // //     </div>
// // //   );
// // // };

// // // export default AdminChat;





// // import React, { useEffect, useState, useRef } from 'react';
// // import { io } from 'socket.io-client';
// // import { Send, Search, RefreshCw } from 'lucide-react';
// // // import axiosInstance from '../utils/axiosInstance';
// // import axiosInstance from '../utils/publicAxios';


// // const AdminChat = () => {
// //   const [chats, setChats] = useState([]);
// //   const [filteredChats, setFilteredChats] = useState([]);
// //   const [selectedChat, setSelectedChat] = useState(null);
// //   const [messages, setMessages] = useState([]);
// //   const [text, setText] = useState('');
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const socketRef = useRef(null);
// //   const messagesEndRef = useRef(null);

// //   // Connect to Socket.IO
// //   useEffect(() => {
// //     const socket = io('http://localhost:5000');
// //     socketRef.current = socket;
// //     socket.on('newMessage', (msg) => {
// //       setChats((prev) =>
// //         prev.map((chat) =>
// //           chat._id === msg.chatId
// //             ? {
// //               ...chat,
// //               lastMessage: msg.text,
// //               lastMessageTime: msg.timestamp,
// //               unreadCount:
// //                 selectedChat && selectedChat._id === msg.chatId
// //                   ? 0
// //                   : (chat.unreadCount || 0) + 1,
// //             }
// //             : chat
// //         )
// //       );
// //       if (selectedChat && msg.chatId === selectedChat._id) {
// //         setMessages((prev) => [...prev, msg]);
// //       }
// //     });
// //     return () => socket.disconnect();
// //   }, [selectedChat]);

// //   // Fetch all user chats
// //   const fetchChats = async () => {
// //     try {
// //       const res = await axiosInstance.get('/chats/admin/chats');
// //       if (res.data.success) {
// //         const sorted = (res.data.data || []).sort(
// //           (a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
// //         );
// //         setChats(sorted);
// //         setFilteredChats(sorted);
// //       }
// //     } catch (err) {
// //       console.error('Error fetching chats:', err.message);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchChats();
// //   }, []);

// //   // Filter chat list
// //   useEffect(() => {
// //     if (!searchTerm.trim()) return setFilteredChats(chats);
// //     const lower = searchTerm.toLowerCase();
// //     const filtered = chats.filter(
// //       (c) =>
// //         (c.userId?.name || '').toLowerCase().includes(lower) ||
// //         (c.lastMessage || '').toLowerCase().includes(lower)
// //     );
// //     setFilteredChats(filtered);
// //   }, [searchTerm, chats]);

// //   // Fetch chat history
// //   const fetchMessages = async (chatId) => {
// //     try {
// //       const res = await axiosInstance.get(`/chats/sessions/${chatId}/messages`);
// //       if (res.data.success) {
// //         setMessages(res.data.data);
// //         scrollToBottom();
// //       }
// //     } catch (err) {
// //       console.error('Error fetching messages:', err.message);
// //     }
// //   };

// //   // Select a chat
// //   const handleSelectChat = (chat) => {
// //     setSelectedChat(chat);
// //     fetchMessages(chat._id);
// //     setChats((prev) =>
// //       prev.map((c) =>
// //         c._id === chat._id ? { ...c, unreadCount: 0 } : c
// //       )
// //     );
// //   };

// //   // Send message
// //   const handleSend = async () => {
// //     if (!text.trim() || !selectedChat) return;
// //     const msg = text.trim();
// //     setText('');
// //     const tempMsg = {
// //       _id: Date.now(),
// //       text: msg,
// //       sender: 'admin',
// //       timestamp: new Date(),
// //     };
// //     setMessages((prev) => [...prev, tempMsg]);
// //     scrollToBottom();
// //     try {
// //       const userId = selectedChat.userId?._id || selectedChat.userId;
// //       await axiosInstance.post(`/chats/${userId}/messages`, {
// //         text: msg,
// //         sender: 'admin',
// //       });
// //     } catch (err) {
// //       console.error('Error sending message:', err.message);
// //     }
// //   };

// //   // Auto-scroll to latest message
// //   const scrollToBottom = () => {
// //     setTimeout(() => {
// //       messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// //     }, 100);
// //   };

// //   return (
// //     <div className="admin-chat">
// //       {/* Sidebar */}
// //       <div className="sidebar">
// //         <div className="sidebar-header">
// //           <h3>Customer Chats</h3>
// //           <button onClick={fetchChats} className="refresh-btn">
// //             <RefreshCw size={16} />
// //           </button>
// //         </div>
// //         <div className="search-box">
// //           <Search size={16} className="search-icon" />
// //           <input
// //             type="text"
// //             placeholder="Search user or message..."
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //           />
// //         </div>
// //         <div className="chat-list">
// //           {filteredChats.length === 0 ? (
// //             <p className="empty">No chats found</p>
// //           ) : (
// //             filteredChats.map((c) => (
// //               <div
// //                 key={c._id}
// //                 className={`chat-item ${selectedChat?._id === c._id ? 'active' : ''}`}
// //                 onClick={() => handleSelectChat(c)}
// //               >
// //                 <div className="chat-avatar">
// //                   <img
// //                     src={c.userId?.avatar || 'https://via.placeholder.com/40'}
// //                     alt="User Avatar"
// //                     style={{ width: '100%', height: '100%', borderRadius: '50%' }}
// //                   />
// //                 </div>
// //                 <div className="chat-info">
// //                   <div className="chat-name">{c.userId?.name || 'Unknown User'}</div>
// //                   <div className="chat-preview">
// //                     <span>{c.lastMessage || 'No messages yet'}</span>
// //                     {c.unreadCount > 0 && <span className="badge">{c.unreadCount}</span>}
// //                   </div>
// //                 </div>
// //               </div>
// //             ))
// //           )}
// //         </div>
// //       </div>

// //       {/* Chat Area */}
// //       <div className="chat-area">
// //         {selectedChat ? (
// //           <>
// //             <div className="chat-header">
// //               <div className="chat-avatar">
// //                 <img
// //                   src={selectedChat.userId?.avatar || 'https://via.placeholder.com/32'}
// //                   alt="User Avatar"
// //                   style={{ width: '32px', height: '32px', borderRadius: '50%' }}
// //                 />
// //               </div>
// //               <h4 style={{ marginLeft: '12px' }}>{selectedChat.userId?.name || 'Customer'}</h4>
// //             </div>
// //             <div className="chat-body">
// //               {messages.length === 0 ? (
// //                 <p className="empty">No messages yet</p>
// //               ) : (
// //                 messages.map((m) => (
// //                   <div key={m._id} className={`msg ${m.sender === 'admin' ? 'admin' : 'user'}`}>
// //                     <div className="bubble">
// //                       <p>{m.text}</p>
// //                       <span>{new Date(m.timestamp).toLocaleTimeString()}</span>
// //                     </div>
// //                   </div>
// //                 ))
// //               )}
// //               <div ref={messagesEndRef} />
// //             </div>
// //             <div className="chat-input">
// //               <input
// //                 value={text}
// //                 onChange={(e) => setText(e.target.value)}
// //                 placeholder="Type message..."
// //                 onKeyDown={(e) => e.key === 'Enter' && handleSend()}
// //               />
// //               <button onClick={handleSend}>
// //                 <Send size={18} />
// //               </button>
// //             </div>
// //           </>
// //         ) : (
// //           <div className="empty-state">
// //             <p>Select a chat to start messaging</p>
// //           </div>
// //         )}
// //       </div>

// //       {/* Inline CSS */}
// //       <style>{`
// //         .admin-chat {
// //           display: flex;
// //           height: 100vh;
// //           font-family: Arial, sans-serif;
// //         }
// //         /* Sidebar */
// //         .sidebar {
// //           width: 300px;
// //           background: white;
// //           border-right: 1px solid #e0e0e0;
// //           display: flex;
// //           flex-direction: column;
// //         }
// //         .sidebar-header {
// //           padding: 16px;
// //           border-bottom: 1px solid #e0e0e0;
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: center;
// //         }
// //         .sidebar-header h3 {
// //           margin: 0;
// //           font-size: 16px;
// //           color: #333;
// //         }
// //         .search-box {
// //           position: relative;
// //           padding: 8px 16px;
// //           border-bottom: 1px solid #e0e0e0;
// //         }
// //         .search-box input {
// //           width: 100%;
// //           padding: 8px 12px 8px 30px;
// //           border: 1px solid #e0e0e0;
// //           border-radius: 15px;
// //           font-size: 14px;
// //         }
// //         .search-icon {
// //           position: absolute;
// //           left: 25px;
// //           top: 50%;
// //           transform: translateY(-50%);
// //           color: #999;
// //         }
// //         .chat-list {
// //           flex: 1;
// //           overflow-y: auto;
// //         }
// //         .chat-item {
// //           display: flex;
// //           align-items: center;
// //           padding: 10px 16px;
// //           border-bottom: 1px solid #f0f0f0;
// //           cursor: pointer;
// //           transition: background 0.2s;
// //         }
// //         .chat-item:hover {
// //           background: #f9f9f9;
// //         }
// //         .chat-item.active {
// //           background: #e3f2fd;
// //         }
// //         .chat-avatar {
// //           width: 40px;
// //           height: 40px;
// //           border-radius: 50%;
// //           margin-right: 12px;
// //         }
// //         .chat-info {
// //           flex: 1;
// //         }
// //         .chat-name {
// //           font-weight: 600;
// //           font-size: 14px;
// //           color: #333;
// //         }
// //         .chat-preview {
// //           font-size: 12px;
// //           color: #666;
// //           margin-top: 2px;
// //           display: flex;
// //           align-items: center;
// //         }
// //         .badge {
// //           background: #6200ee;
// //           color: white;
// //           border-radius: 10px;
// //           padding: 2px 6px;
// //           font-size: 10px;
// //           margin-left: 8px;
// //         }
// //         /* Chat Area */
// //         .chat-area {
// //           flex: 1;
// //           display: flex;
// //           flex-direction: column;
// //           background: #f5f5f5;
// //         }
// //         .chat-header {
// //           padding: 16px;
// //           background: white;
// //           border-bottom: 1px solid #e0e0e0;
// //           display: flex;
// //           align-items: center;
// //         }
// //         .chat-header h4 {
// //           margin: 0;
// //           font-size: 16px;
// //           color: #333;
// //         }
// //         .chat-body {
// //           flex: 1;
// //           overflow-y: auto;
// //           padding: 16px;
// //           background: #f9f9f9;
// //         }
// //         .msg {
// //           display: flex;
// //           margin-bottom: 12px;
// //         }
// //         .msg.user {
// //           justify-content: flex-start;
// //         }
// //         .msg.admin {
// //           justify-content: flex-end;
// //         }
// //         .bubble {
// //           max-width: 70%;
// //           padding: 10px 14px;
// //           border-radius: 10px;
// //           font-size: 14px;
// //           line-height: 1.4;
// //         }
// //         .msg.user .bubble {
// //           background: white;
// //           border: 1px solid #e0e0e0;
// //         }
// //         .msg.admin .bubble {
// //           background: #f7f0ff;
// //           color: #fff;
// //           border: 1px solid #e3cfff;
// //         }
// //         .bubble p{}
// //         .bubble span {
// //           display: block;
// //           color:#090015;
// //           font-size: 10px;
// //           text-align: right;
// //           margin-top: 4px;
// //           opacity: 0.7;
// //         }
// //         .chat-input {
// //           display: flex;
// //           padding: 12px 16px;
// //           background: white;
// //           border-top: 1px solid #e0e0e0;
// //         }
// //         .chat-input input {
// //           flex: 1;
// //           padding: 10px 14px;
// //           border: 1px solid #e0e0e0;
// //           border-radius: 20px;
// //           font-size: 14px;
// //         }
// //         .chat-input button {
// //           background: #6200ee;
// //           border: none;
// //           border-radius: 50%;
// //           width: 40px;
// //           height: 40px;
// //           margin-left: 8px;
// //           color: white;
// //           cursor: pointer;
// //         }
// //         .empty-state {
// //           flex: 1;
// //           display: flex;
// //           justify-content: center;
// //           align-items: center;
// //           color: #999;
// //         }
// //         .empty {
// //           text-align: center;
// //           color: #999;
// //           margin-top: 30px;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default AdminChat;



// import React, { useEffect, useState, useRef } from 'react';
// import { io } from 'socket.io-client';
// import { Send, Search, RefreshCw } from 'lucide-react';
// import axiosInstance from '../utils/publicAxios';

// const AdminChat = () => {
//   const [chats, setChats] = useState([]);
//   const [filteredChats, setFilteredChats] = useState([]);
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const socketRef = useRef(null);
//   const messagesEndRef = useRef(null);

//   // Connect to Socket.IO
//   useEffect(() => {
//     const socket = io('http://localhost:5000');
//     socketRef.current = socket;

//     socket.on('newMessage', (msg) => {
//       setChats((prev) =>
//         prev.map((chat) =>
//           chat._id === msg.chatId
//             ? {
//                 ...chat,
//                 lastMessage: msg.text,
//                 lastMessageTime: msg.timestamp,
//                 unreadCount:
//                   selectedChat && selectedChat._id === msg.chatId
//                     ? 0
//                     : (chat.unreadCount || 0) + 1,
//               }
//             : chat
//         )
//       );
//       if (selectedChat && msg.chatId === selectedChat._id) {
//         setMessages((prev) => [...prev, msg]);
//       }
//     });

//     return () => socket.disconnect();
//   }, [selectedChat]);

//   // Fetch all chats
//   const fetchChats = async () => {
//     try {
//       const res = await axiosInstance.get('/chats/admin/chats');
//       if (res.data.success) {
//         const sorted = (res.data.data || []).sort(
//           (a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
//         );
//         setChats(sorted);
//         setFilteredChats(sorted);
//       }
//     } catch (err) {
//       console.error('Error fetching chats:', err.message);
//     }
//   };

//   useEffect(() => {
//     fetchChats();
//   }, []);

//   // Filter search
//   useEffect(() => {
//     if (!searchTerm.trim()) return setFilteredChats(chats);
//     const lower = searchTerm.toLowerCase();
//     const filtered = chats.filter(
//       (c) =>
//         (c.userId?.name || '').toLowerCase().includes(lower) ||
//         (c.lastMessage || '').toLowerCase().includes(lower)
//     );
//     setFilteredChats(filtered);
//   }, [searchTerm, chats]);

//   // Fetch messages
//   const fetchMessages = async (chatId) => {
//     try {
//       const res = await axiosInstance.get(`/chats/sessions/${chatId}/messages`);
//       if (res.data.success) {
//         setMessages(res.data.data);
//         scrollToBottom();
//       }
//     } catch (err) {
//       console.error('Error fetching messages:', err.message);
//     }
//   };

//   const handleSelectChat = (chat) => {
//     setSelectedChat(chat);
//     fetchMessages(chat._id);
//     setChats((prev) =>
//       prev.map((c) => (c._id === chat._id ? { ...c, unreadCount: 0 } : c))
//     );
//   };

//   const handleSend = async () => {
//     if (!text.trim() || !selectedChat) return;
//     const msg = text.trim();
//     setText('');
//     const tempMsg = {
//       _id: Date.now(),
//       text: msg,
//       sender: 'admin',
//       timestamp: new Date(),
//     };
//     setMessages((prev) => [...prev, tempMsg]);
//     scrollToBottom();
//     try {
//       const userId = selectedChat.userId?._id || selectedChat.userId;
//       await axiosInstance.post(`/chats/${userId}/messages`, {
//         text: msg,
//         sender: 'admin',
//       });
//     } catch (err) {
//       console.error('Error sending message:', err.message);
//     }
//   };

//   const scrollToBottom = () => {
//     setTimeout(() => {
//       messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }, 100);
//   };

//   return (
//     <div className="admin-chat">
//       {/* Sidebar */}
//       <div className="sidebar">
//         <div className="sidebar-header">
//           <h3>Customer Chats</h3>
//           <button onClick={fetchChats} className="refresh-btn">
//             <RefreshCw size={16} />
//           </button>
//         </div>
//         <div className="search-box">
//           <Search size={16} className="search-icon" />
//           <input
//             type="text"
//             placeholder="Search user or message..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <div className="chat-list">
//           {filteredChats.length === 0 ? (
//             <p className="empty">No chats found</p>
//           ) : (
//             filteredChats.map((c) => (
//               <div
//                 key={c._id}
//                 className={`chat-item ${selectedChat?._id === c._id ? 'active' : ''}`}
//                 onClick={() => handleSelectChat(c)}
//               >
//                 <div className="chat-avatar">
//                   {c.userId?.avatar ? (
//                     <img
//                       src={c.userId.avatar}
//                       alt="User Avatar"
//                       style={{
//                         width: '100%',
//                         height: '100%',
//                         borderRadius: '50%',
//                       }}
//                     />
//                   ) : (
//                     <div className="avatar-placeholder">
//                       {(c.userId?.name?.[0] || 'U').toUpperCase()}
//                     </div>
//                   )}
//                 </div>
//                 <div className="chat-info">
//                   <div className="chat-name">{c.userId?.name || 'Unknown User'}</div>
//                   <div className="chat-preview">
//                     <span>{c.lastMessage || 'No messages yet'}</span>
//                     {c.unreadCount > 0 && (
//                       <span className="badge">{c.unreadCount}</span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* Chat Area */}
//       <div className="chat-area">
//         {selectedChat ? (
//           <>
//             <div className="chat-header">
//               <div className="chat-avatar">
//                 {selectedChat.userId?.avatar ? (
//                   <img
//                     src={selectedChat.userId.avatar}
//                     alt="User Avatar"
//                     style={{ width: '32px', height: '32px', borderRadius: '50%' }}
//                   />
//                 ) : (
//                   <div className="avatar-placeholder-small">
//                     {(selectedChat.userId?.name?.[0] || 'C').toUpperCase()}
//                   </div>
//                 )}
//               </div>
//               <h4 style={{ marginLeft: '12px' }}>
//                 {selectedChat.userId?.name || 'Customer'}
//               </h4>
//             </div>

//             <div className="chat-body">
//               {messages.length === 0 ? (
//                 <p className="empty">No messages yet</p>
//               ) : (
//                 messages.map((m) => (
//                   <div
//                     key={m._id}
//                     className={`msg ${m.sender === 'admin' ? 'admin' : 'user'}`}
//                   >
//                     <div className="bubble">
//                       <p>{m.text}</p>
//                       <span>{new Date(m.timestamp).toLocaleTimeString()}</span>
//                     </div>
//                   </div>
//                 ))
//               )}
//               <div ref={messagesEndRef} />
//             </div>

//             <div className="chat-input">
//               <input
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//                 placeholder="Type message..."
//                 onKeyDown={(e) => e.key === 'Enter' && handleSend()}
//               />
//               <button onClick={handleSend}>
//                 <Send size={18} />
//               </button>
//             </div>
//           </>
//         ) : (
//           <div className="empty-state">
//             <p>Select a chat to start messaging</p>
//           </div>
//         )}
//       </div>

//       {/* CSS */}
//       <style>{`
//         .admin-chat { display: flex; height: 100vh; font-family: Arial, sans-serif; }

//         .sidebar { width: 300px; background: white; border-right: 1px solid #e0e0e0; display: flex; flex-direction: column; }
//         .sidebar-header { padding: 16px; border-bottom: 1px solid #e0e0e0; display: flex; justify-content: space-between; align-items: center; }
//         .sidebar-header h3 { margin: 0; font-size: 16px; color: #333; }

//         .search-box { position: relative; padding: 8px 16px; border-bottom: 1px solid #e0e0e0; }
//         .search-box input { width: 100%; padding: 8px 12px 8px 30px; border: 1px solid #e0e0e0; border-radius: 15px; font-size: 14px; }
//         .search-icon { position: absolute; left: 25px; top: 50%; transform: translateY(-50%); color: #999; }

//         .chat-list { flex: 1; overflow-y: auto; }
//         .chat-item { display: flex; align-items: center; padding: 10px 16px; border-bottom: 1px solid #f0f0f0; cursor: pointer; transition: background 0.2s; }
//         .chat-item:hover { background: #f9f9f9; }
//         .chat-item.active { background: #e3f2fd; }

//         .chat-avatar { width: 40px; height: 40px; border-radius: 50%; margin-right: 12px; overflow: hidden; }
//         .avatar-placeholder, .avatar-placeholder-small {
//           display: flex; align-items: center; justify-content: center;
//           background: linear-gradient(135deg, #6200ee, #9c27b0);
//           color: white; font-weight: bold; border-radius: 50%;
//         }
//         .avatar-placeholder { width: 40px; height: 40px; font-size: 16px; }
//         .avatar-placeholder-small { width: 32px; height: 32px; font-size: 14px; }

//         .chat-info { flex: 1; }
//         .chat-name { font-weight: 600; font-size: 14px; color: #333; }
//         .chat-preview { font-size: 12px; color: #666; margin-top: 2px; display: flex; align-items: center; }
//         .badge { background: #6200ee; color: white; border-radius: 10px; padding: 2px 6px; font-size: 10px; margin-left: 8px; }

//         .chat-area { flex: 1; display: flex; flex-direction: column; background: #f5f5f5; }
//         .chat-header { padding: 16px; background: white; border-bottom: 1px solid #e0e0e0; display: flex; align-items: center; }

//         .chat-body { flex: 1; overflow-y: auto; padding: 16px; background: #f9f9f9; }
//         .msg { display: flex; margin-bottom: 12px; }
//         .msg.user { justify-content: flex-start; }
//         .msg.admin { justify-content: flex-end; }

//         .bubble {
//           max-width: 70%; padding: 10px 14px; border-radius: 12px; position: relative;
//           font-size: 14px; line-height: 1.5; word-wrap: break-word;
//         }
//         .msg.user .bubble {
//           background: #fff; border: 1px solid #e0e0e0; border-top-left-radius: 0;
//         }
//         .msg.admin .bubble {
//           background: #6200ee; color: #fff; border-top-right-radius: 0;
//         }
//         .msg.user .bubble::after {
//           content: ''; position: absolute; left: -6px; top: 10px;
//           border: 6px solid transparent; border-right-color: #e0e0e0;
//         }
//         .msg.admin .bubble::after {
//           content: ''; position: absolute; right: -6px; top: 10px;
//           border: 6px solid transparent; border-left-color: #6200ee;
//         }
//         .bubble span { display: block; font-size: 10px; text-align: right; opacity: 0.8; margin-top: 4px; }

//         .chat-input { display: flex; padding: 12px 16px; background: white; border-top: 1px solid #e0e0e0; }
//         .chat-input input { flex: 1; padding: 10px 14px; border: 1px solid #e0e0e0; border-radius: 20px; font-size: 14px; }
//         .chat-input button { background: #6200ee; border: none; border-radius: 50%; width: 40px; height: 40px; margin-left: 8px; color: white; cursor: pointer; }

//         .empty-state, .empty { text-align: center; color: #999; margin-top: 30px; }
//       `}</style>
//     </div>
//   );
// };

// export default AdminChat;







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
    const socket = io('http://localhost:5000');
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