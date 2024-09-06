import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";

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
export const createProduct = async (req, res) => {
  const { title, description, category_id, price, images, specifications } =
    req.body;
  try {
    const category = await Category.findByPk(category_id);
    if (!category) return res.status(400).json({ message: "Invalid category" });

    const newProduct = await Product.create({
      title,
      description,
      category_id,
      price,
      images,
      specifications,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error creating product" });
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
