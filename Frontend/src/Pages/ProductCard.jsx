import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import Price from "./Price";
import Discountprice from "../../Discountprice";
import { toast } from "react-toastify";

function ProductCard() {
  const navigate = useNavigate();
  const { productId } = useParams();

  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");

  const addtoCart = async () => {
    try {
      await axios.post(
        `${serverUrl}/api/v1/cart/addtoCart/${productId}`,
        { quantity },
        { withCredentials: true }
      );

      toast.success("Product added to Cart Successfully");
      navigate("/cart");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  };

  const handleProduct = async () => {
    const result = await axios.get(
      `${serverUrl}/api/v1/product/getproductbyId/${productId}`,
      { withCredentials: true }
    );

    setProduct(result.data);
    setSelectedImage(result.data?.ImageUrl?.[0]);
  };

  useEffect(() => {
    handleProduct();
  }, []);

  return (
    <div className="min-h-screen bg-[#f3f3f3] py-10 px-4 sm:px-8">

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-[0_5px_15px_rgba(0,0,0,0.1)] p-8 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* LEFT SIDE */}
        <div>

          {/* MAIN IMAGE WITH ARROWS */}
          <div className="relative w-full h-[520px] bg-[#fafafa] border rounded-xl flex items-center justify-center">

            {/* LEFT ARROW */}
            <button
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white w-10 h-10 flex items-center justify-center rounded-full shadow cursor-pointer hover:bg-gray-100"
              onClick={() => {
                const idx = product.ImageUrl.indexOf(selectedImage);
                const prevIndex = (idx - 1 + product.ImageUrl.length) % product.ImageUrl.length;
                setSelectedImage(product.ImageUrl[prevIndex]);
              }}
            >
              ◀
            </button>

            {/* LARGE MAIN IMAGE */}
            <img
              src={selectedImage}
              alt="Product"
              className="h-full object-contain p-4"
            />

            {/* RIGHT ARROW */}
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white w-10 h-10 flex items-center justify-center rounded-full shadow cursor-pointer hover:bg-gray-100"
              onClick={() => {
                const idx = product.ImageUrl.indexOf(selectedImage);
                const nextIndex = (idx + 1) % product.ImageUrl.length;
                setSelectedImage(product.ImageUrl[nextIndex]);
              }}
            >
              ▶
            </button>

          </div>

          {/* THUMBNAIL GALLERY */}
          <div className="flex gap-4 justify-center mt-4">
            {product?.ImageUrl?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Thumbnail"
                className={`w-24 h-24 border rounded-lg object-cover cursor-pointer p-1 transition 
                  ${
                    selectedImage === img
                      ? "border-yellow-500 shadow-md"
                      : "border-gray-300"
                  }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-4">

          <h1 className="text-3xl font-semibold text-gray-900">
            {product?.name}
          </h1>

          <div className="flex items-center space-x-2 text-yellow-500 text-xl">
            ⭐⭐⭐⭐☆
            <span className="text-sm text-gray-600">(120 ratings)</span>
          </div>

          <div className="space-y-1">
            <p className="text-gray-500 line-through text-lg">
              <Price price={product?.price} />
            </p>

            <p className="text-2xl font-bold text-[#B12704]">
              Deal Price:{" "}
              <Discountprice
                price={product?.price}
                Discountprice={product?.discountedprice}
              />
            </p>

            <p className="text-green-600 font-medium">
              You Save: ₹{product?.price - product?.discountedprice} (Limited Deal)
            </p>
          </div>

          <p className="text-gray-700 text-sm leading-relaxed border-t pt-4">
            {product?.description}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            <div className="border rounded-lg py-3 text-center text-sm bg-[#fafafa]">
              🚚 <br /> Free Delivery
            </div>

            <div className="border rounded-lg py-3 text-center text-sm bg-[#fafafa]">
              🔁 <br /> 30 Days Replacement
            </div>

            <div className="border rounded-lg py-3 text-center text-sm bg-[#fafafa]">
              ⚡ <br /> Fast Delivery
            </div>
          </div>

          <div className="pt-4 text-sm text-gray-700 space-y-1">
            <p>
              <strong>Available:</strong>{" "}
              <span className="text-green-600 font-medium">In Stock</span>
            </p>

            <p><strong>ID:</strong> {productId}</p>
            <p><strong>Brand:</strong> {product?.company}</p>
          </div>

          {/* QUANTITY */}
          <div className="flex items-center gap-4 pt-4 border-t">
            <p className="text-gray-800 font-medium">Quantity:</p>

            <div className="flex items-center border rounded-lg shadow-sm">
              <button
                className="px-3 py-1 text-lg"
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              >
                -
              </button>

              <span className="px-4 py-1 border-x">{quantity}</span>

              <button
                className="px-3 py-1 text-lg"
                onClick={() =>
                  quantity < product?.numberofProduct &&
                  setQuantity(quantity + 1)
                }
              >
                +
              </button>
            </div>
          </div>

          <button
            className="mt-6 w-full md:w-auto bg-[#FFD814] hover:bg-[#F7CA00] text-black font-semibold px-6 py-3 rounded-lg shadow-md border border-yellow-500 transition"
            onClick={addtoCart}
          >
            Add to Cart 🛒
          </button>

        </div>
      </div>
    </div>
  );
}

export default ProductCard;
