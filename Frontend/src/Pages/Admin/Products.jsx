import React from "react";
import { Pencil } from "lucide-react";
import useProductInfo from "../../hooks/producthooks";
import { useNavigate } from "react-router-dom";

const AllCreatedProducts = () => {
  
  const { products } = useProductInfo();
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-green-200 p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <button className="text-lg font-bold hover:text-gray-700">←</button>
          <h1 className="text-2xl font-semibold">All Created Products</h1>
        </div>
        <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
          Create Product
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
            <tr>
              <th className="px-6 py-3">Products</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>

          <tbody className="text-gray-800">
            {products && products.length > 0 ? (
              products.map((product, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="flex items-center gap-3 px-6 py-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center border overflow-hidden">
                      {product.ImageUrl ? (
                        <img
                          src={product.ImageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3v18h18M3 3l18 18"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="font-medium">{product.name}</span>
                  </td>

                  <td className="px-6 py-4">
                    ₹ {product.discountedprice || "NA"}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`${
                        product.isPublished
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      } text-xs font-semibold px-3 py-1 rounded-full`}
                    >
                      {product.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <button className="p-2 rounded-md hover:bg-gray-200" onClick={() => navigate(`/editproduct/${product._id}`)}>
                      <Pencil size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center text-gray-500 py-6 italic"
                >
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="text-center text-gray-500 text-sm py-4">
          A list of your recent products.
        </div>
      </div>
    </div>
  );
};

export default AllCreatedProducts;
