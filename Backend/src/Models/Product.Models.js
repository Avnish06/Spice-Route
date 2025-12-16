import mongoose from "mongoose"
import { type } from "os"
import { ref } from "process"

const productschema = new mongoose.Schema({
name:{
type:String,
required: true
},
category:{
type: String,
},
company:{
type: String,
},
price:{
type: Number,
},
discountedprice:{
type: Number,
},
description:{
type: String,
required: true
},
numberofProduct:{
type: String,
},
purchaser:[{
    type:mongoose.Schema.Types.ObjectId,
    ref: "User"
}],
isPublished:{
    type:Boolean,
    default: false
},
reviews:[{
type: mongoose.Schema.Types.ObjectId,
ref: 'Review'
}],
ImageUrl: {
  type: [String],
  default: []
}
},{timestamps: true})

export const Product = mongoose.model("Product", productschema)