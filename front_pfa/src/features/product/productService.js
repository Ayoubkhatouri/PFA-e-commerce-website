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
 
   const {data}= await axios.post(`/api/products/admin/create`,product,config)
   return data
 }

 //upadre a product
const updateProduct=async(product,thunkAPI)=>{
   //get user info
   const state=thunkAPI.getState()
   const userInfo=state.user.userLogin

   const config={
      headers:{
         Authorization:`Bearer ${userInfo.token}`
      }
   }

  const {data}= await axios.put(`/api/products/admin/update/${product.id}`,product,config)
  return data
}
 
  //create a shop
const createShop=async(shop,thunkAPI)=>{
   //get user info
   const state=thunkAPI.getState()
   const userInfo=state.user.userLogin

   const config={
      headers:{
         Authorization:`Bearer ${userInfo.token}`
      }
   }

  const {data}= await axios.post(`/api/shops/create`,shop,config)
  return data
}

 //get a single product Details
 const listProductDetails=async(id)=>{
   const response=await axios.get(`/api/products/${id}`)
   return response.data

}

//create a review
const productCreateReview=async(productId_and_review,thunkAPI)=>{
   //get user info
   const state=thunkAPI.getState()
   const userInfo=state.user.userLogin

   const config={
      headers:{
         Authorization:`Bearer ${userInfo.token}`
      }
   }
const {data}= await axios.post(`/api/reviews/create`,productId_and_review,config)
return data
}

//delete  a review
const deleteReview=async(idrev,thunkAPI)=>{
    //get user info
    const state=thunkAPI.getState()
    const userInfo=state.user.userLogin
 
    const config={
       headers:{
          Authorization:`Bearer ${userInfo.token}`
       }
    }
const  {data}=await axios.delete(`/api/reviews/delete/${idrev}`,config)
return data
}

//get shops
const listShops=async()=>{
   const response=await  axios.get(`/api/shops/anyOne/getAll`)
 
   return response.data
}

 //get a single product Details
 const listShopDetails=async(id)=>{
   const response=await axios.get(`/api/shops/anyOne/${id}`)
   return response.data
}

//upadre a product
const updateShop=async(shop,thunkAPI)=>{
   const state=thunkAPI.getState()
   const userInfo=state.user.userLogin
   const config={
      headers:{
         Authorization:`Bearer ${userInfo.token}`
      }
   }
  const {data}= await axios.put(`/api/shops/admin/edit/${shop.id}`,shop,config)
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
   await axios.delete(`/api/products/admin/delete/${id}`,config)
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
    deleteProduct,
    updateProduct
 }

 export default productService