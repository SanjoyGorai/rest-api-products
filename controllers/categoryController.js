import Category from "../models/categoryModel.js";

// Create a new category
export const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = await Category.create({ name });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: "Error creating category" });
  }
};

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories" });
  }
};

// Delete a category by id
export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.destroy(); // Delete the category
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
  }
};

// Update a category by id
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Update category name
    category.name = name || category.name;
    await category.save(); // Save updated category

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error });
  }
};

// Delete all categories
export const deleteAllCategories = async (req, res) => {
  try {
    // Find and delete all categories
    const categories = await Category.destroy({
      where: {},
      truncate: true, // This will remove all data and reset auto-increment keys
    });

    if (categories === 0) {
      return res.status(404).json({ message: "No categories found to delete" });
    }

    res.status(200).json({ message: "All categories deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting categories", error });
  }
};
