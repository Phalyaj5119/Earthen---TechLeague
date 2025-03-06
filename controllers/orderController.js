const { Order, OrderItem, Product } = require("../models");

// Create a new order
exports.createOrder = async (req, res) => {
const { customerId, products } = req.body; // products will be an array of { productId, quantity }
try {
const newOrder = await Order.create({ customerId, totalAmount: 0 });
let totalAmount = 0;
// Add each product to the order
for (let productData of products) {
  const product = await Product.findByPk(productData.productId);
  if (!product || product.stock < productData.quantity) {
    return res.status(400).json({ message: "Insufficient stock" });
  }

  await OrderItem.create({
    orderId: newOrder.id,
    productId: productData.productId,
    quantity: productData.quantity,
    price: product.price
  });

  totalAmount += product.price * productData.quantity;
  product.stock -= productData.quantity;
  await product.save();
}

newOrder.totalAmount = totalAmount;
await newOrder.save();
res.status(201).json(newOrder);
} catch (err) {
    res.status(500).json({ message: "Error creating order", error: err });
    }
    };