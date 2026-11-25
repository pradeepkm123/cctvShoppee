// controllers/whatsappController.js
const crypto = require('crypto');
const WhatsAppMessage = require('../models/WhatsAppMessage');
const Order = require('../models/Order');
const whatsappService = require('../services/whatsappService');

/**
 * GET /api/whatsapp/webhook
 * Meta Webhook Verification
 * Reads hub.mode, hub.verify_token and hub.challenge
 * Returns challenge as plain text with HTTP 200 on success, or HTTP 403 on mismatch.
 */
exports.verifyWebhook = (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  const expectedToken = (process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || 'cctvshoppee_webhook_secret_2026').trim();

  if (mode === 'subscribe' && token === expectedToken && challenge) {
    console.log('✅ [WhatsApp Webhook] Verification successful! Returning challenge.');
    return res.status(200).type('text/plain').send(String(challenge));
  }

  console.warn(`⚠️ [WhatsApp Webhook] Verification failed! mode="${mode}", tokenMatch=${token === expectedToken}`);
  return res.sendStatus(403);
};

/**
 * POST /api/whatsapp/webhook
 * Meta Event & Message Receiver with optional HMAC-SHA256 signature verification
 */
exports.handleWebhookEvent = async (req, res) => {
  try {
    // Validate Meta App Secret signature if configured
    const appSecret = process.env.WHATSAPP_APP_SECRET;
    const signature = req.headers['x-hub-signature-256'];

    if (appSecret && signature && req.rawBody) {
      const expectedSignature =
        'sha256=' +
        crypto.createHmac('sha256', appSecret).update(req.rawBody).digest('hex');

      if (signature !== expectedSignature) {
        console.warn('⚠️ [WhatsApp Webhook] Signature verification failed!');
        return res.status(401).send('Invalid signature');
      }
    }

    const body = req.body;

    // Check if this is an event from a WhatsApp API subscription
    if (body.object === 'whatsapp_business_account' || body.entry) {
      for (const entry of body.entry || []) {
        for (const change of entry.changes || []) {
          const value = change.value;

          // 1. Handle Message Status Updates (sent, delivered, read, failed)
          if (value?.statuses && value.statuses.length > 0) {
            for (const statusObj of value.statuses) {
              const metaId = statusObj.id;
              const newStatus = statusObj.status; // 'sent', 'delivered', 'read', 'failed'

              if (metaId) {
                await WhatsAppMessage.findOneAndUpdate(
                  { metaMessageId: metaId },
                  {
                    status: newStatus,
                    ...(statusObj.errors ? { error: JSON.stringify(statusObj.errors) } : {}),
                  }
                );
                console.log(`📱 [WhatsApp Status] ${metaId} -> ${newStatus}`);
              }
            }
          }

          // 2. Handle Incoming Customer Messages (Replies, Inquiries)
          if (value?.messages && value.messages.length > 0) {
            for (const message of value.messages) {
              const fromPhone = message.from;
              let incomingText = '';

              if (message.type === 'text') {
                incomingText = message.text?.body || '';
              } else if (message.type === 'button') {
                incomingText = message.button?.text || '';
              } else if (message.type === 'interactive') {
                incomingText =
                  message.interactive?.button_reply?.title ||
                  message.interactive?.list_reply?.title ||
                  '';
              }

              console.log(`📩 [WhatsApp Incoming] From: +${fromPhone} | Message: "${incomingText}"`);

              // Trigger chatbot response
              await whatsappService.handleIncomingCustomerWhatsApp(fromPhone, incomingText);
            }
          }
        }
      }

      // Meta requires a 200 OK within 20 seconds
      return res.status(200).send('EVENT_RECEIVED');
    }

    return res.sendStatus(404);
  } catch (error) {
    console.error('Error handling WhatsApp webhook:', error);
    return res.status(500).json({ error: error.message });
  }
};

/**
 * POST /api/whatsapp/send
 * Admin manual message sending
 */
exports.sendCustomMessage = async (req, res) => {
  try {
    const { phone, message, orderId, recipientName } = req.body;
    if (!phone || !message) {
      return res.status(400).json({ message: 'Phone number and message text are required' });
    }

    const result = await whatsappService.sendWhatsAppMessage({
      to: phone,
      recipientName: recipientName || 'Customer',
      eventType: 'CUSTOM_ALERT',
      orderId: orderId || null,
      textMessage: message,
    });

    res.status(200).json({
      success: true,
      message: 'WhatsApp message processed',
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * GET /api/whatsapp/messages/:orderId
 * Get history of messages for an order
 */
exports.getOrderMessages = async (req, res) => {
  try {
    const { orderId } = req.params;
    const messages = await WhatsAppMessage.find({ orderId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: messages.length, messages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * GET /api/whatsapp/stats
 * Overview stats for admin dashboard
 */
exports.getStats = async (req, res) => {
  try {
    const total = await WhatsAppMessage.countDocuments();
    const sent = await WhatsAppMessage.countDocuments({ status: { $in: ['sent', 'delivered', 'read', 'mock_sent'] } });
    const delivered = await WhatsAppMessage.countDocuments({ status: { $in: ['delivered', 'read'] } });
    const read = await WhatsAppMessage.countDocuments({ status: 'read' });
    const failed = await WhatsAppMessage.countDocuments({ status: 'failed' });

    const recent = await WhatsAppMessage.find().sort({ createdAt: -1 }).limit(10);

    res.status(200).json({
      success: true,
      stats: { total, sent, delivered, read, failed },
      recent,
      isLiveConfigured: Boolean(process.env.WHATSAPP_ACCESS_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * POST /api/whatsapp/test
 * Quick test endpoint for admin
 */
exports.testNotification = async (req, res) => {
  try {
    const { phone, orderId, eventType = 'ORDER_PLACED' } = req.body;
    if (!phone) {
      return res.status(400).json({ message: 'Phone number is required' });
    }

    let order = null;
    if (orderId) {
      order = await Order.findById(orderId);
    }

    if (!order) {
      // Mock order for testing
      order = {
        _id: 'TEST' + Math.floor(1000 + Math.random() * 9000),
        items: [{ name: '4MP CCTV Outdoor Dome Camera', quantity: 2, price: 2499 }],
        totalAmount: 4998,
        paymentMethod: 'UPI',
        paymentStatus: 'Paid',
        shippingAddress: {
          firstName: 'Pradeep',
          lastName: 'Kumar',
          phone,
          street: '173, New Military Road, Kannigapuram',
          city: 'Avadi',
          state: 'Tamil Nadu',
          postcode: '600054',
        },
      };
    }

    let result;
    switch (eventType) {
      case 'ORDER_CONFIRMED':
        result = await whatsappService.notifyOrderConfirmed(order);
        break;
      case 'ORDER_PACKED':
        result = await whatsappService.notifyOrderPacked(order);
        break;
      case 'ORDER_SHIPPED':
        result = await whatsappService.notifyOrderShipped(order);
        break;
      case 'OUT_FOR_DELIVERY':
        result = await whatsappService.notifyOrderOutForDelivery(order);
        break;
      case 'ORDER_DELIVERED':
        result = await whatsappService.notifyOrderDelivered(order);
        break;
      case 'ORDER_CANCELLED':
        result = await whatsappService.notifyOrderCancelled(order, 'Customer requested cancellation');
        break;
      default:
        result = await whatsappService.notifyOrderPlaced(order);
    }

    res.status(200).json({
      success: true,
      message: `Test ${eventType} notification processed!`,
      result,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
