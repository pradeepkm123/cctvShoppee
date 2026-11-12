// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// const fs = require('fs');
// const http = require('http');
// require('dotenv').config();
// const socket = require('./socket'); // Only import once
// const connectDB = require('./config/db');

// // Route imports
// const authRoutes = require('./routes/authRoutes');
// const productRoutes = require('./routes/productRoutes');
// const categoryRoutes = require('./routes/categories');
// const wishlistRoutes = require('./routes/wishlist');
// const checkoutRoutes = require('./routes/checkoutRoutes');
// const paymentRoutes = require('./routes/paymentRoutes');
// const userRoutes = require('./routes/userRoutes');
// const reviewRoutes = require('./routes/reviewRoutes');
// const userR = require('./routes/users');
// const cartRoutes = require('./routes/cartRoutes');
// const orderRoutes = require('./routes/orderRoutes');
// const supercoinRoutes = require('./routes/supercoinRoutes');
// const adminOrderRoutes = require('./routes/adminOrderRoutes');
// const chatRoutes = require('./routes/chatRoutes');
// const warehouseRoutes = require('./routes/warehouseRoutes');
// const locationRoutes = require('./routes/locationRoutes');
// const brandRoutes = require('./routes/brandRoutes');
// const stockInwardRoutes = require('./routes/stockInwardRoutes');
// const supplierRoutes = require('./routes/supplierRoutes');
// const notificationRoutes = require('./routes/notificationRoutes');


// const app = express();

// // ✅ CORS — must be FIRST before any routes or static files
// app.use(cors({
//   origin: '*',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));
// app.options('*', cors()); // Handle preflight for all routes

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Ensure uploads directory exists
// const uploadDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Connect MongoDB
// connectDB();

// // Also add this for better static file handling
// app.use('/uploads/banners', express.static(path.join(__dirname, 'uploads', 'banners')));
// // Serve static uploads
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/uploads/popups', express.static(path.join(__dirname, 'uploads', 'popups')));

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/categories', categoryRoutes);
// app.use('/api/wishlist', wishlistRoutes);
// app.use('/api/checkout', checkoutRoutes);
// app.use('/api/payments', paymentRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api', reviewRoutes);
// app.use('/api/users', userR);
// app.use('/api/cart', cartRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/supercoins', supercoinRoutes);
// app.use('/api/adminorder', adminOrderRoutes);
// app.use('/api/chats', chatRoutes);
// app.use('/api/warehouses', warehouseRoutes);
// app.use('/api/locations', locationRoutes);
// app.use('/api/brands', brandRoutes);
// app.use('/api/stock-inward', stockInwardRoutes)
// app.use('/api/suppliers', supplierRoutes);
// app.use('/api/slides', require('./routes/slideRoutes'));
// app.use('/api/clients', require('./routes/clientRoutes'));
// app.use('/api/popups', require('./routes/popupRoutes'));
// app.use('/api/notifications', notificationRoutes);

// // Health check route
// app.get('/api/health', (req, res) => {
//   res.json({
//     status: 'OK',
//     message: 'Server is running successfully',
//     timestamp: new Date().toISOString()
//   });
// });

// // Root route
// app.get('/', (req, res) => {
//   res.json({
//     message: 'Welcome to the API Server',
//     endpoints: {
//       auth: '/api/auth',
//       products: '/api/products',
//       chats: '/api/chats',
//       // ... add other endpoints
//     }
//   });
// });

// // Initialize HTTP server
// const server = http.createServer(app);

// // Initialize Socket.IO
// socket.init(server); // Call after server is created

// // Start server
// const PORT = process.env.PORT || 5001;
// server.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`📱 Health check: http://localhost:${PORT}/api/health`);
// });

// module.exports = app;







const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const http = require('http');
require('dotenv').config();

const socket = require('./socket');
const connectDB = require('./config/db');

// Route imports
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categories');
const wishlistRoutes = require('./routes/wishlist');
const checkoutRoutes = require('./routes/checkoutRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const userR = require('./routes/users');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const supercoinRoutes = require('./routes/supercoinRoutes');
const adminOrderRoutes = require('./routes/adminOrderRoutes');
const chatRoutes = require('./routes/chatRoutes');
const warehouseRoutes = require('./routes/warehouseRoutes');
const locationRoutes = require('./routes/locationRoutes');
const brandRoutes = require('./routes/brandRoutes');
const stockInwardRoutes = require('./routes/stockInwardRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const slideRoutes = require('./routes/slideRoutes');
const clientRoutes = require('./routes/clientRoutes');
const popupRoutes = require('./routes/popupRoutes');

// Initialize Express
const app = express();

// Trust Render's reverse proxy
app.set('trust proxy', 1);

// CORS configuration
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
};

// CORS middleware - handles OPTIONS preflight automatically
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({
  extended: true,
  limit: '50mb'
}));

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Ensure individual upload directories exist
const uploadSubDirs = [
  'banners',
  'popups'
];

uploadSubDirs.forEach((dir) => {
  const fullPath = path.join(uploadDir, dir);

  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

// Serve uploaded files
app.use('/uploads', express.static(uploadDir));

// Connect MongoDB
connectDB();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/users', userRoutes);
app.use('/api', reviewRoutes);
app.use('/api/users', userR);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/supercoins', supercoinRoutes);
app.use('/api/adminorder', adminOrderRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/stock-inward', stockInwardRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/slides', slideRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/popups', popupRoutes);
app.use('/api/notifications', notificationRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'OK',
    message: 'Server is running successfully',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the API Server',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      products: '/api/products',
      categories: '/api/categories',
      wishlist: '/api/wishlist',
      checkout: '/api/checkout',
      payments: '/api/payments',
      users: '/api/users',
      cart: '/api/cart',
      orders: '/api/orders',
      chats: '/api/chats',
      warehouses: '/api/warehouses',
      locations: '/api/locations',
      brands: '/api/brands',
      stockInward: '/api/stock-inward',
      suppliers: '/api/suppliers',
      slides: '/api/slides',
      clients: '/api/clients',
      popups: '/api/popups',
      notifications: '/api/notifications'
    }
  });
});

// 404 handler - no wildcard route required
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API route not found',
    path: req.originalUrl
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
socket.init(server);

// Start server
const PORT = process.env.PORT || 5001;

server.listen(PORT, '0.0.0.0', () => {
  console.log('====================================');
  console.log('🚀 VMS Backend Server Started');
  console.log(`🌐 Port: ${PORT}`);
  console.log('📡 Socket.IO: Initialized');
  console.log(`❤️ Health: /api/health`);
  console.log('====================================');
});

// Handle server errors
server.on('error', (error) => {
  console.error('HTTP Server Error:', error);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down server...');

  server.close(() => {
    console.log('HTTP server closed.');
    process.exit(0);
  });
});

module.exports = app;
