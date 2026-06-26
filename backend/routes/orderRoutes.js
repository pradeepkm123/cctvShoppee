// const express = require("express");
// const router = express.Router();
// const { authenticate } = require("../middleware/authMiddleware");
// const upload = require("../middleware/upload");
// const {
//   createOrder,
//   getUserOrders,
//   getAllOrders,
//   getOrderDetails,
//   updateOrderStatus,
//   processRefund,
//   cancelOrder,
//   handlePayment,
//   getOrderTimeline,
//   addTimelineEntry,
//   requestReturnOrder,
//   updateReturnStatus,
//   checkCancellationEligibility,
//   downloadInvoice, // Add this line
// } = require("../controllers/orderController");

// // 🔒 All routes need auth
// router.use(authenticate);

// // Create new order
// router.post("/", createOrder);

// // Get logged-in user's orders
// router.get("/", getUserOrders);

// // Get all orders (admin use)
// router.get("/all", getAllOrders);

// // Get single order details
// router.get("/:orderId", getOrderDetails);

// // Get order timeline
// router.get("/:orderId/timeline", getOrderTimeline);

// // Check cancellation eligibility
// router.get("/:orderId/eligibility", checkCancellationEligibility);

// // Add timeline entry
// router.post("/:orderId/timeline", addTimelineEntry);

// // ✅ Order actions - UPDATED TO USE POST FOR CANCEL
// router.put("/:orderId/status", updateOrderStatus);
// router.put("/:orderId/pay", handlePayment);
// router.put("/:orderId/refund", processRefund);
// router.post("/:orderId/cancel", cancelOrder); // Changed from PUT to POST

// // ✅ Return order actions
// router.post("/:orderId/return", upload.array('images', 5), requestReturnOrder);
// router.put("/:orderId/return/status", updateReturnStatus);

// // ✅ Download invoice
// router.get("/:orderId/invoice", downloadInvoice);

// module.exports = router;





const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const returnUpload = require("../middleware/uploadMiddleware");
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  getOrderDetails,
  updateOrderStatus,
  processRefund,
  cancelOrder,
  handlePayment,
  getOrderTimeline,
  addTimelineEntry,
  requestReturnOrder,
  updateReturnStatus,
  checkCancellationEligibility,
  downloadInvoice,
  getPublicOrders, // ✅ new controller
  deleteOrder, // ✅ Added for swipe to delete
} = require("../controllers/orderController");

// ✅ PUBLIC ROUTE (no authentication required)
router.get("/public", getPublicOrders);

// 🔒 PROTECTED ROUTES (with auth)
router.use(authenticate);

// Create new order
router.post("/", createOrder);

// Get logged-in user's orders
router.get("/", getUserOrders);

// Get all orders (admin use)
router.get("/all", getAllOrders);

// Get single order details
router.get("/:orderId", getOrderDetails);

// Get order timeline
router.get("/:orderId/timeline", getOrderTimeline);

// Check cancellation eligibility
router.get("/:orderId/eligibility", checkCancellationEligibility);

// Add timeline entry
router.post("/:orderId/timeline", addTimelineEntry);

// ✅ Order actions
router.put("/:orderId/status", updateOrderStatus);
router.put("/:orderId/pay", handlePayment);
router.put("/:orderId/refund", processRefund);
router.post("/:orderId/cancel", cancelOrder);

// ✅ Return actions
router.post("/:orderId/return", returnUpload.array("images", 5), requestReturnOrder);
router.put("/:orderId/return/status", updateReturnStatus);

// ✅ Download invoice
router.get("/:orderId/invoice", downloadInvoice);

// ✅ Delete order
router.delete("/:orderId", deleteOrder);

module.exports = router;
