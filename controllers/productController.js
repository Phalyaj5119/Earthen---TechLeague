const { Product, Category, ProductCategory, ProductReview } = require("../models");

// Get all products
exports.getAllProducts = async (req, res) => {
try {
const products = await Product.findAll({
include: {
model: Category,
through: { attributes: [] } // We don't need to show the relation table
}
});
res.status(200).json(products);
} catch (err) {
res.status(500).json({ message: "Error fetching products", error: err });
}
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
const { id } = req.params;
try {
const product = await Product.findByPk(id, {
include: [
{ model: Category, through: { attributes: [] } },
{ model: ProductReview }
]
});
if (!product) {
return res.status(404).json({ message: "Product not found" });
}
res.status(200).json(product);
} catch (err) {
res.status(500).json({ message: "Error fetching product", error: err });
}
};


// Create a new product
exports.createProduct = async (req, res) => {
    const { name, description, price, stock, category, imageUrl } = req.body;
  
    try {
      // Step 1: Create the product
      const newProduct = await Product.create({
        name,
        description,
        price,
        stock,
        category,
        imageUrl
      });
  
      // Step 2: If category is provided, associate it with the product
      if (category) {
        // Assuming 'category' is the category ID
        const categoryExists = await Category.findByPk(category);
        if (!categoryExists) {
          return res.status(400).json({ message: "Category not found" });
        }
  
        // Linking the product to the category via the ProductCategory junction table
        await ProductCategory.create({
          productId: newProduct.id,
          categoryId: category
        });
      }
  
      // Step 3: Return the newly created product
      res.status(201).json(newProduct);
  
    } catch (err) {
      // Enhanced error logging to capture more details
      console.error("Error creating product:", err); // Log the full error
      res.status(500).json({
        message: "Error creating product",
        error: err.message || err // Include the actual error message in the response
      });
    }
  };
  

// Update product by ID
exports.updateProduct = async (req, res) => {
const { id } = req.params;
const { name, description, price, stock, category, imageUrl } = req.body;
try {
const product = await Product.findByPk(id);
if (!product) {
return res.status(404).json({ message: "Product not found" });
}
await product.update({ name, description, price, stock, imageUrl });
if (category) {
await ProductCategory.update({ categoryId: category }, { where: { productId: id } });
}
res.status(200).json(product);
} catch (err) {
res.status(500).json({ message: "Error updating product", error: err });
}
};

// Delete product
exports.deleteProduct = async (req, res) => {
const { id } = req.params;
try {
const product = await Product.findByPk(id);
if (!product) {
return res.status(404).json({ message: "Product not found" });
}
await product.destroy();
res.status(200).json({ message: "Product deleted" });
} catch (err) {
res.status(500).json({ message: "Error deleting product", error: err });
}
};