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

const orderService={
    createOrder,
    getAllShopOrders
}
export default orderService