const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['image', 'video'], required: true },
    file: { type: String, required: true }, // filename stored by multer
    title: { type: String },
    order: { type: Number, default: 0 }
  },
  { _id: false }
);

const productSchema = new mongoose.Schema({
  name: String,
  description: String,

  // Backward-compat single fields (kept for compatibility)
  image: String,

  // PDFs
  brochure: String,        // Download Brochure PDF
  specification: String,   // Specification Details PDF

  // New: rich media arrays
  images: [String],        // array of image filenames (optional convenience)
  videos: [String],        // array of video filenames (optional convenience)
  media: [mediaSchema],    // preferred: type-aware list to render in order

  sku: String,
  brand: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  oldPrice: Number,
  newPrice: Number,
  model: String,
  productTag: String,
  productType: String,
  nightVision: String,
  audioChannel: String,
  battery: String,
  type: String,
  irRange: String,
  poePorts: String,
  ethernetPorts: String,
  offers: String,
  megaPixel: String,
  biometricType: String,
  videoChannel: String,
  cameraType: String,
  accessControl: String,
  channel: String,
  lens: String,
  communications: String,
  bodyType: String,
  upLinkPorts: String,
  sfpPorts: String,
  builtInPower: String,
  sataPorts: String,
  sdCard: String,
  stock: Number,
  status: String,
  isTrending: Boolean,
  productBadge: {
    type: String,
    enum: ['Hot', 'Trending', 'Sale', 'Upcoming']
  },
  productTab: {
    type: String,
    enum: ['New', 'Featured', 'Top Sellers']
  },
  banner1: String,
  banner2: String
});

module.exports = mongoose.model('Product', productSchema);
