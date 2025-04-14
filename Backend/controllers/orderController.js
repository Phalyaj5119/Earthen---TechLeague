// controllers/orderController.js
const { CartItem, Order, OrderItem, Product } = require('../models');

exports.getUserOrders = async (req, res) => {
  const userId = req.user.id;
  try {
    const orders = await Order.findAll({
      where: { userId },
      include: [{
        model: OrderItem,
        include: [Product]
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json(orders.map(order => ({
      id: order.id,
      status: order.status,
      totalAmount: order.totalAmount,
      createdAt: order.createdAt,
      items: order.OrderItems.map(item => ({
        id: item.id,
        quantity: item.quantity,
        product: item.Product
      }))
    })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

exports.getUserOrderHistory = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.user.id,
        status: ['Delivered', 'Returned', 'Cancelled']
      },
      include: [{
        model: OrderItem,
        include: [Product]
      }]
    });

    res.json(orders.map(order => ({
      id: order.id,
      status: order.status,
      totalAmount: order.totalAmount,
      createdAt: order.createdAt,
      items: order.OrderItems.map(item => ({
        id: item.id,
        quantity: item.quantity,
        product: item.Product
      }))
    })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get order history.' });
  }
};

exports.getUserActiveOrders = async (req, res) => {
  const activeStatuses = ['Packed', 'In Transit'];
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.user.id,
        status: activeStatuses
      },
      include: [{
        model: OrderItem,
        include: [Product]
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json(orders.map(order => ({
      id: order.id,
      status: order.status,
      createdAt: order.createdAt,
      items: order.OrderItems.map(item => ({
        id: item.id,
        quantity: item.quantity,
        product: item.Product
      }))
    })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Tracking error' });
  }
};

exports.checkoutUserCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cartItems = await CartItem.findAll({
      where: { userId },
      include: [Product]
    });

    if (!cartItems.length) {
      return res.status(400).json({ message: "Cart is empty!" });
    }

    const totalAmount = cartItems.reduce((sum, item) =>
      sum + item.Product.price * item.quantity, 0
    );

    const order = await Order.create({
      userId,
      status: 'Packed',
      totalAmount
    });

    await Promise.all(cartItems.map(item =>
      OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity
      })
    ));

    await CartItem.destroy({ where: { userId } });

    res.json({ message: 'Order placed successfully', orderId: order.id });
  } catch (err) {
    console.error("Checkout Error:", err);
    res.status(500).json({ message: "Checkout failed" });
  }
};

