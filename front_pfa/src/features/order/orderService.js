import axios from "axios";

 //create a order
 const createOrder=async(order,thunkAPI)=>{
  //get user info
  const state=thunkAPI.getState()
  const userInfo=state.user.userLogin

  const config={
     headers:{
        Authorization:`Bearer ${userInfo.token}`
     }
  }
    const {data}= await axios.post(`/api/orders/create`,order,config)
    return data
  }

 // get all Demande of a shop
 const getAllShopOrders=async(shopId)=>{
  
    const {data}=await axios.get(`/api/orders/admin/getByShop/${shopId}`)
    return data
 }

 //update order
 const updateOrder=async(orderIdAndstatus,thunkAPI)=>{
 //get user info
 const state=thunkAPI.getState()
 const userInfo=state.user.userLogin

 const config={
    headers:{
       Authorization:`Bearer ${userInfo.token}`
    }
 }
   const {data}=await axios.put(`/api/orders/admin/update/${orderIdAndstatus.orderId}?status=${orderIdAndstatus.status1}`,{},config)
   return data
 }

  // get all orders of a user
  const getAllUserOrders=async(userId,thunkAPI)=>{
     //get user info
  const state=thunkAPI.getState()
  const userInfo=state.user.userLogin

  const config={
     headers:{
        Authorization:`Bearer ${userInfo.token}`
     }
  }
    const {data}=await axios.get(`/api/orders/byUser/${userId}`,config)
    return data
 }

   // delete Order
   const deleteOrder=async(orderId,thunkAPI)=>{
     //get user info
  const state=thunkAPI.getState()
  const userInfo=state.user.userLogin

  const config={
     headers:{
        Authorization:`Bearer ${userInfo.token}`
     }
  }
    const {data}=await axios.delete(`/api/orders/delete/${orderId}`,config)
    return data
 }


const orderService={
    createOrder,
    getAllShopOrders,
    updateOrder,
    getAllUserOrders,
    deleteOrder
}
export default orderService