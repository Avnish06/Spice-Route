import razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";
import { Product } from "../Models/Product.Models.js";
import { User } from "../Models/User.Models.js";

dotenv.config();

// Razorpay instance
const RazorPayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});

// CREATE ORDER
export const razorpayOrder = async (req, res) => {
  try {
    const { ProductId } = req.body;

    const product = await Product.findById(ProductId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const options = {
      amount: product.price * 100,
      currency: "INR",
      receipt: ProductId.toString()
    };

    const order = await RazorPayInstance.orders.create(options);
    return res.status(200).json(order);

  } catch (error) {
    return res.status(500).json({ message: `Failed to create Razorpay order`, error: error.message });
  }
};

// VERIFY PAYMENT
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      ProductId,
      userId,
      address, 
      pincode
    } = req.body;

    // Generate expected signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign)
      .digest("hex");

    // Check signature
    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    // Fetch user
    const user = await User.findById(userId);

    // If not already purchased, add product
    if (!user.purchasedProduct.includes(ProductId)) {
      user.purchasedProduct.push({
      product: ProductId,
      address: address,
      pincode: pincode
      });
      await user.save();
    }

    // Fetch product
    const product = await Product.findById(ProductId);

    // Add user as purchaser
    if (!product.purchaser.includes(userId)) {
      product.purchaser.push(userId);
      await product.save();
    }

    return res.status(200).json({ message: "Payment verified successfully" });

  } catch (error) {
    return res.status(500).json({ message: `Internal server error`, error: error.message });
  }
};
