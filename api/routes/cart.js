const {
  createCart,
  updateCart,
  deleteCart,
  getCart,
  getAllCarts,
} = require("../controllers/carts");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

// Any User can create a cart
router.post("/", verifyToken, createCart);

// Any User can Update it's Cart
router.put("/:id", verifyTokenAndAuthorization, updateCart);

// Delete
router.delete("/:id", verifyTokenAndAuthorization, deleteCart);

// Get user cart
router.get("/:userId", verifyTokenAndAuthorization, getCart);

router.get("/", verifyTokenAndAdmin, getAllCarts);

module.exports = router;
