import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDetails } from "../context/UserContext.jsx";

export default function CheckoutForm() {
  const { user } = useDetails();
  const { state } = useLocation();
  const navigate = useNavigate();

  const { product, quantity, cartId } = state;

  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");

  const handleProceedToPayment = () => {
    navigate("/phonepe", {
      state: {
        userId: user._id,
        productId: product._id,
        productName: product.name,
        amount: product.price * quantity,
        quantity,
        cartId,
        address,
        pincode,
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>

        <textarea
          className="w-full p-3 border rounded-lg mb-3"
          placeholder="Enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <input
          className="w-full p-3 border rounded-lg mb-4"
          placeholder="Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
          onClick={handleProceedToPayment}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}
