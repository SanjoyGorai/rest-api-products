import cloudinary from "../config/cloudinaryConfig.js";
import fs from "fs";

// Upload image to Cloudinary after storing in server
export const uploadImage = async (req, res) => {
  const { path } = req.file; // Path of the image uploaded to the server

  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(path, {
      folder: "express_uploads", // Cloudinary folder name
    });

    // Delete the image from the server after successful upload
    fs.unlinkSync(path);

    res.status(200).json({
      message: "Image uploaded successfully",
      cloudinaryUrl: result.secure_url,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error uploading image to Cloudinary",
      error,
    });
  }
};
