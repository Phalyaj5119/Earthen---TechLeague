// productController.js
const { Product, Category } = require('../models');
const { Op } = require('sequelize');
const path = require('path');
const fs = require('fs');


//create product
// controllers/productController.js

const createProduct = async (req, res) => {
  try {
    const { name, description, price, color, categoryId, imageBase64 } = req.body;

    if (!name || !price || !categoryId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    // If an image is provided as base64, we store it as a string in the DB or use it as necessary
    let imageUrl = null;
    if (imageBase64) {
      // Ensure the base64 string is in the correct format
      const matches = imageBase64.match(/^data:(.+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        return res.status(400).json({ message: 'Invalid base64 image format' });
      }

      // Image is base64 string, you can save it in the database as a string or process as needed
      imageUrl = imageBase64; // Save the base64 string
    }

    // Create the product in the database
    const product = await Product.create({
      name,
      description,
      price,
      color,
      categoryId,
      imageUrl, // Store the base64 string
    });

    return res.status(201).json({
      success: true,
      data: product,
      message: 'Product created successfully',
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return res.status(500).json({ success: false, message: 'Failed to create product', error: error.message });
  }
};

// Get filtered products (by category, color, price)
const getFilteredProducts = async (req, res) => {
  const { category, color, price } = req.query;

  try {
    let where = {};

    if (category) {
      const cat = await Category.findOne({ where: { name: category } });
      if (cat) {
        where.categoryId = cat.id;
      } else {
        return res.status(404).json({ message: 'Category not found' });
      }
    }

    if (color) {
      where.color = color;
    }

    if (price) {
      const [min, max] = price.split('-');
      if (!min || !max) {
        return res.status(400).json({ message: "Invalid price format. Use 'min-max'" });
      }
      where.price = {
        [Op.between]: [Number(min), Number(max)],
      };
    }

    const products = await Product.findAll({ where });
    res.json(products);
  } catch (err) {
    console.error('Error fetching filtered products:', err);
    res.status(500).json({ message: 'Failed to retrieve products' });
  }
};

// Get all products (without filter, used for the carousel)
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: ['id', 'name', 'price', 'description', 'imageUrl'],
      include: [{ model: Category }],
    });
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Failed to retrieve products' });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id, {
      include: [{ model: Category }],
    });

    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.json(product);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ message: 'Failed to retrieve product' });
  }
};


// Update product by ID
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  // If there is a base64 image provided
  if (req.body.imageBase64) {
    const matches = req.body.imageBase64.match(/^data:(.+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ message: 'Invalid base64 image format' });
    }

    const mimeType = matches[1];
    const base64Data = matches[2];
    const extension = mimeType.split('/')[1];
    const fileName = `image-${Date.now()}.${extension}`;
    const filePath = path.join(__dirname, '..', 'uploads', fileName);

    // Write the base64 data to a file
    fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
    updates.imageUrl = fileName;  // Store the image file name
  }

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    if (updates.categoryId) {
      const category = await Category.findByPk(updates.categoryId);
      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Category not found',
        });
      }
    }

    await product.update(updates);

    return res.json({
      success: true,
      data: product,
      message: 'Product updated successfully',
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update product',
      error: error.message,
    });
  }
};

// Delete product by ID
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    await product.destroy();
    return res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete product',
      error: error.message,
    });
  }
};

module.exports = {
  getFilteredProducts,
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};