const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET all products (used for carousel)
router.get('/all', productController.getAllProducts);

// GET filtered products (with optional query params: category, color, price)
router.get('/', productController.getFilteredProducts);

// GET a single product by ID
router.get('/:id', productController.getProductById);

// POST: Create a new product
router.post('/', productController.createProduct);

// PUT: Update a product by ID
router.put('/:id', productController.updateProduct);

// DELETE: Remove a product by ID
router.delete('/:id', productController.deleteProduct);

module.exports = router;
