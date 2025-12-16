import { User } from "../Models/User.Models.js"
import { Product } from "../Models/Product.Models.js"


export const purchasedProduct = async(req, res) => {
    try {
        const userId = req.userId
       const user = await User.findById(userId).populate("purchasedProduct.product")

             
       
        if(!(user.purchasedProduct))
       {
        return res.status(400).json({message: "Product is not found there"})
       }
        return res.status(200).json(user.purchasedProduct)
    } catch (error) {
          return res.status(500).json({message:"Something went wrong while fetching your purchased Produc details", error})
    }
}