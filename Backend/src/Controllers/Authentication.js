import { User } from "../Models/User.Models.js";
import uploadoncloudinary from "../config/cloudinary.js";
import jwt from "jsonwebtoken";
import sendMail from "../config/sendMail.js";
import bcrypt from "bcrypt"

const generateToken = (userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return token;
  } catch (error) {
    console.log("Error while generating the token", error);
  }
};

export const SignUp = async (req, res) => {
  try {
    let { username, email, password, role } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please provide the necessary details" });
    }

    let photoUrl=""
      
    if(role=="seller" && email== "avnishkr.ggn@gmail.com")
    {
         role = "seller"
    }
   else{

    role = "purchaser"
   }

    
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(409).json({ message: "User already registered" });
    }
     
    const user = await User.create({
      username,
      email,
      password,
      photoUrl,
      role
      
    });

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.log(`Error during registration: ${error}`);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Password is not correct" });
    }

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.log("Error while login", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const logOut = async(req, res) => {
try {
  await res.clearCookie("token")
  res.status(201).json({messsage: "Logout Successfully"})
  
} catch (error) {
   return res.status(500).json({ message: "Something went wrong" });
}

}

export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    user.resetOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000; // 5 min
    user.isOtpVerifed = false;

    await user.save();
    await sendMail(email, otp);

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong while sending OTP" });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid email or OTP" });
    }

    if (user.resetOtp !== otp) {
      return res.status(400).json({ message: "Incorrect OTP" });
    }

    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    // OTP VERIFIED → Must mark it as verified
    user.resetOtp = undefined;
    user.otpExpires = undefined;
    user.isOtpVerifed = true;

    await user.save();

    return res.status(200).json({ message: "OTP Verified Successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Verify OTP Error ${error}` });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !user.isOtpVerifed) {
      return res.status(400).json({ message: "OTP verification is required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.isOtpVerifed = false; // Reset so OTP cannot be reused

    await user.save();

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Reset Password Error ${error}` });
  }
};
