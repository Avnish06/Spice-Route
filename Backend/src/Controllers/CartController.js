import { User } from "../Models/User.Models.js";
export const addProducttoCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;  

    if (!req.userId) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    
    const existingItem = user.CartItems.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      
      existingItem.quantity += quantity;
    } else {
      
      user.CartItems.push({ product: productId, quantity });
    }

    await user.save();
    await user.populate("CartItems.product");

    return res.status(200).json({
      message: "Product added to cart successfully",
      user
    });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return res.status(500).json({
      message: "Something went wrong while adding your product to the cart"
    });
  }
};

export const giveCartInfo = async (req, res) => {
  try {
    const cart = await User.findById(req.userId)
      .populate("CartItems.product");

    console.log("🛒 CART ITEMS:", JSON.stringify(cart.CartItems, null, 2));

    return res.status(200).json({ cart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while finding your product" });
  }
};

export const deleteCartProduct = async (req, res) => {
  try {
    const { productId } = req.params;  // <-- CartItem._id

    if (!productId) {
      return res.status(400).json({ message: "Cart item ID missing" });
    }

    const user = await User.findOneAndUpdate(
      { "CartItems._id": productId },             // find the user with this cart item
      { $pull: { CartItems: { _id: productId } } },  // remove that specific cart item
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    return res.status(200).json({
      message: "Product removed from cart",
      cart: user.CartItems
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
