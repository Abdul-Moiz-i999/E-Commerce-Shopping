const {
  createProduct,
  updateProduct,
  getAllProducts,
  getProduct,
  deleteProduct,
} = require("../controllers/products");
const { verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

// Creating a new Product
router.post("/", verifyTokenAndAdmin, createProduct);

// Updating an existing Prouctt (CAn only be done by the admin)
router.put("/:id", verifyTokenAndAdmin, updateProduct);

router.delete("/:id", verifyTokenAndAdmin, deleteProduct);

router.get("/find/:id", verifyTokenAndAdmin, getProduct);

router.get("/", getAllProducts);

module.exports = router;
