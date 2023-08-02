const router = require("express").Router();

const handleStripe = require("../controllers/stripe");

router.post("/payment", handleStripe);

module.exports = router;
