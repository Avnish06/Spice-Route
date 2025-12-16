import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { ConnectDB } from "./src/config/db.js";
import authRoute from "./src/Routes/authRoute.js";
import userRouter from "./src/Routes/UserRoutes.js";
import { productRoute } from "./src/Routes/productRoute.js";
import cartRoute from "./src/Routes/cartRoute.js";
import paymentRouter from "./src/Routes/paymentRoute.js";
import { purchasedRoute } from "./src/Routes/purchasedProduct.js";
import { trackingauth } from "./src/Routes/fedextracking.js";
import { filterRoute } from "./src/Routes/filterRoute.js";
// import { phonepayRoute } from "./src/Routes/phonePayRoute.js";
import { phonepeRoute } from "./src/Routes/phonepeRoute.js";
dotenv.config();

const port = process.env.PORT;
const app = express();

// Middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/cart", cartRoute)
// app.use("/api/v1/payment", paymentRouter)
app.use("/api/v1/purchased", purchasedRoute)
app.use("/api/v1/tracking", trackingauth)
app.use("/api/v1/filter", filterRoute)
app.use("/api/v1/payment", phonepeRoute)
// app.use("/api/v1/payment", phonepayRoute)

// Connect to DB and start server
ConnectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
})
.catch((err) => {
    console.log("MongoDB connection failed", err);
});
