const { createError } = require("../error");
const Product = require("../models/Product");

const createProduct = async (req, res, next) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    next(createError(500, err));
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(updatedProduct);
  } catch (err) {
    next(createError(500, err));
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json("Product has been deleted");
  } catch (err) {
    next(createError(500, err));
  }
};

const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.status(200).json(product);
  } catch (err) {
    next(500, err);
  }
};

const getAllProducts = async (req, res, next) => {
  const queryNew = req.query.new;
  const qCategory = req.query.category;
  let products;
  try {
    if (queryNew) products = await Product.find().sort({ _id: -1 }).limit(1);
    else if (qCategory)
      products = await Product.find({ categories: qCategory });
    else products = await Product.find();

    return res.status(200).json(products);
  } catch (err) {
    next(createError(500, err));
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
};
