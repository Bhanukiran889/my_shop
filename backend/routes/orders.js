
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const { verifyToken } = require('../middleware/auth');

// Create order from cart
router.post('/', verifyToken, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });
  if (!cart || cart.items.length === 0) return res.status(400).json({ message: 'Cart is empty' });

  const totalPrice = cart.items.reduce((sum, item) => sum + item.quantity * 100, 0); // Assume ₹100 per item

  const order = new Order({
    userId: req.user.id,
    items: cart.items,
    totalPrice,
  });

  await order.save();
  await Cart.deleteOne({ userId: req.user.id });

  res.status(201).json(order);
});

module.exports = router;
