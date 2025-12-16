import express from "express"
import { SignUp } from "../Controllers/Authentication.js"
import { login } from "../Controllers/Authentication.js"
import { logOut } from "../Controllers/Authentication.js"
import { sendOTP } from "../Controllers/Authentication.js"
import { verifyOtp } from "../Controllers/Authentication.js"
import { resetPassword } from "../Controllers/Authentication.js"

const authRoute = express.Router()


authRoute.post("/signup", SignUp)
authRoute.post("/login", login)
authRoute.get("/logout", logOut)
authRoute.post("/sendotp", sendOTP)
authRoute.post("/verifyotp", verifyOtp)
authRoute.post("/resetpassword", resetPassword)


export default authRoute;