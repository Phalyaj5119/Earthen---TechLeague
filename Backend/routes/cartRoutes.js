const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', verifyToken, cartController.getUserCart);
router.post('/add', verifyToken, cartController.addToCart);
router.delete('/remove/:productId', verifyToken, cartController.removeFromCart);
router.put('/update-quantity', verifyToken, cartController.updateQuantity);

module.exports = router;
