const { Product, Category } = require('../models');
const { Op } = require('sequelize');

// Get filtered products (by category, color, price)
exports.getFilteredProducts = async (req, res) => {
  const { category, color, price } = req.query;

  try {
    let where = {};

    // Category filter
    if (category) {
      const cat = await Category.findOne({ where: { name: category } });
      if (cat) {
        where.categoryId = cat.id;
      } else {
        return res.status(404).json({ message: "Category not found" });
      }
    }

    // Color filter
    if (color) {
      where.color = color;
    }

    // Price filter (expects format: "min-max")
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
    console.error("Error fetching filtered products:", err);
    res.status(500).json({ message: "Failed to retrieve products" });
  }
};

// Get all products (without filter, used for the carousel)
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: ['id', 'name', 'price', 'description', 'imageUrl'],
      include: [{ model: Category }],
    });
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Failed to retrieve products" });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id, {
      include: [{ model: Category }],
    });

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ message: "Failed to retrieve product" });
  }
};

exports.createProduct = async (req, res) => {
  const { name, description, price, imageUrl, color, categoryId } = req.body;

  if (!name || !price || !imageUrl || !categoryId) {
    return res.status(400).json({ 
      success: false,
      message: "Missing required fields",
      required: ['name', 'price', 'imageUrl', 'categoryId']
    });
  }

  try {
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ 
        success: false,
        message: "Category not found" 
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      imageUrl,
      color,
      categoryId,
    });

    return res.status(201).json({
      success: true,
      data: product,
      message: "Product created successfully"
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ 
      success: false,
      message: "Failed to create product",
      error: error.message 
    });
  }
};

// Update product by ID
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Validate category if being updated
    if (updates.categoryId) {
      const category = await Category.findByPk(updates.categoryId);
      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Category not found"
        });
      }
    }

    await product.update(updates);
    return res.json({
      success: true,
      data: product,
      message: "Product updated successfully"
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: error.message
    });
  }
};

// Delete product by ID
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    await product.destroy();
    return res.json({
      success: true,
      message: "Product deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: error.message
    });
  }
};
