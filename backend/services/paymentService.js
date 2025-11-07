// Mock Payment Service
// Replace with Razorpay / Stripe SDK as needed

exports.refund = async (orderId, amount) => {
  console.log(`Refunding ₹${amount} for order ${orderId}`);
  return { success: true, amount, orderId, transactionId: "txn_mock_12345" };
};
