import express from "express";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import dotenv from "dotenv";
import { cleanUploadsDir } from "./utils/cleanUploadsDir.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

// Connect to the database
connectDB();

// Routes
app.use("/api/products", productRoutes);
app.use("/api", categoryRoutes);

// Error handling
app.use((err, req, res, next) => {
  res.status(500).json({ message: "Server Error" });
});

cleanUploadsDir();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
