import express from "express";
import { getCurrentUser, updateProfile } from "../Controllers/userController.js";
import isAuth from "../Middlewares/isAuth.middleware.js";
import upload from "../Middlewares/multer.middleware.js";

const userRouter = express.Router();

// Fetch logged-in user
userRouter.get("/getCurrentUser", isAuth, getCurrentUser);

// Update profile with photo upload
userRouter.post("/editprofile", isAuth, upload.single("photo"), updateProfile)

export default userRouter;
