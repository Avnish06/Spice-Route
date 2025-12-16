import { User } from "../Models/User.Models.js";

export const AddressSaveControllers = async(req, res) => {

   const {userId, address, pincode} = req.body

   const user = await User.findById(userId)

    








}