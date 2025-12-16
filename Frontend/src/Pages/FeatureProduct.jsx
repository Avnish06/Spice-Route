import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { toast } from "react-toastify";
import Product from "../product"; 
import { useNavigate } from "react-router-dom";

function FeatureProduct() {
  const [featureProduct, setFeatureProduct] = useState([]);
  const navigate = useNavigate()

  const handleProduct = async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/api/v1/product/getpublishedproduct`
      );
      setFeatureProduct(response.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while fetching your published products.");
    }
  };

  useEffect(() => {
    handleProduct();
  }, []);

  const featuredProduct = featureProduct?.slice(1, 5);

  return (
    <div className="px-6 sm:px-10 lg:px-20 py-8">
      
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Our Best Selling Product
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {featuredProduct?.map((product) => (
          
          // ⭐ HOVER ANIMATION WRAPPER (ONLY CHANGE)
          <div
            key={product._id}
            className="transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 hover:shadow-xl rounded-xl"
          >
            <Product  
              onClick={() => navigate(`/individualproduct/${product._id}`)}
              ImageUrl={product?.ImageUrl}
              name={product?.name}
              price={product?.price}
              description={product?.description}
              categoryLabel={product?.category}
              rating={product?.rating}
              ratingCount={product?.numReviews}
              boughtText="Popular choice"
              isSponsored={false}
            />
          </div>

        ))}
      </div>
    </div>
  );
}

export default FeatureProduct;
