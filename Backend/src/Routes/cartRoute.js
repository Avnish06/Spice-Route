import express from "express"
import { addProducttoCart } from "../Controllers/CartController.js"
import { giveCartInfo } from "../Controllers/CartController.js"
import isAuth from "../Middlewares/isAuth.middleware.js"
import { deleteCartProduct } from "../Controllers/CartController.js"

const cartRoute = express.Router()

cartRoute.post("/addtoCart/:productId", isAuth, addProducttoCart)
cartRoute.get("/getCartInfo", isAuth, giveCartInfo)
cartRoute.delete("/deletecartproduct/:productId",isAuth, deleteCartProduct)

export default cartRoute;