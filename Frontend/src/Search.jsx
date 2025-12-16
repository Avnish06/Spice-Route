import { useLocation } from "react-router-dom";
import Product from "./Product.jsx";

export default function SearchResults() {
  const { state } = useLocation();
  const products = state?.products || [];

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-xl font-semibold text-gray-700">
        No products found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header Text */}
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Search Results ({products.length})
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((item, index) => (
            <Product key={index} {...item} />
          ))}
        </div>

      </div>
    </div>
  );
}
