import React, { useState, useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import CartItem from "./CartProduct.jsx";

function Cart() {
  const [product, setProduct] = useState([]);

   

  const fetchCartProduct = async () => {
    try {
      const response = await axios.get(
        serverUrl + "/api/v1/cart/getCartInfo",
        { withCredentials: true }
      );
      setProduct(response.data.cart.CartItems || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCartProduct();
  }, []);

 
  

  return (
    <div className="px-6 py-8 max-w-4xl mx-auto">

      {/* Page Header */}
      <h1 className="text-4xl font-bold mb-8 text-green-700">Shopping Cart</h1>

      {/* Cart Items */}
      <div className="space-y-6">
        {product.length > 0 ? (
          product.map((item, index) => (
            <CartItem
              key={item._id || index}
              product={item?.product}
              quantity={item?.quantity}
              id = {item?._id}
            />
          ))
        ) : (
          <p className="text-gray-600 text-center text-xl">
            Your cart is empty 😕
          </p>
        )}
      </div>
    </div>
  );
}

export default Cart;
