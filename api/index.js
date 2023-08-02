// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");

dotenv.config();
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connection Successful."))
  .catch((err) => console.log(err));

const app = express();

app.get("/api/test", () => {
  console.log("test is working");
});

// Allow us to use JSON using POSTMAN
app.use(express.json());
app.use(cors());

// Use plural words as a REST Standard
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

// Using error
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something Went Wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(5000, () => {
  console.log("Started Listening on PORT 5000");
});
