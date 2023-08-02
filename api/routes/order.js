const {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrders,
  getAllOrders,
  getIncomeStats,
} = require("../controllers/orders");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

// Order matters mannn
router.get("/income", verifyTokenAndAdmin, getIncomeStats);

// Any User can place an order
router.post("/", verifyToken, createOrder);

// Only Admin can update Order
router.put("/:id", verifyTokenAndAdmin, updateOrder);

// Delete
router.delete("/:id", verifyTokenAndAdmin, deleteOrder);

// Get user orders (can have more than one orders)
router.get("/:userId", verifyTokenAndAuthorization, getOrders);

router.get("/", verifyTokenAndAdmin, getAllOrders);

module.exports = router;
