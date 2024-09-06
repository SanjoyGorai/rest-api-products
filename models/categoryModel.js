import { DataTypes } from "sequelize";
import { nanoid } from "nanoid";
import { sequelize } from "../config/db.js";

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.STRING(21), // nanoid generates IDs with a length of 21 characters
      primaryKey: true,
      allowNull: false,
      defaultValue: () => nanoid(), // Use nanoid to generate unique IDs
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true, // Automatically handle createdAt and updatedAt
  }
);

export default Category;
