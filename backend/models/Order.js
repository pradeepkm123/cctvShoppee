// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema(
//   {
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     items: [
//       {
//         productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
//         quantity: { type: Number, required: true },
//         price: { type: Number, required: true }, // Add price field
//         name: { type: String }, // Optionally add product name
//       },
//     ],
//     totalAmount: { type: Number, required: true },
//     shippingAddress: {
//       firstName: { type: String, required: true },
//       lastName: { type: String, required: true },
//       phone: { type: String, required: true },
//       email: { type: String, required: true },
//       state: { type: String, required: true },
//       street: { type: String, default: "" },
//       city: { type: String, default: "" },
//       postcode: { type: String, default: "" },
//       country: { type: String, default: "India" },
//     },
//     contactNumber: { type: String, required: false, default: "N/A" },
//     paymentMethod: {
//       type: String,
//       enum: ["COD", "UPI", "Card", "NetBanking"],
//       required: false,
//       default: "COD",
//     },
//     paymentStatus: {
//       type: String,
//       enum: ["Pending", "Paid", "Refunded", "Failed"],
//       default: "Pending",
//     },
//     status: {
//       type: String,
//       enum: [
//         "Created",
//         "CREATED",
//         "Confirmed",
//         "Allocated",
//         "Packed",
//         "Shipment Created",
//         "Item Out to Delivery",
//         "Delivered",
//         "Cancelled",
//       ],
//       default: "Created",
//     },
//     timeline: [
//       {
//         status: { type: String, required: true },
//         description: { type: String, default: "" },
//         timestamp: { type: Date, default: Date.now },
//         color: { type: String, default: "#3B82F6" },
//         user: { type: String, default: "System" },
//       },
//     ],
//     platform: String,
//     awbNumber: String,
//     channel: String,
//     listPrice: Number,
//     sellingPrice: Number,
//     extraDiscount: Number,
//     specialPrice: Number,
//     paymentHandlingFee: Number,
//     protectPromiseFee: Number,
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Order", orderSchema);




const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        name: { type: String },
        color: { type: String, default: "Black" },
        seller: { type: String, default: "Nehru Fashion" },
      },
    ],
    totalAmount: { type: Number, required: true },
    shippingAddress: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      state: { type: String, required: true },
      street: { type: String, default: "" },
      city: { type: String, default: "" },
      postcode: { type: String, default: "" },
      country: { type: String, default: "India" },
    },
    contactNumber: { type: String, required: false, default: "N/A" },
    paymentMethod: {
      type: String,
      enum: ["COD", "UPI", "Card", "NetBanking"],
      required: false,
      default: "COD",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Refunded", "Failed", "Cancelled"],
      default: "Pending",
    },
    status: {
      type: String,
      enum: [
        "Created",
        "Confirmed",
        "Allocated",
        "Packed",
        "Shipment Created",
        "Item Out to Delivery",
        "Delivered",
        "Cancelled",
        "Return Requested",
        "Return Approved",
        "Return Rejected",
        "Return Completed"
      ],
      default: "Created",
    },
    timeline: [
      {
        status: { type: String, required: true },
        description: { type: String, default: "" },
        timestamp: { type: Date, default: Date.now },
        color: { type: String, default: "#3B82F6" },
        user: { type: String, default: "System" },
      },
    ],
    // Cancel details
    cancellation: {
      reason: String,
      otherReason: String,
      additionalComments: String,
      cancelledAt: Date,
      cancelledBy: { type: String, enum: ["Customer", "Admin"], default: "Customer" },
    },
   // Return details
    returnRequest: {
      reason: String,
      issueDescription: String,
      images: [String],
      refundChoice: { type: String },
      returnStatus: {
        type: String,
        enum: ["Pending", "Approved", "Rejected", "Completed"],
        default: "Pending",
      },
      requestedAt: Date,
      processedAt: Date,
      adminNotes: String,
    },
    platform: String,
    awbNumber: String,
    channel: String,
    listPrice: Number,
    sellingPrice: Number,
    extraDiscount: Number,
    specialPrice: Number,
    paymentHandlingFee: Number,
    protectPromiseFee: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);