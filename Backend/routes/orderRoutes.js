const express = require('express');
const router = express.Router();
const {
  getUserOrders,
  getUserOrderHistory,
  getUserActiveOrders
} = require('../controllers/orderController');
//const authenticate = require('../middlewares/authMiddleware');
const { verifyToken } = require('../middlewares/authMiddleware');

// User Orders
router.get('/user/orders', verifyToken, getUserOrders);
router.get('/user/order-history', verifyToken, getUserOrderHistory);
router.get('/user/active-orders', verifyToken, getUserActiveOrders);


module.exports = router;
