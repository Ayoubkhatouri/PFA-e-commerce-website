import axios from "axios";

 //create a order
 const createOrder=async(order)=>{

    const {data}= await axios.post(`/api/orders/create`,order)
    return data
  }

 // get all Demande of a shop
 const getAllShopOrders=async(shopId)=>{
    const {data}=await axios.get(`/api/orders/getByShop/${shopId}`)
    return data
 }

 //update order
 const updateOrder=async(orderIdAndstatus)=>{
   console.log(orderIdAndstatus)
   const {data}=await axios.put(`/api/orders/update/${orderIdAndstatus.orderId}?status=${orderIdAndstatus.status1}`)
   return data
 }

const orderService={
    createOrder,
    getAllShopOrders,
    updateOrder
}
export default orderService