import axios from "axios";

//get products
 const listProducts=async()=>{
    const response=await  axios.get(`/api/products/getAll`)
  
    return response.data
 }

 //create a product
const createProduct=async(product)=>{
 
    const config={
       headers:{
        'Content-Type':'application/json'
       }
    }
 
   const {data}= await axios.post(`/api/products/create`,product)
   return data
 }
 


 
 const productService={
    listProducts,
    createProduct
 }

 export default productService