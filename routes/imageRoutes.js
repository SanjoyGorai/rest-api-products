import express from "express";
import upload from "../middleware/multer.js";
import { uploadImage } from "../controllers/imageController.js";

const router = express.Router();

// Route for uploading image
router.post("/upload", upload.single("image"), uploadImage);

export default router;
