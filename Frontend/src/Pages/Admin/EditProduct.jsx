import React, { useRef, useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";

const EditProduct = () => {
  const [isPublished, setisPublished] = useState(false);
  const [description, setDescription] = useState();
  const [companyName, setCompanyName] = useState();
  const [Name, setName] = useState();
  const [category, setCategory] = useState();
  const { productId } = useParams();
  const [price, setPrice] = useState();
  const [discountedprice, setDiscountedPrice] = useState();
  const [numberofProduct, setNumberofProduct] = useState();
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

  const [selctedproduct, setSelctedproduct] = useState();

  // MULTIPLE IMAGE ARRAYS
  const [productImages, setProductImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  // DELETE PRODUCT
  const removeProduct = async () => {
    try {
      await axios.delete(
        serverUrl + `/api/v1/product/removeproduct/${productId}`
      );
      toast.success("Product deleted Successfully");
      navigate("/editproduct");
    } catch (error) {
      toast.error("Something went wrong while deleting your product");
    }
  };

  // FETCH PRODUCT
  const getProductbyId = async () => {
    try {
      const result = await axios.get(
        serverUrl + `/api/v1/product/getproductbyId/${productId}`,
        { withCredentials: true }
      );
      setSelctedproduct(result.data);
    } catch (error) {
      console.log(error?.response?.data?.message || error.message);
    }
  };

  // UPDATE PRODUCT
  const handleEditCourse = async () => {
    setloading(true);
    const formData = new FormData();

    formData.append("isPublished", isPublished);
    formData.append("description", description);
    formData.append("companyName", companyName);
    formData.append("Name", Name);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("numberofProduct", numberofProduct);
    formData.append("discountedprice", discountedprice);

    // Append all selected images
    productImages.forEach((file) => {
      formData.append("images", file);
    });

    try {
      await axios.post(
        serverUrl + `/api/v1/product/editproduct/${productId}`,
        formData,
        { withCredentials: true }
      );

      toast.success("Product updated successfully");
      navigate("/editproduct");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setloading(false);
    }
  };

  // HANDLE SINGLE IMAGE UPLOAD (ONE AT A TIME)
  const handleMultipleImages = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (productImages.length >= 4) {
      toast.error("You can upload only 4 images");
      return;
    }

    // Add new image to array
    setProductImages((prev) => [...prev, file]);
    setImagesPreview((prev) => [...prev, URL.createObjectURL(file)]);
  };

  // POPULATE FORM WHEN PRODUCT LOADS
  useEffect(() => {
    getProductbyId();
  }, []);

  useEffect(() => {
    setDescription(selctedproduct?.description);
    setName(selctedproduct?.name);
    setCompanyName(selctedproduct?.companyName);
    setCategory(selctedproduct?.category);
    setPrice(selctedproduct?.price);
    setDiscountedPrice(selctedproduct?.discountedprice);
    setNumberofProduct(selctedproduct?.numberofProduct);
    setisPublished(selctedproduct?.isPublished);

    // Existing images from DB
    if (selctedproduct?.images) {
      setImagesPreview(selctedproduct.images);
    }
  }, [selctedproduct]);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="min-h-screen bg-gray-100 p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">
            Edit Product Details
          </h1>

          <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
            Go to Product List
          </button>
        </div>

        {/* FORM */}
        <div className="bg-white rounded-2xl shadow-md p-8">

          {/* Publish / Remove */}
          <div className="flex gap-4 mb-6">
            <button
              type="button"
              className={`px-4 py-2 rounded-lg font-medium ${
                isPublished
                  ? "bg-red-200 text-green-800"
                  : "bg-green-200 text-green-800"
              }`}
              onClick={() => setisPublished((prev) => !prev)}
            >
              {isPublished ? "Click to UnPublish" : "Click to Publish"}
            </button>

            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              onClick={removeProduct}
            >
              Remove Product
            </button>
          </div>

          {/* Basic Info */}
          <h2 className="text-lg font-semibold mb-4">
            Basic Product Information
          </h2>

          <div className="space-y-4">

            {/* Company Name */}
            <div>
              <label className="block text-gray-600 mb-1">Company Name</label>
              <input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Enter Company Name"
              />
            </div>

            {/* Product Name */}
            <div>
              <label className="block text-gray-600 mb-1">Name</label>
              <input
                value={Name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Enter Product Name"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-600 mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 h-24"
              ></textarea>
            </div>

            {/* Category, Quantity, Price */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div>
                <label className="block text-gray-600 mb-1">Category</label>
                <input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-1">No. of Products</label>
                <select
                  value={numberofProduct}
                  onChange={(e) => setNumberofProduct(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  <option value="">Select Number</option>
                  {[...Array(100)].map((_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Price (INR)</label>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Discounted Price (INR)</label>
                <input
                  value={discountedprice}
                  onChange={(e) => setDiscountedPrice(e.target.value)}
                  type="number"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>

            </div>

            {/* MULTI IMAGE UPLOAD (B: one-by-one) */}
            <div>
              <label className="block text-gray-600 mb-1">Product Images (Max 4)</label>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                {imagesPreview.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    className="w-32 h-32 object-cover rounded-lg border"
                  />
                ))}
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleMultipleImages}
              />
            </div>

            {/* BUTTONS */}
            <div className="flex justify-end gap-3 mt-6">
              <button className="border border-gray-400 text-gray-700 px-4 py-2 rounded-lg">
                Cancel
              </button>

              <button
                className="bg-black text-white px-4 py-2 rounded-lg"
                onClick={handleEditCourse}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </form>
  );
};

export default EditProduct;
