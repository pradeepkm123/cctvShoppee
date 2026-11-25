const mongoose = require('mongoose');

const whatsAppMessageSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      index: true,
      required: false,
    },
    recipientPhone: {
      type: String,
      required: true,
      index: true,
    },
    recipientName: {
      type: String,
      default: 'Customer',
    },
    eventType: {
      type: String,
      enum: [
        'ORDER_PLACED',
        'ORDER_CONFIRMED',
        'ORDER_PACKED',
        'ORDER_SHIPPED',
        'OUT_FOR_DELIVERY',
        'ORDER_DELIVERED',
        'ORDER_CANCELLED',
        'RETURN_REQUESTED',
        'PAYMENT_SUCCESS',
        'CUSTOMER_INQUIRY',
        'BOT_REPLY',
        'CUSTOM_ALERT',
      ],
      required: true,
    },
    direction: {
      type: String,
      enum: ['outbound', 'inbound'],
      default: 'outbound',
    },
    messageType: {
      type: String,
      enum: ['template', 'text', 'interactive'],
      default: 'text',
    },
    templateName: {
      type: String,
      default: null,
    },
    messageBody: {
      type: String,
      required: true,
    },
    metaMessageId: {
      type: String,
      default: null,
      index: true,
    },
    status: {
      type: String,
      enum: ['queued', 'sent', 'delivered', 'read', 'failed', 'mock_sent'],
      default: 'queued',
      index: true,
    },
    error: {
      type: String,
      default: null,
    },
    rawPayload: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('WhatsAppMessage', whatsAppMessageSchema);
