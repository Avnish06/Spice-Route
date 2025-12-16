import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { type } from "os";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  photoUrl: { type: String },
  role: {
  type: String,
  enum: ["purchaser", "seller"],
  default: "purchaser"
},
resetOtp:{
type: String
},
otpExpires:{
type: Date
},
isOtpVerified:{
type: Boolean,
default: false
},
  CartItems: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true, default: 1 }
    }
  ],
  purchasedProduct: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      address: {
        type: String,
        required: true
      },
      pincode: {
        type: Number,
        required: true
      },
    }
  ]

}, { timestamps: true });


// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Password comparison method
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};


export const User = mongoose.model("User", userSchema);
