import express from "express"
import { createProduct } from "../Controllers/ProductController.js"
import { getPublishedProduct } from "../Controllers/ProductController.js"
import { editProduct } from "../Controllers/ProductController.js"
import { removeProduct } from "../Controllers/ProductController.js"
import isAuth from "../Middlewares/isAuth.middleware.js"
import upload from "../Middlewares/multer.middleware.js"
import { getAllProducts } from "../Controllers/ProductController.js"
import { getProductById } from "../Controllers/ProductController.js"
import { getisPublishedProduct } from "../Controllers/ProductController.js"

export const productRoute = express.Router()    

productRoute.post("/createproduct",isAuth, createProduct)
productRoute.get("/getpublishedproduct", getPublishedProduct)
productRoute.post(
  "/editproduct/:productId",
  isAuth,
  upload.array("images", 4),
  editProduct
);

productRoute.delete("/removeproduct/:productId", isAuth, removeProduct)
productRoute.get("/getallproducts", getAllProducts)
productRoute.get("/getproductbyId/:productId",  getProductById)
productRoute.get("/getpublishedproduct", getisPublishedProduct)