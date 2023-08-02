const User = require("../models/User");
const CryptoJS = require("crypto-js");
const { createError } = require("../error");
const jwt = require("jsonwebtoken");

exports.register = async function (req, res) {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET
      ).toString(),
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.login = async function (req, res, next) {
  try {
    // Finding the user
    const user = await User.findOne({ username: req.body.username });
    console.log(user);
    // If user doesn't exist
    // if (!user) return res.status(401).json("Wrong Credentials");
    if (!user) return next(createError(401, "Wrong Credentials"));
    // Unhash the password utf-8 means to this encoding i.e. using non english characters

    const decrypted = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET
    ).toString(CryptoJS.enc.Utf8);
    // if passwords don't match
    // req.body.password !== latest && res.status(401).json("Wrong Cr3edentials");
    if (req.body.password !== decrypted)
      return next(createError(401, "Wrong Credentials"));

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT,
      { expiresIn: "3d" }
    );

    // In case everthing went right just send the user ..others will not send other values a separate object
    const { password, ...others } = user._doc;
    res.status(201).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
};
