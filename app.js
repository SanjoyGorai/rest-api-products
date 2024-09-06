import express from "express";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
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


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



// In The Box : Handset, USB C Charge Cable (1m), Documentation
// Model Number : MTP43HN/A
// Model Name : iPhone 15
// Color : Blue
// Browse Type : Smartphones
// SIM Type : Dual Sim(Nano + eSIM)
// Hybrid Sim Slot : No
// Touchscreen : Yes
// OTG Compatible : No
// Quick Charging : Yes