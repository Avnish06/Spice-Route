import { useState, useEffect } from "react";
import axios from "axios"
import { serverUrl } from "../App.jsx";


function useProductInfo() {
    const [product, setProduct] = useState({})

useEffect(()=> {
     axios.get(serverUrl + "/api/v1/product/getallproducts")
    .then((res)=>  setProduct(res.data))
},[product])

console.log(product)
return product
}

export default useProductInfo;