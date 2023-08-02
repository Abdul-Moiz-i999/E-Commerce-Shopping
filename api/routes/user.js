const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const {
  modifyUser,
  deleteUser,
  getUser,
  getAllUsers,
  getStats,
} = require("../controllers/users");

// Changing the user
router.put("/:id", verifyTokenAndAuthorization, modifyUser);

// Deleting the user
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);

// Get a user by id (only by admin)
router.get("/find/:id", verifyTokenAndAdmin, getUser);

// Get all users
router.get("/", verifyTokenAndAdmin, getAllUsers);

// Get stats of registered users for last year
router.get("/stats", verifyTokenAndAdmin, getStats);

module.exports = router;
