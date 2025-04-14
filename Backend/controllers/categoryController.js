const db = require('../models');
const asyncHandler = require('express-async-handler');

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await db.Category.findAll({
        include: [{
            model: db.Product,
            as: 'products'
        }]
    });
    res.json(categories);
});

// @desc    Get products by category
// @route   GET /api/categories/:id/products
// @access  Public
const getProductsByCategory = asyncHandler(async (req, res) => {
    const category = await db.Category.findByPk(req.params.id, {
        include: [{
            model: db.Product,
            as: 'products'
        }]
    });

    if (!category) {
        res.status(404);
        throw new Error('Category not found');
    }

    res.json(category.products);
});

// @desc    Create new category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;

    const category = await db.Category.create({ name });

    res.status(201).json(category);
});

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;

    const category = await db.Category.findByPk(req.params.id);
    if (category) {
        const updatedCategory = await category.update({
            name: name || category.name
        });
        res.json(updatedCategory);
    } else {
        res.status(404);
        throw new Error('Category not found');
    }
});

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
    const category = await db.Category.findByPk(req.params.id);
    if (category) {
        await category.destroy();
        res.json({ message: 'Category deleted' });
    } else {
        res.status(404);
        throw new Error('Category not found');
    }
});

module.exports = {
    getAllCategories,
    getProductsByCategory,
    createCategory,
    updateCategory,
    deleteCategory
};
