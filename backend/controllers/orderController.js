const Order = require("../models/Order");
const mongoose = require("mongoose");
const Product = require("../models/Product");
const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

// ✅ Create a new order
// exports.createOrder = async (req, res) => {
//   try {
//     const {
//       items,
//       totalAmount,
//       shippingAddress,
//       contactNumber,
//       paymentMethod,
//       platform,
//       awbNumber,
//       channel,
//       listPrice,
//       sellingPrice,
//       extraDiscount,
//       specialPrice,
//       paymentHandlingFee,
//       protectPromiseFee,
//     } = req.body;

//     const userId = req.user.userId;

//     // Validate items: Ensure each item has productId and price
//     if (!items || !Array.isArray(items) || items.length === 0) {
//       return res.status(400).json({ message: "Items array is required and must not be empty." });
//     }


//     const validatedItems = items.map((item) => {
//       if (!item.productId) {
//         throw new Error("productId is required for all items.");
//       }
//       if (typeof item.price === "undefined" || item.price === null) {
//         throw new Error("price is required for all items.");
//       }
//       return {
//         productId: item.productId,
//         quantity: item.quantity || 1,
//         price: item.price,
//         name: item.name || "",
//         color: item.color || "Black",
//         seller: item.seller || "Nehru Fashion",
//       };
//     });

//     const newOrder = new Order({
//       userId,
//       items: validatedItems,
//       totalAmount,
//       shippingAddress,
//       contactNumber,
//       paymentMethod,
//       platform,
//       awbNumber,
//       channel,
//       listPrice,
//       sellingPrice,
//       extraDiscount,
//       specialPrice,
//       paymentHandlingFee,
//       protectPromiseFee,
//       status: "Created",
//       paymentStatus: "Pending",
//       timeline: [
//         {
//           status: "Created",
//           description: "Order has been placed",
//           timestamp: new Date(),
//           color: "#3B82F6",
//           user: "System",
//         },
//       ],
//     });

//     await newOrder.save();
//     res.status(201).json(newOrder);
//   } catch (error) {
//     res.status(400).json({ message: "Error creating order", error: error.message });
//   }
// };

exports.createOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      items,
      totalAmount,
      shippingAddress,
      contactNumber,
      paymentMethod,
      platform,
      awbNumber,
      channel,
      listPrice,
      sellingPrice,
      extraDiscount,
      specialPrice,
      paymentHandlingFee,
      protectPromiseFee,
    } = req.body;

    const userId = req.user?.userId;

    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Items array is required and must not be empty." });
    }

    // ✅ Check stock before creating order
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) throw new Error(`Product not found: ${item.productId}`);
      if (product.stock < item.quantity) {
        throw new Error(
          `Not enough stock for "${product.name}". Available: ${product.stock}, Requested: ${item.quantity}`
        );
      }
    }

    // ✅ Deduct stock for each item
    for (const item of items) {
      await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { stock: -item.quantity } },
        { session }
      );
    }

    // ✅ Create the order
    const validatedItems = items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity || 1,
      price: item.price,
      name: item.name || "",
      color: item.color || "Black",
      seller: item.seller || "Nehru Fashion",
    }));

    const newOrder = new Order({
      userId,
      items: validatedItems,
      totalAmount,
      shippingAddress,
      contactNumber,
      paymentMethod,
      platform,
      awbNumber,
      channel,
      listPrice,
      sellingPrice,
      extraDiscount,
      specialPrice,
      paymentHandlingFee,
      protectPromiseFee,
      status: "Created",
      paymentStatus: "Pending",
      timeline: [
        {
          status: "Created",
          description: "Order has been placed",
          timestamp: new Date(),
          color: "#3B82F6",
          user: "System",
        },
      ],
    });

    await newOrder.save({ session });
    await session.commitTransaction();

    res.status(201).json({
      success: true,
      message: "Order created successfully and stock updated",
      order: newOrder,
    });
  } catch (error) {
    await session.abortTransaction();
    res
      .status(400)
      .json({ success: false, message: "Error creating order", error: error.message });
  } finally {
    session.endSession();
  }
};

// ✅ Get logged-in user's orders
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.userId;
    const orders = await Order.find({ userId })
      .populate("items.productId", "name image")
      .sort({ createdAt: -1 })
      .lean();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
};

// ✅ Public: Get all orders without requiring authentication
exports.getPublicOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.productId", "name image")
      .populate("userId", "name phone")
      .sort({ createdAt: -1 })
      .lean();

    const formattedOrders = orders.map((order) => ({
      ...order,
      user: {
        name: order.userId?.name || "Unknown Customer",
        phone: order.userId?.phone || "N/A",
      },
    }));

    res.status(200).json(formattedOrders);
  } catch (error) {
    console.error("Error fetching public orders:", error);
    res.status(500).json({
      message: "Error fetching orders",
      error: error.message,
    });
  }
};


// ✅ Get all orders (admin use)
// exports.getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find()
//       .populate("items.productId", "name image")
//       .populate("userId", "name phone")
//       .sort({ createdAt: -1 })
//       .lean();
//     const transformedOrders = orders.map((order) => ({
//       ...order,
//       user: {
//         name: order.userId?.name || "Unknown Customer",
//         phone: order.userId?.phone || "N/A",
//       },
//     }));
//     res.status(200).json(transformedOrders);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching orders", error: error.message });
//   }
// };
exports.getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const orders = await Order.find()
      .populate("items.productId", "name image")
      .populate("userId", "name phone")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Order.countDocuments();

    const transformedOrders = orders.map((order) => ({
      ...order,
      user: {
        name: order.userId?.name || "Unknown Customer",
        phone: order.userId?.phone || "N/A",
      },
    }));

    res.status(200).json({
      success: true,
      orders: transformedOrders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
};


// ✅ Get single order details
exports.getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate("items.productId", "name image")
      .populate("userId", "name phone");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get order timeline
exports.getOrderTimeline = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.json({ success: true, timeline: order.timeline || [] });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch timeline", error: error.message });
  }
};


// ✅ Add timeline entry
exports.addTimelineEntry = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { timelineEntry } = req.body;
    if (!timelineEntry || !timelineEntry.status) {
      return res.status(400).json({
        success: false,
        message: "Timeline entry and status are required",
      });
    }
    timelineEntry.timestamp = timelineEntry.timestamp || new Date();
    timelineEntry.color = timelineEntry.color || "#3B82F6";
    timelineEntry.user = timelineEntry.user || "System";
    const order = await Order.findByIdAndUpdate(
      orderId,
      { $push: { timeline: timelineEntry } },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.json({ success: true, timeline: order.timeline });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add timeline entry", error: error.message });
  }
};

// ✅ Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, note } = req.body;
    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        status,
        $push: {
          timeline: {
            status,
            description: note || `Status updated to ${status}`,
            timestamp: new Date(),
            color: "#8B5CF6",
            user: req.user?.name || "System",
          },
        },
      },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Handle payment (mark as paid)
exports.handlePayment = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { transactionId, amount } = req.body;
    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        paymentStatus: "Paid",
        $push: {
          timeline: {
            status: "Paid",
            description: `Payment of ₹${amount} received (Txn: ${transactionId})`,
            timestamp: new Date(),
            color: "#10B981",
            user: "System",
          },
        },
      },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Payment error", error: error.message });
  }
};

// ✅ Process refund
exports.processRefund = async (req, res) => {
  try {
    const { refundAmount, refundReason } = req.body;
    const { orderId } = req.params;
    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        paymentStatus: "Refunded",
        $push: {
          timeline: {
            status: "Refunded",
            description: `Refund of ₹${refundAmount} processed. Reason: ${refundReason}`,
            timestamp: new Date(),
            color: "#EF4444",
            user: "Admin User",
          },
        },
      },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Refund error", error: error.message });
  }
};

// ✅ Cancel order (Updated)
// ✅ Cancel order (Updated)
// exports.cancelOrder = async (req, res) => {
//   try {
//     const { reason, otherReason, additionalComments } = req.body;
//     const { orderId } = req.params;

//     // Validate required fields
//     if (!reason) {
//       return res.status(400).json({ success: false, message: "Cancellation reason is required" });
//     }

//     // Check if order exists and can be cancelled
//     const order = await Order.findById(orderId);
//     if (!order) {
//       return res.status(404).json({ success: false, message: "Order not found" });
//     }

//     // Check if order is already cancelled
//     if (order.status === "Cancelled") {
//       return res.status(400).json({ success: false, message: "Order is already cancelled" });
//     }

//     // Check if order can be cancelled (within 7 days)
//     const orderDate = new Date(order.createdAt);
//     const currentDate = new Date();
//     const diffTime = currentDate - orderDate;
//     const diffDays = diffTime / (1000 * 60 * 60 * 24);

//     if (diffDays > 7) {
//       return res.status(400).json({
//         success: false,
//         message: "Order cannot be cancelled after 7 days of placement"
//       });
//     }

//     // Update order
//     const updatedOrder = await Order.findByIdAndUpdate(
//       orderId,
//       {
//         status: "Cancelled",
//         paymentStatus: order.paymentStatus === "Paid" ? "Refunded" : "Cancelled",
//         cancellation: {
//           reason,
//           otherReason: reason === 'Other' ? otherReason : '',
//           additionalComments,
//           cancelledAt: new Date(),
//           cancelledBy: "Customer"
//         },
//         $push: {
//           timeline: {
//             status: "Cancelled",
//             description: `Order cancelled by customer. Reason: ${reason}${otherReason ? ` - ${otherReason}` : ''}`,
//             timestamp: new Date(),
//             color: "#EF4444",
//             user: "Customer",
//           },
//         },
//       },
//       { new: true }
//     );

//     res.json({
//       success: true,
//       message: "Order cancelled successfully",
//       order: updatedOrder
//     });
//   } catch (error) {
//     console.error("Cancel order error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Cancel error",
//       error: error.message
//     });
//   }
// };

// ✅ Cancel order and restore stock
exports.cancelOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { reason, otherReason, additionalComments } = req.body;
    const { orderId } = req.params;

    if (!reason)
      return res.status(400).json({ success: false, message: "Reason is required" });

    const order = await Order.findById(orderId).populate("items.productId");
    if (!order)
      return res.status(404).json({ success: false, message: "Order not found" });
    if (order.status === "Cancelled")
      return res.status(400).json({ success: false, message: "Already cancelled" });

    // Restore stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(
        item.productId._id,
        { $inc: { stock: item.quantity } },
        { session }
      );
    }

    // Update order
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        status: "Cancelled",
        paymentStatus: order.paymentStatus === "Paid" ? "Refunded" : "Cancelled",
        cancellation: {
          reason,
          otherReason: reason === "Other" ? otherReason : "",
          additionalComments,
          cancelledAt: new Date(),
          cancelledBy: "Customer",
        },
        $push: {
          timeline: {
            status: "Cancelled",
            description: `Order cancelled by customer. Reason: ${reason}${otherReason ? " - " + otherReason : ""
              }`,
            timestamp: new Date(),
            color: "#EF4444",
            user: "Customer",
          },
        },
      },
      { new: true, session }
    );

    await session.commitTransaction();
    res.json({
      success: true,
      message: "Order cancelled successfully",
      order: updatedOrder,
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({
      success: false,
      message: "Cancel error",
      error: error.message,
    });
  } finally {
    session.endSession();
  }
};

// ✅ Return request with image upload
exports.requestReturnOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    // 🧠 Parse the FormData field "data"
    let data = {};
    if (req.body.data) {
      try {
        data = JSON.parse(req.body.data);
      } catch (err) {
        console.error("❌ JSON parse error:", err.message);
        data = req.body;
      }
    } else {
      data = req.body;
    }

    const { reason, issueDescription, refundChoice } = data;
    console.log("🟢 Parsed Return Data:", data);

    if (!reason || !issueDescription || !refundChoice) {
      return res.status(400).json({
        success: false,
        message: "Missing reason, issueDescription or refundChoice",
        received: data,
      });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const imageUrls = req.files?.map((f) => `/uploads/returns/${f.filename}`) || [];

    // ✅ Assign all fields properly inside returnRequest
    order.status = "Return Requested";
    order.returnRequest = {
      reason,
      issueDescription,
      refundChoice,
      images: imageUrls,
      returnStatus: "Pending",
      requestedAt: new Date(),
    };

    order.timeline.push({
      status: "Return Requested",
      description: `Return requested by customer. Reason: ${reason}, Choice: ${refundChoice}`,
      timestamp: new Date(),
      color: "#F59E0B",
      user: "Customer",
    });

    const updatedOrder = await order.save();
    console.log("✅ Saved Return Request:", updatedOrder.returnRequest);

    res.json({
      success: true,
      message: "Return request saved successfully.",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("❌ Return request error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Return Status (Admin)
// exports.updateReturnStatus = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const { returnStatus, adminNotes } = req.body;

//     const order = await Order.findById(orderId);
//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     const updateData = {
//       "returnRequest.returnStatus": returnStatus,
//       "returnRequest.processedAt": new Date(),
//       "returnRequest.adminNotes": adminNotes,
//     };

//     // Update main status based on return status
//     if (returnStatus === "Approved") {
//       updateData.status = "Return Approved";
//     } else if (returnStatus === "Rejected") {
//       updateData.status = "Return Rejected";
//     } else if (returnStatus === "Completed") {
//       updateData.status = "Return Completed";
//       updateData.paymentStatus = "Refunded";
//     }

//     const updatedOrder = await Order.findByIdAndUpdate(
//       orderId,
//       {
//         ...updateData,
//         $push: {
//           timeline: {
//             status: updateData.status,
//             description: `Return ${returnStatus.toLowerCase()}${adminNotes ? `. Notes: ${adminNotes}` : ''}`,
//             timestamp: new Date(),
//             color: returnStatus === "Approved" ? "#10B981" : returnStatus === "Rejected" ? "#EF4444" : "#F59E0B",
//             user: req.user?.name || "Admin",
//           },
//         },
//       },
//       { new: true }
//     );

//     res.json({
//       success: true,
//       message: `Return ${returnStatus.toLowerCase()} successfully`,
//       order: updatedOrder
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error updating return status",
//       error: error.message
//     });
//   }
// };
exports.updateReturnStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { returnStatus, adminNotes } = req.body;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const updateData = {
      "returnRequest.returnStatus": returnStatus,
      "returnRequest.processedAt": new Date(),
      "returnRequest.adminNotes": adminNotes,
    };

    if (returnStatus === "Approved") {
      updateData.status = "Return Approved";
    } else if (returnStatus === "Rejected") {
      updateData.status = "Return Rejected";
    } else if (returnStatus === "Completed") {
      updateData.status = "Return Completed";
      updateData.paymentStatus = "Refunded";

      // ✅ Restore product stock after successful return
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.productId, { $inc: { stock: item.quantity } });
      }
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        ...updateData,
        $push: {
          timeline: {
            status: updateData.status,
            description: `Return ${returnStatus.toLowerCase()}${adminNotes ? `. Notes: ${adminNotes}` : ""}`,
            timestamp: new Date(),
            color:
              returnStatus === "Approved"
                ? "#10B981"
                : returnStatus === "Rejected"
                  ? "#EF4444"
                  : "#F59E0B",
            user: req.user?.name || "Admin",
          },
        },
      },
      { new: true }
    );

    res.json({
      success: true,
      message: `Return ${returnStatus.toLowerCase()} successfully`,
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating return status", error: error.message });
  }
};

// ✅ Check if order can be cancelled
exports.checkCancellationEligibility = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const orderDate = new Date(order.createdAt);
    const currentDate = new Date();
    const diffTime = currentDate - orderDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    const canCancel = diffDays <= 7 && order.status !== "Cancelled";
    const canReturn = diffDays <= 3 &&
      !["Return Requested", "Return Completed", "Cancelled"].includes(order.status);

    res.json({
      success: true,
      canCancel,
      canReturn,
      orderDate: order.createdAt,
      currentStatus: order.status
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error checking eligibility",
      error: error.message
    });
  }
};
// ✅ Request Return Order (New)
exports.requestReturnOrder = async (req, res) => {
  try {
    const { reason, issueDescription, refundChoice } = req.body;
    const { orderId } = req.params;

    // Check if order exists and can be returned
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    // Check if order is already returned or return requested
    if (order.status === "Return Requested" || order.status === "Return Completed") {
      return res.status(400).json({ message: "Return already requested for this order" });
    }
    // Check if order can be returned (within 3 days for electronics)
    const orderDate = new Date(order.createdAt);
    const currentDate = new Date();
    const diffTime = currentDate - orderDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays > 3) {
      return res.status(400).json({
        message: "Return cannot be requested after 3 days of delivery"
      });
    }
    // Handle file uploads
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      imageUrls = req.files.map(file => `/uploads/returns/${file.filename}`);
    }
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        status: "Return Requested",
        returnRequest: {
          reason,
          issueDescription,
          images: imageUrls,
          refundChoice,
          returnStatus: "Pending",
          requestedAt: new Date(),
        },
        $push: {
          timeline: {
            status: "Return Requested",
            description: `Return requested by customer. Reason: ${reason}. Choice: ${refundChoice}`,
            timestamp: new Date(),
            color: "#F59E0B",
            user: "Customer",
          },
        },
      },
      { new: true }
    );
    res.json({
      success: true,
      message: "Return request submitted successfully",
      order: updatedOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Return request error",
      error: error.message
    });
  }
};

// ✅ Generate and download invoice
exports.downloadInvoice = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId)
      .populate('items.productId', 'name image')
      .populate('userId', 'name phone email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Create new PDF
    const doc = new PDFDocument({ margin: 50 });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=invoice-${orderId}.pdf`);
    doc.pipe(res);

    // ---------------- HEADER ----------------
    doc.font('Helvetica-Bold').fontSize(22).text('Invoice', 50, 50);
    doc.moveDown(0.5);

    doc.fontSize(11).font('Helvetica');
    doc.text(`Invoice number ${order._id}`, 50);
    doc.text(`Date of issue ${new Date(order.createdAt).toLocaleDateString('en-IN', {
      year: 'numeric', month: 'long', day: 'numeric'
    })}`);
    doc.text(`Date due ${new Date(order.createdAt).toLocaleDateString('en-IN', {
      year: 'numeric', month: 'long', day: 'numeric'
    })}`);
    doc.moveDown(1.2);

    // ---------------- SELLER INFO ----------------
    doc.font('Helvetica-Bold').text('Your Company Name');
    doc.font('Helvetica')
      .text('Your Company Address Line 1')
      .text('Your Company Address Line 2')
      .text('City, State, ZIP')
      .text('Country')
      .text('support@yourcompany.com')
      .text('GSTIN: YOUR_GSTIN');
    doc.moveDown(1.5);

    // ---------------- BILL TO ----------------
    doc.font('Helvetica-Bold').text('Bill to');
    doc.font('Helvetica')
      .text(order.userId.name)
      .text(`${order.shippingAddress.street}, ${order.shippingAddress.city}`)
      .text(`${order.shippingAddress.state}, ${order.shippingAddress.postcode}`)
      .text(`${order.shippingAddress.country}`)
      .text(order.userId.email);
    doc.moveDown(1.5);

    // ---------------- AMOUNT DUE ----------------
    const totalDue = `₹${order.totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
    const dueDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
    doc.font('Helvetica-Bold').text(`${totalDue} due ${dueDate}`);
    doc.moveDown(0.6);

    // ---------------- PAY ONLINE ----------------
    doc.fillColor('blue').text('Pay online', { underline: true });
    doc.fillColor('black');
    doc.moveDown(1.5);

    // ---------------- TABLE HEADER ----------------
    const startY = doc.y;
    doc.font('Helvetica-Bold');
    doc.text('Description', 50, startY);
    doc.text('Qty', 250, startY);
    doc.text('Unit price', 320, startY);
    doc.text('Tax', 400, startY);
    doc.text('Amount', 470, startY);
    doc.moveDown(1);

    // ---------------- TABLE ROWS ----------------
    doc.font('Helvetica');
    order.items.forEach((item) => {
      const desc = item.productId?.name || item.name || 'Product';
      const qty = item.quantity;
      const price = item.price;
      const taxRate = 18;
      const amount = price * qty;

      doc.text(desc, 50, doc.y);
      doc.text(qty.toString(), 250, doc.y);
      doc.text(`₹${price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, 320, doc.y);
      doc.text(`${taxRate}%`, 400, doc.y);
      doc.text(`₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, 470, doc.y);
      doc.moveDown(1);
    });

    // ---------------- TOTALS ----------------
    const subTotal = order.totalAmount / 1.18;
    const igst = order.totalAmount - subTotal;

    doc.moveDown(1.5);
    const rightX = 470;
    const labelX = 330;

    doc.font('Helvetica').text('Subtotal', labelX, doc.y);
    doc.text(`₹${subTotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`, rightX, doc.y, { align: 'right' });
    doc.moveDown(0.4);

    doc.text('Total excluding tax', labelX, doc.y);
    doc.text(`₹${subTotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`, rightX, doc.y, { align: 'right' });
    doc.moveDown(0.4);

    doc.text(`IGST - India (18% on ₹${subTotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })})`, labelX, doc.y);
    doc.text(`₹${igst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`, rightX, doc.y, { align: 'right' });
    doc.moveDown(0.4);

    doc.text('Total', labelX, doc.y);
    doc.text(`₹${order.totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`, rightX, doc.y, { align: 'right' });
    doc.moveDown(0.4);

    doc.text('Amount due', labelX, doc.y);
    doc.text(`₹${order.totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`, rightX, doc.y, { align: 'right' });
    doc.moveDown(1.5);

    // ---------------- FOOTER ----------------
    doc.fontSize(10).text('Page 1 of 1', 0, 750, { align: 'center' });

    // Finalize PDF
    doc.end();

  } catch (error) {
    console.error('Error generating invoice:', error);
    res.status(500).json({ message: 'Failed to generate invoice', error: error.message });
  }
};