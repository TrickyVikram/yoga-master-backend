const Payment = require('../models/paymentModel');
const paymentService = require('../services/paymentService');

// Create a new payment
exports.createPayment = async (req, res) => {
  const { userId, amount } = req.body;
  
  try {
    const payment = await paymentService.createPayment(userId, amount);
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Error processing payment' });
  }
};
