const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// Public routes
router.get('/', categoryController.getAllCategories);
router.get('/:id/products', categoryController.getProductsByCategory);

// Admin protected routes
router.use(verifyToken, isAdmin);
router.post('/', categoryController.createCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
