import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
  deleteAllProducts,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.get("", getProducts);
router.get("/:id", getProductById);
// router.post("/products", createProduct);
router.post("/create", upload.array("images", 5), createProduct); // Route for creating a product with image upload
router.put("/:id", updateProductById);
// Delete all products route
router.delete("/delete-all", deleteAllProducts); // Specific route first
router.delete("/:id", deleteProductById); // Dynamic route last

export default router;
