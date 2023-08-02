const CryptoJS = require("crypto-js");
const { createError } = require("../error");
const User = require("../models/User");

const modifyUser = async (req, res, next) => {
  console.log("first");
  if (req.body.password)
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET
    ).toString();
  console.log("here");
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(updatedUser);
  } catch (err) {
    next(createError(500), err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json("User has Successfully been Deleted.");
  } catch (err) {
    next(createError(500, err));
  }
};

// For finding the user i.e. only could be done by the admin
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    return res.status(200).json(others);
  } catch (err) {
    next(createError(500, err));
  }
};

// Getting all the users
const getAllUsers = async (req, res, next) => {
  // Getting query if any
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(2)
      : await User.find();

    // Remove the password field from the users.
    const newUsers = users.map((user) => {
      const { password, ...others } = user._doc;
      return others;
    });

    return res.status(200).json(newUsers);
  } catch (err) {
    next(createError(500, err));
  }
};

const getStats = async (req, res, next) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      {
        $match: { createdAt: { $gte: lastYear } },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      { $group: { _id: "$month", total: { $sum: 1 } } },
    ]);

    console.log("here");
    return res.status(200).json(data);
  } catch (err) {
    next(createError(500, err));
  }
};

module.exports = { modifyUser, deleteUser, getUser, getAllUsers, getStats };
