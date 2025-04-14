const bcrypt = require('bcrypt');
const { User, Product, Category, Payment, Order } = require('../models');

// USERS
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ where: { role: 'user' } });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users." });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword, role });
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ message: "Error creating user." });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user" });
  }
};

// PRODUCTS by CATEGORY
exports.getProductsByCategory = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: {
        model: Product,
        attributes: ['id', 'name', 'price', 'imageUrl'],
      }
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products by category" });
  }
};

// PAYMENT HISTORY
exports.getPaymentHistory = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      include: [
        { model: User, attributes: ['name', 'email'] },
        { model: Order, attributes: ['id', 'status'] }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch payment history" });
  }
};

// ORDERS
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [{ model: User, attributes: ['name', 'email'] }]
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await Order.update({ status }, { where: { id } });
    res.json({ message: "Order status updated" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update order status" });
  }
};
