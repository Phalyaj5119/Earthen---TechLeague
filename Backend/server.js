console.log('✅ app.js is running...');

console.log('✅ Loading Express...');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize } = require('./models'); // Assuming models are initialized correctly
const path = require('path');
const http = require('http');

console.log('✅ Loading environment variables...');
dotenv.config();

const app = express();

console.log('✅ Middleware setup...');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log whenever an image is requested
app.use('/images', (req, res, next) => {
  console.log(`[IMAGE REQUEST] Requested: ${req.url}`);
  console.log(`[IMAGE PATH] Resolved path:`, path.join(__dirname, '../frontend/public/images', req.url));
  next();
});

// Serve images from the frontend public/images folder
app.use('/images', express.static(path.join(__dirname, '../frontend/public/images')));

// Test endpoint
app.get('/test-server', (req, res) => {
  res.status(200).send('Server is working');
});

// Import and attach routes
console.log('✅ Importing routes...');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const authRoutes = require('./routes/authRoutes');

console.log('✅ Attaching routes...');
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/user/cart', cartRoutes);
app.use('/api/user/wishlist', wishlistRoutes);
app.use('/api/user/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/category', categoryRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('API is running...');
});

console.log('✅ App setup done.');

const DEFAULT_PORT = process.env.PORT || 8081;

const startServer = async (port = DEFAULT_PORT) => {
  try {
    console.log('⏳ Connecting to the database...');
    await sequelize.authenticate();
    console.log('✅ Database connected');

    await sequelize.sync();
    console.log('📦 Models synced');

    const server = http.createServer(app);

    server.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.warn(`⚠️ Port ${port} in use. Trying port ${port + 1}...`);
        startServer(port + 1); 
      } else {
        console.error('❌ Server error:', err);
        process.exit(1);
      }
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();

console.log('✅ App setup done.');

module.exports = app;
