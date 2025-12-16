import { User } from "../Models/User.Models.js";
import uploadoncloudinary from "../config/cloudinary.js";

export const getCurrentUser = async (req, res) => {
  try {
    const currentUser = await User.findById(req.userId).select("-password");
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(currentUser);
  } catch (error) {
    console.error("Error fetching current user:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { username } = req.body;
    const userId = req.userId;
    const updateData = { username };

    // Upload new photo if present
    if (req.file) {
      const photoUrl = await uploadoncloudinary(req.file.path);
      if (photoUrl) updateData.photoUrl = photoUrl;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
