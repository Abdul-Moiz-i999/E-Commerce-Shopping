const Cart = require("../models/Cart");

const createCart = async (req, res, next) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    next(createError(500, err));
  }
};

const updateCart = async (req, res, next) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(updatedCart);
  } catch (err) {
    next(createError(500, err));
  }
};

const deleteCart = async (req, res, next) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    return res.status(200).json("Cart has been deleted");
  } catch (err) {
    next(createError(500, err));
  }
};

const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    return res.status(200).json(cart);
  } catch (err) {
    next(500, err);
  }
};

const getAllCarts = async (req, res, next) => {
  try {
    const carts = await Cart.find();
    return res.status(200).json(carts);
  } catch (err) {
    next(500, err);
  }
};

module.exports = { createCart, updateCart, deleteCart, getCart, getAllCarts };
