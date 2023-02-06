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
 
  //create a shop
const createShop=async(shop)=>{
 
   const config={
      headers:{
       'Content-Type':'application/json'
      }
   }

  const {data}= await axios.post(`/api/shops/create`,shop)
  return data
}

 //get a single product Details
 const listProductDetails=async(id)=>{
   const response=await axios.get(`/api/products/${id}`)
   return response.data

}

//create a review
const productCreateReview=async(productId_and_review)=>{
   //get user info
console.log(productId_and_review)
return await axios.post(`/api/reviews/create`,productId_and_review.review)
}


 
 const productService={
    listProducts,
    createProduct,
    createShop,
    listProductDetails,
    productCreateReview
 }

 export default productService