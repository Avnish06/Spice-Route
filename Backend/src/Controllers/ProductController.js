import { Product } from "../Models/Product.Models.js"
import uploadoncloudinary from "../config/cloudinary.js"


export const createProduct = async(req, res)=> {
  try {
    const {name, description } = req.body
    if(!name || !description)
    {
      return res.status(400).json({message:"Neccessary details is not there"})
    }

    const product = await Product.create({
      name,
      description,
      creator: req.userId
    })
      
      return res.status(200).json({message:"Product created Successfully"})
  } catch (error) {
      console.error("Error in createProduct:", error); // 👈 log it here
     return res.status(500).json({message:"Something went wrong while creating the Product"})
  }
}

export const getPublishedProduct = async(req, res) => {
try {
    const products = await Product.find({isPublished: true})
    
    if(!products) 
    {
        return res.status(400).json({message: "Products not found"})
    }
    return res.status(201).json(products)
} catch (error) {
    return res.status(500).json({message:`Something went wrong while finding your course ${error}`})
}
}
export const editProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    let {
      Name,
      price,
      description,
      numberofProduct,
      category,
      companyName,
      isPublished,
      discountedprice,
    } = req.body;

    // Find product first
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }

    let newImageUrls = [];

    // If new images are uploaded (array)
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploaded = await uploadoncloudinary(file.path);

        console.log("UPLOAD RESPONSE:", uploaded);

        if (uploaded && uploaded.secure_url) {
          newImageUrls.push(uploaded.secure_url);
        }
      }
    }

    // Merge old + new (max 4 allowed)
    let finalImages = product.ImageUrl || [];

    if (newImageUrls.length > 0) {
      finalImages = [...finalImages, ...newImageUrls].slice(0, 4);
    }

    // Prepare fields to update
    const updateData = {
      name: Name,
      price,
      description,
      numberofProduct,
      category,
      company: companyName,
      isPublished,
      discountedprice,
      ImageUrl: finalImages,
    };

    // Remove undefined keys
    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true }
    );

    return res.status(202).json({ updatedProduct });
  } catch (error) {
    console.error("Update product error:", error);
    return res.status(500).json({
      message: "Something went wrong while updating the product",
      error: error.message,
    });
  }
};
export const removeProduct = async(req, res) => {
try {
  let {productId} = req.params

  let products = await Product.findById(productId)
  if(!productId)
  {
   return res.status(400).json({message:"Product ot found"})
  }
  let product = await Product.findByIdAndDelete(productId,{new:true})

  res.status(200).json({product}) 
} catch (error) {
  return res.status(400).json({message:`something went wrong while deleting the  Product ${error}`})
}
}
export const getAllProducts = async(req, res) => {

try {
  const products = await Product.find()
  res.status(200).json({message:"Sending you all the product", products})
  
} catch (error) {
  res.status(500).json({message:"Something went wrong"})
}
}
export const getProductById = async(req, res) => {
try {
  const {productId} = req.params
  const product = await Product.findById(productId)
  res.status(200).json(product)

} catch (error) {
  res.status(500).json({message:"Error while finding the product by Id"})
}
}
export const getisPublishedProduct = async(req, res) => {
   try {
    const product = await Product.find({isPublished: true})
    if(!product)
    {
     res.status(400).json({message:"There is no product which is published"})
    }
    res.status(200).json(product)
   } catch (error) {
     res.status(500).json({message:"Something went wrong whle finding your pubished product"})
   }
}




