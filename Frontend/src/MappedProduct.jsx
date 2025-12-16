import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { serverUrl } from './App.jsx';
import Product from './product.jsx';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function MappedProduct() {
  const [publishedProducts, setPublishedProducts] = useState([]);
  const navigate = useNavigate();

  const handleProduct = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/v1/product/getpublishedproduct`);
      setPublishedProducts(response.data);
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong while fetching your published products.');
    }
  };

  useEffect(() => {
    handleProduct();
  }, []);

  return (
    <div
      className="min-h-screen py-10 px-4 sm:px-8 
      bg-[linear-gradient(180deg,white,rgba(187,247,208,0.6),white)]"
    >
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Explore Products
        </h1>

        
      </div>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {publishedProducts.length > 0 ? (
          publishedProducts.map((product) => (
            <div
              key={product._id}
              onClick={() => navigate(`/individualproduct/${product._id}`)}
              className="cursor-pointer"
            >
              <Product {...product} />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full py-10 bg-white rounded-xl shadow">
            No published products found.
          </p>
        )}
      </div>
    </div>
  );
}

export default MappedProduct;
