import { nanoid } from "nanoid";
import cloudinary from "../config/cloudinaryConfig.js";
import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";
import fs from "fs";
import fsExtra from "fs-extra";
import path from "path";

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
};

// Create a new product
// export const createProduct = async (req, res) => {
//   const { title, description, category_id, price, images, specifications } =
//     req.body;
//   try {
//     const category = await Category.findByPk(category_id);
//     if (!category) return res.status(400).json({ message: "Invalid category" });

//     const newProduct = await Product.create({
//       title,
//       description,
//       category_id,
//       price,
//       images,
//       specifications,
//     });
//     res.status(201).json(newProduct);
//   } catch (error) {
//     res.status(500).json({ message: "Error creating product" });
//   }
// };

// Create a new product with images
export const createProduct = async (req, res) => {
  const { title, description, category_id, price } = req.body;
  const files = req.files;

  try {
    // Upload each image to Cloudinary
    const imageUrls = [];
    for (let file of files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "product_images",
      });
      imageUrls.push(result.secure_url);

      // Delete image from server after successful Cloudinary upload
      fs.unlinkSync(file.path);
    }

    // Save the product to the database
    const product = await Product.create({
      id: nanoid(),
      title,
      description,
      category_id,
      price,
      images: imageUrls, // Save array of Cloudinary URLs
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating product",
      error: error.message,
    });
  }
};

// Update product by ID
export const updateProductById = async (req, res) => {
  const { title, description, category_id, price, images, specifications } =
    req.body;
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const category = await Category.findByPk(category_id);
    if (!category) return res.status(400).json({ message: "Invalid category" });

    await product.update({
      title,
      description,
      category_id,
      price,
      images,
      specifications,
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
};

// Delete product by ID
export const deleteProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.destroy();
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};

// Delete all products and log the process using fs-extra
export const deleteAllProducts = async (req, res) => {
  try {
    console.log("deleteAllProducts:");

    // Fetch all products before deleting
    const products = await Product.findAll();

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found to delete." });
    }

    // Delete all products
    await Product.destroy({ where: {}, truncate: true });

    // Log the deletion process in a file using fs-extra
    const logMessage = `${new Date().toISOString()} - Deleted ${
      products.length
    } products.\n`;
    const logFilePath = path.join("logs", "deletions.log");

    // Ensure the 'logs' folder exists (fs-extra will create it if not)
    await fsExtra.ensureDir("logs");

    // Append log to the deletion file using fs-extra
    await fsExtra.appendFile(logFilePath, logMessage);

    res.status(200).json({
      message: "All products deleted successfully.",
      deletedCount: products.length,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting products",
      error: error.message,
    });
  }
};
