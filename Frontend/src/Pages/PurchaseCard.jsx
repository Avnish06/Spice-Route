import React from "react";
import { useNavigate } from "react-router-dom";

function PurchaseCard({ product, address, id }) {

  const navigate = useNavigate();

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-start gap-4 hover:shadow-md transition">
      
      {/* Product Image */}
      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
        <img
          src={product?.ImageUrl[0]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>

        <div className="mt-1 text-sm text-gray-600">
          <p>
            Price: <span className="font-medium text-gray-900">₹{product.price}</span>
          </p>
        </div>

        {/* Shipping Address */}
        <div className="mt-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
            Shipping Address
          </p>

          <p className="text-sm text-gray-600 mt-1 leading-snug">
            {address || "Address will appear here"}
          </p>
        </div>

        {/* Tracking Link */}
        <button
          className="mt-3 text-sm font-medium text-blue-600 hover:underline cursor-pointer disabled:opacity-60"
          onClick={() => navigate(`/trackingproduct/${id}`)}
        >
          Track Order →
        </button>
      </div>
    </div>
  );
}

export default PurchaseCard;
