// services/whatsappService.js
const https = require('https');
const mongoose = require('mongoose');
const WhatsAppMessage = require('../models/WhatsAppMessage');
const Order = require('../models/Order');

/**
 * Clean & normalize phone numbers to international E.164 format (without +)
 * e.g., "7418667333" -> "917418667333", "+91 74186-67333" -> "917418667333"
 */
function normalizePhoneNumber(phone) {
  if (!phone) return null;
  let cleaned = String(phone).replace(/\D/g, '');
  if (!cleaned) return null;

  // If 10-digit Indian number, prepend country code 91
  if (cleaned.length === 10) {
    cleaned = '91' + cleaned;
  }
  // If starts with 0 and is 11 digits (e.g. 07418667333)
  if (cleaned.length === 11 && cleaned.startsWith('0')) {
    cleaned = '91' + cleaned.substring(1);
  }
  return cleaned;
}

/**
 * Make an HTTP request to Meta WhatsApp Cloud API
 */
function callMetaWhatsAppAPI(payload) {
  return new Promise((resolve, reject) => {
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;

    if (!phoneNumberId || !accessToken) {
      return reject(new Error('Meta WhatsApp credentials not configured'));
    }

    const data = JSON.stringify(payload);
    const options = {
      hostname: 'graph.facebook.com',
      port: 443,
      path: `/v21.0/${phoneNumberId}/messages`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'Content-Length': Buffer.byteLength(data),
      },
      timeout: 12000,
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            const errorMsg = parsed?.error?.message || `HTTP ${res.statusCode}: ${body}`;
            reject(new Error(errorMsg));
          }
        } catch (err) {
          reject(new Error(`Failed to parse Meta response: ${body}`));
        }
      });
    });

    req.on('error', (err) => reject(err));
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Meta WhatsApp API connection timed out'));
    });

    req.write(data);
    req.end();
  });
}

/**
 * Send WhatsApp message (Text or Template) with database logging
 */
async function sendWhatsAppMessage({
  to,
  recipientName = 'Customer',
  eventType,
  orderId = null,
  textMessage,
  templateName = null,
  templateComponents = null,
}) {
  const normalizedPhone = normalizePhoneNumber(to);
  if (!normalizedPhone) {
    console.warn(`[WhatsApp] Invalid phone number provided: ${to}`);
    return null;
  }

  // Build Meta payload
  let payload;
  let messageBody = textMessage;

  if (templateName) {
    payload = {
      messaging_product: 'whatsapp',
      to: normalizedPhone,
      type: 'template',
      template: {
        name: templateName,
        language: { code: 'en' },
        components: templateComponents || [],
      },
    };
    messageBody = `[Template: ${templateName}] ${textMessage || ''}`;
  } else {
    payload = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: normalizedPhone,
      type: 'text',
      text: {
        preview_url: true,
        body: textMessage,
      },
    };
  }

  const isConfigured = Boolean(
    process.env.WHATSAPP_PHONE_NUMBER_ID && process.env.WHATSAPP_ACCESS_TOKEN
  );

  let messageDoc = new WhatsAppMessage({
    orderId,
    recipientPhone: normalizedPhone,
    recipientName,
    eventType,
    direction: 'outbound',
    messageType: templateName ? 'template' : 'text',
    templateName,
    messageBody,
    status: isConfigured ? 'queued' : 'mock_sent',
  });

  if (!isConfigured) {
    console.log(`\n========================================================`);
    console.log(`📱 [WhatsApp SIMULATION] To: +${normalizedPhone} (${recipientName})`);
    console.log(`📌 Event: ${eventType} | Order: #${orderId || 'N/A'}`);
    console.log(`💬 Message:\n${textMessage}`);
    console.log(`ℹ️ [Notice] Set WHATSAPP_PHONE_NUMBER_ID and WHATSAPP_ACCESS_TOKEN in .env to deliver via Meta Cloud API.`);
    console.log(`========================================================\n`);

    if (mongoose.connection && mongoose.connection.readyState === 1) {
      await messageDoc.save().catch((e) => console.error('[WhatsApp DB Error]:', e.message));
    }
    return messageDoc;
  }

  try {
    const metaResponse = await callMetaWhatsAppAPI(payload);
    messageDoc.status = 'sent';
    messageDoc.metaMessageId = metaResponse?.messages?.[0]?.id || null;
    messageDoc.rawPayload = metaResponse;
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      await messageDoc.save().catch((e) => console.error('[WhatsApp DB Error]:', e.message));
    }

    console.log(`✅ [WhatsApp Sent] To: +${normalizedPhone} | Meta ID: ${messageDoc.metaMessageId}`);
    return messageDoc;
  } catch (err) {
    console.error(`❌ [WhatsApp Failed] To: +${normalizedPhone}:`, err.message);
    messageDoc.status = 'failed';
    messageDoc.error = err.message;
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      await messageDoc.save().catch((e) => console.error('[WhatsApp DB Error]:', e.message));
    }
    return messageDoc;
  }
}

// -------------------------------------------------------------
// FLIPKART-STYLE ORDER LIFECYCLE NOTIFICATIONS
// -------------------------------------------------------------

function formatItems(items = []) {
  if (!items || items.length === 0) return 'CCTV Security Equipment';
  return items
    .slice(0, 3)
    .map((item) => `${item.name || item.productId?.name || 'Item'} (x${item.quantity})`)
    .join(', ') + (items.length > 3 ? ` +${items.length - 3} more` : '');
}

function getClientUrl() {
  return process.env.CLIENT_URL || 'https://cctvshoppee.com';
}

/**
 * 1. Order Placed Notification
 */
async function notifyOrderPlaced(order) {
  if (!order || !order.shippingAddress) return;
  const phone = order.shippingAddress.phone || order.contactNumber;
  const name = `${order.shippingAddress.firstName || ''} ${order.shippingAddress.lastName || ''}`.trim() || 'Customer';
  const shortId = String(order._id).slice(-6).toUpperCase();
  const items = formatItems(order.items);
  const trackingUrl = `${getClientUrl()}/order-details/${order._id}`;

  const message = `🛍️ *Order Placed Successfully!* 🎉

Hi ${name},
Thank you for shopping with *CCTV SHOPPEE*! We have received your order.

📦 *Order ID:* #${shortId}
🛒 *Items:* ${items}
💰 *Total Amount:* ₹${order.totalAmount?.toLocaleString('en-IN') || 0}
💳 *Payment:* ${order.paymentMethod || 'COD'} (${order.paymentStatus || 'Pending'})

📍 *Delivery Address:*
${order.shippingAddress.street ? order.shippingAddress.street + ', ' : ''}${order.shippingAddress.city || ''}, ${order.shippingAddress.state || ''} - ${order.shippingAddress.postcode || ''}

We are processing your order and will message you once it is confirmed and packed.

🔗 *Track your order:*
${trackingUrl}

📞 Need help? Call us at +91 7418667333`;

  return sendWhatsAppMessage({
    to: phone,
    recipientName: name,
    eventType: 'ORDER_PLACED',
    orderId: order._id,
    textMessage: message,
  });
}

/**
 * 2. Order Confirmed Notification
 */
async function notifyOrderConfirmed(order) {
  if (!order || !order.shippingAddress) return;
  const phone = order.shippingAddress.phone || order.contactNumber;
  const name = `${order.shippingAddress.firstName || ''} ${order.shippingAddress.lastName || ''}`.trim() || 'Customer';
  const shortId = String(order._id).slice(-6).toUpperCase();
  const items = formatItems(order.items);
  const trackingUrl = `${getClientUrl()}/order-details/${order._id}`;

  const message = `✅ *Order Confirmed!* 🎉

Hi ${name},
Great news! Your order *#${shortId}* has been confirmed by our team.

🛒 *Products:* ${items}
💰 *Amount:* ₹${order.totalAmount?.toLocaleString('en-IN') || 0}
💳 *Payment Status:* ${order.paymentStatus || 'Confirmed'}

Our warehouse team is now carefully packing your security equipment.

🔗 *View Order Details:*
${trackingUrl}

Thank you for choosing *CCTV SHOPPEE*!`;

  return sendWhatsAppMessage({
    to: phone,
    recipientName: name,
    eventType: 'ORDER_CONFIRMED',
    orderId: order._id,
    textMessage: message,
  });
}

/**
 * 3. Order Packed Notification
 */
async function notifyOrderPacked(order) {
  if (!order || !order.shippingAddress) return;
  const phone = order.shippingAddress.phone || order.contactNumber;
  const name = `${order.shippingAddress.firstName || ''} ${order.shippingAddress.lastName || ''}`.trim() || 'Customer';
  const shortId = String(order._id).slice(-6).toUpperCase();
  const trackingUrl = `${getClientUrl()}/order-details/${order._id}`;

  const message = `📦 *Your Order is Packed!* 🎁

Hi ${name},
Your order *#${shortId}* is securely packed and waiting for courier dispatch.

You will receive another message with the courier tracking number as soon as the package is handed over to our delivery partner.

🔗 *Track status:* ${trackingUrl}`;

  return sendWhatsAppMessage({
    to: phone,
    recipientName: name,
    eventType: 'ORDER_PACKED',
    orderId: order._id,
    textMessage: message,
  });
}

/**
 * 4. Order Shipped Notification
 */
async function notifyOrderShipped(order) {
  if (!order || !order.shippingAddress) return;
  const phone = order.shippingAddress.phone || order.contactNumber;
  const name = `${order.shippingAddress.firstName || ''} ${order.shippingAddress.lastName || ''}`.trim() || 'Customer';
  const shortId = String(order._id).slice(-6).toUpperCase();
  const trackingUrl = `${getClientUrl()}/order-details/${order._id}`;
  const awb = order.awbNumber ? `*AWB/Docket:* ${order.awbNumber}\n` : '';

  const message = `🚚 *Your Order Has Been Shipped!* 📦

Hi ${name},
Your package for order *#${shortId}* is on its way to you!

${awb}📍 *Destination:* ${order.shippingAddress.city || ''}, ${order.shippingAddress.state || ''}

Track your shipment in real-time here:
🔗 ${trackingUrl}

Please ensure someone is available at the address to receive the delivery.`;

  return sendWhatsAppMessage({
    to: phone,
    recipientName: name,
    eventType: 'ORDER_SHIPPED',
    orderId: order._id,
    textMessage: message,
  });
}

/**
 * 5. Out for Delivery Notification
 */
async function notifyOrderOutForDelivery(order) {
  if (!order || !order.shippingAddress) return;
  const phone = order.shippingAddress.phone || order.contactNumber;
  const name = `${order.shippingAddress.firstName || ''} ${order.shippingAddress.lastName || ''}`.trim() || 'Customer';
  const shortId = String(order._id).slice(-6).toUpperCase();
  const isCOD = order.paymentMethod === 'COD' && order.paymentStatus !== 'Paid';
  const amountText = isCOD
    ? `💵 *Cash to Pay on Delivery:* ₹${order.totalAmount?.toLocaleString('en-IN') || 0}\n`
    : '💳 *Payment:* Already Paid online\n';

  const message = `🛵 *Out for Delivery Today!* 📍

Hi ${name},
Our delivery executive is out to deliver your CCTV SHOPPEE order *#${shortId}* today!

${amountText}📍 *Delivery Address:* ${order.shippingAddress.street || ''}, ${order.shippingAddress.city || ''}

Please keep your phone reachable for the delivery agent.`;

  return sendWhatsAppMessage({
    to: phone,
    recipientName: name,
    eventType: 'OUT_FOR_DELIVERY',
    orderId: order._id,
    textMessage: message,
  });
}

/**
 * 6. Order Delivered Notification
 */
async function notifyOrderDelivered(order) {
  if (!order || !order.shippingAddress) return;
  const phone = order.shippingAddress.phone || order.contactNumber;
  const name = `${order.shippingAddress.firstName || ''} ${order.shippingAddress.lastName || ''}`.trim() || 'Customer';
  const shortId = String(order._id).slice(-6).toUpperCase();

  const message = `🎉 *Delivered Successfully!* 📦

Hi ${name},
Your order *#${shortId}* has been delivered. We hope your new CCTV installation meets your expectations!

📄 *Download Tax Invoice:*
${getClientUrl()}/order-details/${order._id}

⭐ If you need installation assistance, technical support, or have any questions, reply to this message or call our support desk at *+91 7418667333*.

Thank you for choosing *CCTV SHOPPEE*!`;

  return sendWhatsAppMessage({
    to: phone,
    recipientName: name,
    eventType: 'ORDER_DELIVERED',
    orderId: order._id,
    textMessage: message,
  });
}

/**
 * 7. Order Cancelled Notification
 */
async function notifyOrderCancelled(order, reason = '') {
  if (!order || !order.shippingAddress) return;
  const phone = order.shippingAddress.phone || order.contactNumber;
  const name = `${order.shippingAddress.firstName || ''} ${order.shippingAddress.lastName || ''}`.trim() || 'Customer';
  const shortId = String(order._id).slice(-6).toUpperCase();
  const reasonText = reason || order.cancellation?.reason || 'Cancelled as per request';
  const isPaid = order.paymentStatus === 'Paid';
  const refundText = isPaid
    ? '\n💳 *Refund:* Your refund of ₹' + (order.totalAmount?.toLocaleString('en-IN') || 0) + ' has been initiated and will reflect in 3-5 business days.'
    : '';

  const message = `⚠️ *Order Cancelled*

Hi ${name},
Your order *#${shortId}* has been cancelled.
📝 *Reason:* ${reasonText}${refundText}

If this was a mistake or you have any questions, please contact our team at *+91 7418667333* or sales@cctvshoppee.com.`;

  return sendWhatsAppMessage({
    to: phone,
    recipientName: name,
    eventType: 'ORDER_CANCELLED',
    orderId: order._id,
    textMessage: message,
  });
}

// -------------------------------------------------------------
// INTERACTIVE CUSTOMER CHATBOT LOGIC
// -------------------------------------------------------------

async function handleIncomingCustomerWhatsApp(fromPhone, incomingText) {
  const normalizedPhone = normalizePhoneNumber(fromPhone);
  const text = (incomingText || '').trim().toLowerCase();

  // Log incoming message
  await new WhatsAppMessage({
    recipientPhone: normalizedPhone,
    eventType: 'CUSTOMER_INQUIRY',
    direction: 'inbound',
    messageType: 'text',
    messageBody: incomingText || '',
    status: 'read',
  }).save();

  // Find user's latest order by phone
  let userOrder = null;
  try {
    userOrder = await Order.findOne({
      $or: [
        { 'shippingAddress.phone': { $regex: normalizedPhone.slice(-10) } },
        { contactNumber: { $regex: normalizedPhone.slice(-10) } },
      ],
    }).sort({ createdAt: -1 });
  } catch (e) {
    console.error('Error finding order for WhatsApp chat:', e);
  }

  let botReply = '';

  if (text.includes('track') || text === '1' || text.includes('where is my product') || text.includes('status')) {
    if (userOrder) {
      const shortId = String(userOrder._id).slice(-6).toUpperCase();
      const awb = userOrder.awbNumber ? `\n🚚 *AWB:* ${userOrder.awbNumber}` : '';
      botReply = `📦 *Your Latest Order Status*

Order: *#${shortId}*
Status: *${userOrder.status}*
Payment: *${userOrder.paymentStatus}* (₹${userOrder.totalAmount?.toLocaleString('en-IN') || 0})${awb}

🔗 *Live Tracking Link:*
${getClientUrl()}/order-details/${userOrder._id}

Reply *support* to connect with an agent.`;
    } else {
      botReply = `🔍 We couldn't find an order linked to this WhatsApp number (+${normalizedPhone}).
If you placed the order with a different number, please visit:
${getClientUrl()}/orders

Or call our support team directly at *+91 7418667333*.`;
    }
  } else if (text.includes('cancel') || text === '2') {
    if (userOrder) {
      const shortId = String(userOrder._id).slice(-6).toUpperCase();
      if (['Created', 'Confirmed', 'Allocated'].includes(userOrder.status)) {
        botReply = `⚠️ *Cancel Order #${shortId}*

Your order is currently *${userOrder.status}* and eligible for cancellation.
To cancel securely with one tap, open:
🔗 ${getClientUrl()}/order-details/${userOrder._id}

Or reply *CONFIRM CANCEL ${shortId}* and our team will process it for you.`;
      } else {
        botReply = `ℹ️ Order *#${shortId}* is currently in *${userOrder.status}* stage.
Orders already packed or in transit cannot be cancelled automatically. You can reject delivery at your doorstep or request a return once delivered.
For assistance, call *+91 7418667333*.`;
      }
    } else {
      botReply = `To cancel an order, please visit your account at ${getClientUrl()}/orders or call our support team at *+91 7418667333*.`;
    }
  } else if (text.includes('support') || text.includes('help') || text === '3' || text.includes('agent')) {
    botReply = `🏢 *CCTV SHOPPEE Customer Support*

📞 *Phone / WhatsApp:* +91 7418667333
📧 *Email:* sales@cctvshoppee.com
🌐 *Website:* ${getClientUrl()}

📍 *Address:*
173, NEW MILITARY ROAD, KANNIGAPURAM,
TNHB MIG V BLOCK, AVADI,
TAMIL NADU - 600054

🕒 *Business Hours:*
Mon - Sat: 9:30 AM - 7:30 PM

An executive will assist you shortly!`;
  } else {
    botReply = `👋 *Welcome to CCTV SHOPPEE!*

How can we help you today? Reply with a number or keyword:

1️⃣ *Track Order* - Check current status & delivery
2️⃣ *Cancel Order* - Request order cancellation
3️⃣ *Support* - Speak with our customer care (+91 7418667333)

Visit our store: ${getClientUrl()}`;
  }

  // Send the automated reply
  return sendWhatsAppMessage({
    to: normalizedPhone,
    recipientName: userOrder ? userOrder.shippingAddress?.firstName : 'Customer',
    eventType: 'BOT_REPLY',
    orderId: userOrder ? userOrder._id : null,
    textMessage: botReply,
  });
}

module.exports = {
  normalizePhoneNumber,
  sendWhatsAppMessage,
  notifyOrderPlaced,
  notifyOrderConfirmed,
  notifyOrderPacked,
  notifyOrderShipped,
  notifyOrderOutForDelivery,
  notifyOrderDelivered,
  notifyOrderCancelled,
  handleIncomingCustomerWhatsApp,
};
