import express from "express"
import { purchasedProduct } from "../Controllers/PurchasedProductControllers.js";
import isAuth from "../Middlewares/isAuth.middleware.js"

export const purchasedRoute = express.Router()

purchasedRoute.get("/purchasedproduct", isAuth,  purchasedProduct)