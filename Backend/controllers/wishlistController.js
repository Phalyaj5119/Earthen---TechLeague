// controllers/wishlistController.js
const { WishlistItem, Product } = require('../models');

// Get all wishlist items for the logged-in user
exports.getWishlist = async (req, res) => {
  const userId = req.user.id;
  try {
    const wishlist = await WishlistItem.findAll({
      where: { userId },
      include: [{ model: Product }]
    });
    res.json(wishlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch wishlist" });
  }
};

// Add a product to the wishlist
exports.addToWishlist = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;
  try {
    await WishlistItem.findOrCreate({ where: { userId, productId } });
    res.json({ message: "Added to wishlist" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add to wishlist" });
  }
};

// Remove a product from the wishlist
exports.removeFromWishlist = async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.productId;
  try {
    await WishlistItem.destroy({ where: { userId, productId } });
    res.json({ message: "Removed from wishlist" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to remove from wishlist" });
  }
};

// Get a single product by ID (optional for wishlist)
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch product" });
  }
};
