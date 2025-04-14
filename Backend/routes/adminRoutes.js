const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// All routes protected by token + admin check
router.use(verifyToken, isAdmin);

// User routes
router.get('/users', adminController.getAllUsers);
router.post('/users', adminController.addUser);
router.delete('/users/:id', adminController.deleteUser);

// Category / Products
router.get('/products-by-category', adminController.getProductsByCategory);

// Orders
router.get('/orders', adminController.getAllOrders);
router.put('/orders/:id', adminController.updateOrderStatus);

// Payments
router.get('/payment-history', adminController.getPaymentHistory);

module.exports = router;
