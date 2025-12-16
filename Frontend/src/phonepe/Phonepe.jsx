import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { serverUrl } from "../App";


const Phonepe = () => {
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);

  const {
    userId,
    productId,
    productName,
    amount,
    address,
    pincode,
    cartId,
  } = state;

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    const paymentData = {
      userId,
      productId,
      amount,
      address,
      pincode,
      cartId,
      MUID: "MUID" + Date.now(),
      transactionId: "T" + Date.now(),
    };

    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/payment/payments`,
        paymentData,
        { withCredentials: true }
      );

      // 🔥 Redirect to PhonePe payment page
      window.location.href = res.data.redirectUrl;

    } catch (error) {
      console.error(error);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePayment} className="p-6">
      <h2 className="text-xl font-semibold mb-4">PhonePe Payment</h2>

      <p><strong>Product:</strong> {productName}</p>
      <p><strong>Amount:</strong> ₹{amount}</p>

      <button
        type="submit"
        disabled={loading}
        className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg"
      >
        {loading ? "Processing..." : "Pay with PhonePe"}
      </button>
    </form>
  );
};

export default Phonepe;
