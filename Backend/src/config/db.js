import mongoose from "mongoose";
import { DB_NAME } from "./Constant.js";

export const ConnectDB = async () => {
    try {
        const DB = await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`)
        console.log("Database Connected Successfull")

    } catch (error) {
        console.log("Database Connection Error")
    }
}

