// controllers/paymentController.js
const { Payment } = require('../models');

exports.getAllPayments = async (req, res) => {
  const payments = await Payment.findAll({ order: [['createdAt', 'DESC']] });
  res.json(payments);
};
