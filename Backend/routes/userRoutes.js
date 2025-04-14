const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMemory');
const userController = require('../controllers/userController'); // Import userController once

const { verifyToken } = require('../middlewares/authMiddleware');

// POST route to register a user & upload profile image
// Assuming you're uploading as a file
router.post('/signup', userController.signupUser);
router.post('/login', userController.loginUser);


// Protected user routes
router.get('/order-history', verifyToken, userController.getOrderHistory);
router.get('/track-order/:orderId', verifyToken, userController.trackOrder);
router.get('/wallet', verifyToken, userController.getWalletDetails);
router.get('/profile', verifyToken, userController.getUserProfile);
router.put('/profile', verifyToken, userController.updateUserProfile);

module.exports = router;
