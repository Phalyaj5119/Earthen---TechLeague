const { CartItem, Product } = require('../models');

// GET user cart
exports.getUserCart = async (req, res) => {
  const userId = req.user.id;
  try {
    const cartItems = await CartItem.findAll({
      where: { userId },
      include: [{ model: Product }],
    });
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch cart items', error: err.message });
  }
};

// ADD item to cart
exports.addToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  try {
    const [item, created] = await CartItem.findOrCreate({
      where: { userId, productId },
      defaults: { quantity: quantity || 1 }
    });

    if (!created) {
      item.quantity += quantity || 1;
      await item.save();
    }

    res.json({ message: 'Item added to cart', item });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add to cart', error: err.message });
  }
};

// REMOVE item from cart
exports.removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;

  try {
    const deleted = await CartItem.destroy({
      where: { userId, productId }
    });

    if (deleted) {
      res.json({ message: 'Item removed from cart' });
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove item', error: err.message });
  }
};

// CHECKOUT cart (clear all)
exports.checkoutUserCart = async (req, res) => {
  const userId = req.user.id;
  try {
    await CartItem.destroy({ where: { userId } });
    res.json({ message: 'Checkout successful. Cart has been cleared.' });
  } catch (err) {
    res.status(500).json({ message: 'Checkout failed', error: err.message });
  }
};

// Remove item completely from cart
exports.removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;

  await CartItem.destroy({ where: { userId, productId } });
  res.json({ message: 'Item removed from cart' });
};

// Update item quantity (increment or decrement)
exports.updateQuantity = async (req, res) => {
  const userId = req.user.id;
  const { productId, action } = req.body;

  const item = await CartItem.findOne({ where: { userId, productId } });
  if (!item) return res.status(404).json({ message: "Item not found" });

  if (action === 'increment') item.quantity += 1;
  else if (action === 'decrement') item.quantity = Math.max(1, item.quantity - 1);

  await item.save();
  res.json(item);
};