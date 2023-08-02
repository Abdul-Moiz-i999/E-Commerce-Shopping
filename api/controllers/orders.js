const { createError } = require("../error");
const Order = require("../models/Order");

const createOrder = async (req, res, next) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    next(createError(500, err));
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(updatedOrder);
  } catch (err) {
    next(createError(500, err));
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    return res.status(200).json("Order has been deleted");
  } catch (err) {
    next(createError(500, err));
  }
};

// User Can have more than one orders
const getOrders = async (req, res, next) => {
  try {
    const order = await Order.find({ userId: req.params.userId });
    return res.status(200).json(order);
  } catch (err) {
    next(500, err);
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    return res.status(200).json(orders);
  } catch (err) {
    next(500, err);
  }
};

const getIncomeStats = async (req, res, next) => {
  const date = new Date();
  const lastMonth = new Date(
    date.setMonth(date.getMonth() - 1 === 0 ? 12 : date.getMonth() - 1)
  );
  const prevMonthThanLast = new Date(
    new Date().setMonth(
      lastMonth.getMonth() - 1 === 0 ? 12 : lastMonth.getMonth() - 1
    )
  );
  // console.log(lastMonth);
  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: prevMonthThanLast } } },
      { $project: { month: { $month: "$createdAt" }, sales: "$amount" } },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    console.log("income");
    res.status(200).json(income);
  } catch (err) {
    next(createError(500, err));
  }
};

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrders,
  getAllOrders,
  getIncomeStats,
};
