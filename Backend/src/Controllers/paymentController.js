import crypto from "crypto";
import axios from "axios";
import dotenv from "dotenv";
import { Product } from "../Models/Product.Models.js"
import { User } from "../Models/User.Models.js";

dotenv.config();

const MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID;
const MERCHANT_KEY = process.env.PHONEPE_MERCHANT_KEY;
const BASE_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox";
const SALT_KEY = process.env.PHONEPE_SALT_KEY;
const SALT_INDEX = process.env.PHONEPE_SALT_INDEX;

// =============================
//  CREATE PHONEPE PAYMENT
// =============================
export const phonePePayment = async (req, res) => {
  try {
    const { ProductId, userId, address, pincode } = req.body;

    const product = await Product.findById(ProductId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const amount = product.price * 100;

    const payload = {
      merchantId: MERCHANT_ID,
      merchantTransactionId: "TXN_" + Date.now(),
      merchantUserId: userId,
      amount,
      redirectUrl: `${process.env.SERVER_URL}/api/v1/payment/phonepe/verify`,
      redirectMode: "POST",
      mobileNumber: "9999999999",
      paymentInstrument: {
        type: "PAY_PAGE"
      }
    };

    const buffer = Buffer.from(JSON.stringify(payload)).toString("base64");
    const checkSum = crypto
      .createHash("sha256")
      .update(buffer + "/pg/v1/pay" + SALT_KEY)
      .digest("hex") + "###" + SALT_INDEX;

    const options = {
      method: "POST",
      url: `${BASE_URL}/pg/v1/pay`,
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": checkSum,
        accept: "application/json"
      },
      data: {
        request: buffer
      }
    };

    const response = await axios.request(options);
    return res.status(200).json({
      url: response.data.data.instrumentResponse.redirectInfo.url
    });

  } catch (error) {
    return res.status(500).json({
      message: "PhonePe order creation failed",
      error: error.message
    });
  }
};

// =============================
//  VERIFY PHONEPE PAYMENT
// =============================
export const verifyPhonePePayment = async (req, res) => {
  try {
    const { merchantTransactionId, ProductId, userId, address, pincode } = req.body;

    const verifyUrl = `${BASE_URL}/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}`;

    const checkSum = crypto
      .createHash("sha256")
      .update(`/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}` + SALT_KEY)
      .digest("hex") + "###" + SALT_INDEX;

    const response = await axios.get(verifyUrl, {
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": checkSum,
        "X-MERCHANT-ID": MERCHANT_ID
      }
    });

    // If payment was not successful
    if (response.data.data.code !== "PAYMENT_SUCCESS") {
      return res.status(400).json({ message: "Payment failed" });
    }

    // Update DB like Razorpay
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const alreadyPurchased = user.purchasedProduct.some(
      (item) => item.product.toString() === ProductId
    );

    if (!alreadyPurchased) {
      user.purchasedProduct.push({
        product: ProductId,
        address,
        pincode
      });
      await user.save();
    }

    const product = await Product.findById(ProductId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (!product.purchaser.some(id => id.toString() === userId)) {
      product.purchaser.push(userId);
      await product.save();
    }

    return res.status(200).json({ message: "Payment verified successfully" });

  } catch (error) {
    return res.status(500).json({
      message: "Verification failed",
      error: error.message
    });
  }
};
