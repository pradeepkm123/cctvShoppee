// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/auth');
// const chatCtrl = require('../controllers/chatController');

// router.post('/:userId/messages',chatCtrl.sendMessage);
// router.get('/sessions/:chatId/messages',chatCtrl.getChatMessages);
// router.get('/admin/chats',chatCtrl.getAllChatsForAdmin);
// router.get('/find/:userId', chatCtrl.findOrCreateChat);


// module.exports = router;


const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const chatCtrl = require('../controllers/chatController');

// Message routes
router.post('/:userId/messages', chatCtrl.sendMessage);
router.delete('/messages/:messageId', chatCtrl.deleteMessage);

// Chat routes
router.get('/sessions/:chatId/messages', chatCtrl.getChatMessages);
router.get('/admin/chats', chatCtrl.getAllChatsForAdmin);
router.get('/find/:userId', chatCtrl.findOrCreateChat);
router.delete('/:chatId', chatCtrl.deleteChat);
router.get('/user/:userId/history', chatCtrl.getUserChatHistory);

module.exports = router;