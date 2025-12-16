import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import { toast } from "react-toastify";
import PurchaseCard from "./PurchaseCard.jsx";

function PurchasedProduct() {
  const [products, setProducts] = useState([]);

  const purchasedProduct = async () => {
    try {
      let result = await axios.get(
        serverUrl + "/api/v1/purchased/purchasedproduct",
        { withCredentials: true }
      );

      toast.success("Purchased Product loaded successfully");

      // Store the array
      setProducts(result.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to load products");
      console.log(error.response?.data?.message);
    }
  };

  useEffect(() => {
    purchasedProduct();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Purchased Products
      </h1>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {products
          .filter((item) => item?.product) // prevent null crash
          .map((item) => (
            <div key={item.product._id} className="flex justify-center">
              <PurchaseCard
                product={item.product}
                address={item.address}
                id={item._id}
                
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default PurchasedProduct;
