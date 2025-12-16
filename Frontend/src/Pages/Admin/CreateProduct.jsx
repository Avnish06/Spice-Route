import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import axios from "axios";
import { serverUrl } from "../../App";

const CreateProduct = () => {

    const navigate = useNavigate()       

    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [loading, setLoading] = useState(false)

       const createCourse = async() => {
       setLoading(true)
       try {
          const result = await axios.post(serverUrl + "/api/v1/product/createproduct", {name, description}, {withCredentials: true})
            console.log(result.data)
            toast.success("Product created successfully")
            setLoading(false)
            navigate("/products")
       } catch (error) {
        setLoading(false)
        toast.error(error?.response?.data?.message)
       }
       }


  return (
    <div className="min-h-screen flex items-center justify-center bg-green-200 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center mb-4">
          <button className="text-lg font-bold mr-2">←</button>
          <h2 className="text-xl font-semibold">Create Product</h2>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input
            type="text"
            placeholder="Enter product name"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
             value={name}
             onChange={(e)=> setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            placeholder="Enter product description"
            className="w-full border border-gray-300 rounded-lg p-2 h-24 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={description}
             onChange={(e)=> setDescription(e.target.value)}
          />
        </div>

        <button className="w-full bg-black text-white rounded-lg py-2 font-medium hover:bg-gray-800" onClick={createCourse}>
        {loading?<ClipLoader color="white" size={30} />:"Create Product"}
        </button>
      </div>
    </div>
  );
};

export default CreateProduct;
