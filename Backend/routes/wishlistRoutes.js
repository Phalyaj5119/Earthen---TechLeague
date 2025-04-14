// routes/wishlistRoutes.js
const express = require('express');
const router = express.Router();

const wishlistController = require('../controllers/wishlistController');
const { verifyToken } = require('../middlewares/authMiddleware'); // Adjust the path if needed

router.get('/', verifyToken, wishlistController.getWishlist);
router.post('/', verifyToken, wishlistController.addToWishlist);
router.delete('/:productId', verifyToken, wishlistController.removeFromWishlist);

module.exports = router;


