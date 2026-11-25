// routes/whatsappRoutes.js
const express = require('express');
const router = express.Router();
const whatsappController = require('../controllers/whatsappController');

// Meta Webhook Verification (GET) & Event Receiver (POST)
router.get('/webhook', whatsappController.verifyWebhook);
router.post('/webhook', whatsappController.handleWebhookEvent);

// Admin / Manual WhatsApp actions
router.post('/send', whatsappController.sendCustomMessage);
router.get('/messages/:orderId', whatsappController.getOrderMessages);
router.get('/stats', whatsappController.getStats);
router.post('/test', whatsappController.testNotification);

module.exports = router;
