const Cart = require('../models/cartModel');

// Add item to cart
exports.addItemToCart = async (req, res) => {
  const { userId, classId } = req.body;
  
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      const newCart = new Cart({ userId, classes: [classId] });
      await newCart.save();
      res.status(201).json(newCart);
    } else {
      cart.classes.push(classId);
      await cart.save();
      res.status(200).json(cart);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart' });
  }
};
