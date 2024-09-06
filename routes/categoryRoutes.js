import express from "express";
import {
  createCategory,
  deleteAllCategories,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/categories", createCategory);
router.get("/categories", getCategories);
router.put("/categories/:id", updateCategory); // Update category route
router.delete("/categories/:id", deleteCategory);
router.delete("/categories", deleteAllCategories);

export default router;
