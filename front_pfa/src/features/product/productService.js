import axios from "axios";

//get products
 const listProducts=async()=>{
    const response=await  axios.get(`/api/products/getAll`)
  
    return response.data
 }

 //create a product
const createProduct=async(product,thunkAPI)=>{
   const state=thunkAPI.getState()
   const userInfo=state.user.userLogin

   const config={
      headers:{
         Authorization:`Bearer ${userInfo.token}`
      }
   }
 
   const {data}= await axios.post(`/api/products/create`,product,config)
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
const {data}= await axios.post(`/api/reviews/create`,productId_and_review)
return data
}

//delete  a review
const deleteReview=async(idrev)=>{
const  {data}=await axios.delete(`/api/reviews/delete/${idrev}`)
return data
}

//get shops
const listShops=async()=>{
   const response=await  axios.get(`/api/shops/getAll`)
 
   return response.data
}

 //get a single product Details
 const listShopDetails=async(id)=>{
   const response=await axios.get(`/api/shops/${id}`)
   return response.data
}

//upadre a product
const updateShop=async(shop)=>{
  
  const {data}= await axios.put(`/api/shops/edit/${shop.id}`,shop)
  return data
}

//delete a product
const deleteProduct=async(id,thunkAPI)=>{
   const state=thunkAPI.getState()
   const userInfo=state.user.userLogin
   const config={
      headers:{
         Authorization:`Bearer ${userInfo.token}`
      }
   }
   await axios.delete(`/api/products/delete/${id}`,config)
}
 
 const productService={
    listProducts,
    createProduct,
    createShop,
    listProductDetails,
    productCreateReview,
    deleteReview,
    listShops,
    listShopDetails,
    updateShop,
    deleteProduct
 }

 export default productService