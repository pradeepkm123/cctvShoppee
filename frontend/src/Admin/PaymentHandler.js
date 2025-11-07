import React from "react";
import axios from "axios";

const PaymentHandler = ({ order }) => {
  const handlePaymentSuccess = async (paymentId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://cctvshoppee.onrender.com/api/orders/update-payment/${order._id}`,
        { paymentStatus: "Paid", paymentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Payment successful! Order updated.");
      window.location.reload(); // refresh order table
    } catch (error) {
      console.error("Payment update failed:", error);
      alert("Failed to update payment status.");
    }
  };

  // Simulating Razorpay success callback
  const simulatePayment = () => {
    const fakePaymentId = "pay_" + Date.now();
    handlePaymentSuccess(fakePaymentId);
  };

  return (
    <button
      onClick={simulatePayment}
      style={{ padding: "10px 16px", backgroundColor: "#10B981", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
    >
      Simulate Pay Now
    </button>
  );
};

export default PaymentHandler;
