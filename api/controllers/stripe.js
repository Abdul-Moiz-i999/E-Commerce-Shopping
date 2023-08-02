const { createError } = require("../error");
const dotenv = require("dotenv");
// const Stripe = require("stripe");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE);
// const stripe = Stripe(
//   "sk_test_51MaiwfGW6HHrMnj5ufxqg8kVHDGTqKmt0opmhAXli5c1TyMN0DQRiI5u36RdtiYohLgJ62opA0X30hYOfV7ETWMu00WpWZsPv2"
// );
const handlePayment = (req, res, next) => {
  console.log("In Stripe");
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) res.status(500).json(stripeErr);
      else res.status(200).json(stripeRes);
    }
  );
};

module.exports = handlePayment;
