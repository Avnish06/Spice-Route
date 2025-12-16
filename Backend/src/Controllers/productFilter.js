import { Product } from "../Models/Product.Models.js"

export const filterproduct = async (req, res) => {
  try {
    const { search } = req.query;   // <-- FIXED

    const products = await Product.find({
      company: { $regex: search, $options: "i" } 
    });

    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while filtering the product"
    });
  }
};
