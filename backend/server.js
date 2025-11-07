const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const http = require('http');
require('dotenv').config();
const socket = require('./socket'); // Only import once
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


const app = express();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect MongoDB
connectDB();

// Also add this for better static file handling
app.use('/uploads/banners', express.static(path.join(__dirname, 'uploads', 'banners')));
// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
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
app.use('/api/stock-inward', stockInwardRoutes)
app.use('/api/suppliers', supplierRoutes);
app.use('/api/slides', require('./routes/slideRoutes'));
app.use('/api/clients', require('./routes/clientRoutes')); 


// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running successfully',
    timestamp: new Date().toISOString()
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the API Server',
    endpoints: {
      auth: '/api/auth',
      products: '/api/products',
      chats: '/api/chats',
      // ... add other endpoints
    }
  });
});

// Initialize HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
socket.init(server); // Call after server is created

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
  