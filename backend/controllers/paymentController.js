const Razorpay = require('razorpay');
const Payment = require('../models/Payment');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
  const { amount, currency, receipt } = req.body;

  const options = {
    amount: amount * 100,
    currency,
    receipt,
  };

  try {
    const response = await razorpay.orders.create(options);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating order');
  }
};

exports.verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex');

  if (expectedSignature === razorpay_signature) {
    // Save payment details to the database
    const payment = new Payment({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
      amount: req.body.amount,
      currency: req.body.currency,
      status: 'successful',
    });

    await payment.save();

    res.send('Payment verified successfully');
  } else {
    res.status(400).send('Invalid signature');
  }
};

// exports.sendPaymentLink = async (req, res) => {
//   const { upiId, phone } = req.body;

//   const options = {
//     amount: 10000,
//     currency: 'INR',
//     accept_partial: false,
//     first_min_partial_amount: 100,
//     expire_by: Math.floor(Date.now() / 1000) + 7200,
//     reference_id: `order_${Math.random().toString(36).substring(2, 15)}`,
//     description: 'Payment for order',
//     customer: {
//       name: 'Customer Name',
//       contact: phone,
//       email: 'customer@example.com',
//     },
//     notify: {
//       sms: true,
//       email: true,
//     },
//     reminder_enable: true,
//     notes: {
//       policy_name: 'Demo Policy',
//     },
//     callback_url: 'https://your-website.com/callback',
//     callback_method: 'get',
//   };

//   try {
//     const response = await razorpay.paymentLink.create(options);
//     res.json({ success: true, paymentLink: response.short_url });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: 'Error creating payment link' });
//   }
// };

exports.sendPaymentLink = async (req, res) => {
  const { upiId, phone } = req.body;

  const options = {
    amount: 100, // ₹1 in paise
    currency: 'INR',
    accept_partial: false,
    expire_by: Math.floor(Date.now() / 1000) + 7200,
    reference_id: `order_${Math.random().toString(36).substring(2, 15)}`,
    description: 'Payment for ₹1 test order',
    customer: {
      name: 'Customer Name',
      contact: phone,
      email: 'customer@example.com',
    },
    notify: {
      sms: true,
      email: true,
    },
    reminder_enable: true,
    notes: {
      policy_name: '₹1 Payment Test',
    },
    callback_url: 'https://your-website.com/callback',
    callback_method: 'get',
  };

  try {
    const response = await razorpay.paymentLink.create(options);
    res.json({ success: true, paymentLink: response.short_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Error creating payment link' });
  }
};
