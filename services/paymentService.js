const Payment = require('../models/paymentModel');

exports.createPayment = async (userId, amount) => {
  try {
    const newPayment = new Payment({ userId, amount });
    await newPayment.save();
    return newPayment;
  } catch (error) {
    throw new Error('Error creating payment');
  }
};
