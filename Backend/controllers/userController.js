const { Order, OrderItem, Product, User, WalletTransaction } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');


// Signup user
exports.signupUser = async (req, res) => {
  try {
    const { name, email, password, contact, address } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      contact,
      address
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ message: 'Signup successful', token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Signup failed' });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({ message: 'Login successful', token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed' });
  }
};

// Get user order history
exports.getOrderHistory = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: OrderItem,
          include: {
            model: Product,
            attributes: ['name', 'imageUrl']
          }
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not fetch order history" });
  }
};

// Track specific order
exports.trackOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({
      where: {
        id: orderId,
        userId: req.user.id
      },
      attributes: ['id', 'status', 'createdAt']
    });

    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching order status' });
  }
};

// Get wallet balance and transactions
exports.getWalletDetails = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['walletBalance']
    });

    const transactions = await WalletTransaction.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });

    res.json({ balance: user.walletBalance, transactions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Unable to fetch wallet details' });
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'email', 'contact', 'address', 'profilePicture']
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { name, contact, address, profilePicture } = req.body;
    await User.update(
      { name, contact, address, profilePicture },
      { where: { id: req.user.id } }
    );
    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update profile' });
  }
};
