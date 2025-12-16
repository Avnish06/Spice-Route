import { filterproduct } from "../Controllers/productFilter.js";
import express from "express"

export const filterRoute = express.Router()

filterRoute.get("/filterproduct", filterproduct)