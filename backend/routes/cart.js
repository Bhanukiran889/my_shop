const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { verifyToken } = require('../middleware/auth');

// Get user's cart
router.get('/', verifyToken, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
  res.json(cart);
});

// Add/update item in cart
router.post('/', verifyToken, async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) cart = new Cart({ userId: req.user.id, items: [] });

  const itemIndex = cart.items.findIndex((i) => i.productId.toString() === productId);
  if (itemIndex > -1) cart.items[itemIndex].quantity = quantity;
  else cart.items.push({ productId, quantity });

  await cart.save();
  res.json(cart);
});

// Remove item
router.delete('/:productId', verifyToken, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });
  cart.items = cart.items.filter((item) => item.productId.toString() !== req.params.productId);
  await cart.save();
  res.json(cart);
});

module.exports = router;
