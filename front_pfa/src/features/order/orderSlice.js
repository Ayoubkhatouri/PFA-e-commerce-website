import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";

const initialState={
    createOrderInfo:{
        createdProduct: {},
        SuccesscreateOrder:false,
        LoadingcreateOrder:false,
        ErrorcreateOrder:false,
        messagecreateOrder:''
    },
    getAllShopOrdersReceivedInfo:{
        AllShopOrders:[],   
        LoadinggetAllShopReceivedOrders:false,
        ErrorgetAllShopReceivedOrders:false,
        messagegetAllShopReceivedOrders:'',
        SuccessgetAllShopReceivedOrders:false
    },
    updateOrderInfo:{
        updatedOrder: {},
        SuccessupdateOrder:false,
        LoadingupdateOrder:false,
        ErrorupdateOrder:false,
        messageupdateOrder:''
    },

    getAllUserOrdersMadeInfo:{
        AllUserOrders:[],   
        LoadinggetAllUserMadeOrders:false,
        ErrorgetAllUserMadeOrders:false,
        messagegetAllUserMadeOrders:'',
        SuccessgetAllUserMadeOrders:false
    },
    deleteOrderInfo:{
        deletedOrder: {},
        SuccessdeleteOrder:false,
        LoadingdeleteOrder:false,
        ErrordeleteOrder:false,
        messagedeleteOrder:''
    },
}

//create a order
export const createOrder=createAsyncThunk('order/create',async(order,thunkAPI)=>{
    try {
       return  await orderService.createOrder(order)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//get all Demande
export const getAllShopOrders=createAsyncThunk("/demande/getAll",async(shopId,thunkAPI)=>{
    try {
       return await orderService.getAllShopOrders(shopId)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//update a order
export const updateOrder=createAsyncThunk('order/update',async(orderIdAndstatus,thunkAPI)=>{
    try {
       return  await orderService.updateOrder(orderIdAndstatus)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//get all user Orders
export const getAllUserOrders=createAsyncThunk("/demande/getAllOfUser",async(userId,thunkAPI)=>{
    try {
       return await orderService.getAllUserOrders(userId)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


//get all user Orders
export const deleteOrder=createAsyncThunk("/demande/delete",async(orderId,thunkAPI)=>{
    try {
       return await orderService.deleteOrder(orderId)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})






export const orderSlice=createSlice({
    name:"order",
    initialState,
    reducers:{
        reset:(state)=>{
            state.createOrderInfo={
                createdProduct: {},
                SuccesscreateOrder:false,
                LoadingcreateOrder:false,
                ErrorcreateOrder:false,
                messagecreateOrder:''
            }
        },
        reset1:(state)=>{
            state.updateOrderInfo={
                updatedProduct: {},
                SuccessupdateOrder:false,
                LoadingupdateOrder:false,
                ErrorupdateOrder:false,
                messageupdateOrder:''
            }
        },
        reset3:(state)=>{
            state.deleteOrderInfo={
                deletedOrder: {},
                SuccessdeleteOrder:false,
                LoadingdeleteOrder:false,
                ErrordeleteOrder:false,
                messagedeleteOrder:''
            }
        },
        

    },
    extraReducers:(builder)=>{
        builder
        .addCase(createOrder.pending,(state)=>{
            state.createOrderInfo.LoadingcreateOrder=true
        })
            .addCase(createOrder.fulfilled,(state,action)=>{
            state.createOrderInfo.LoadingcreateOrder=false
            state.createOrderInfo.SuccesscreateOrder= true       
            state.createOrderInfo.createdProduct=action.payload
        })
            .addCase(createOrder.rejected,(state,action)=>{
                state.createOrderInfo.LoadingcreateOrder=false
                state.createOrderInfo.ErrorcreateOrder= true  
                state.createOrderInfo.messagecreateOrder=action.payload 
        })

          ///////////////////////////////
  .addCase(getAllShopOrders.pending,(state)=>{
    state.getAllShopOrdersReceivedInfo.LoadinggetAllShopReceivedOrders=true
})
    .addCase(getAllShopOrders.fulfilled,(state,action)=>{
        state.getAllShopOrdersReceivedInfo.AllShopOrders=action.payload
    state.getAllShopOrdersReceivedInfo.LoadinggetAllShopReceivedOrders=false
    state.getAllShopOrdersReceivedInfo.SuccessgetAllShopReceivedOrders= true       
})
    .addCase(getAllShopOrders.rejected,(state,action)=>{
        state.getAllShopOrdersReceivedInfo.LoadinggetAllShopReceivedOrders=false
        state.getAllShopOrdersReceivedInfo.ErrorgetAllShopReceivedOrders= true  
        state.getAllShopOrdersReceivedInfo.messagegetAllShopReceivedOrders=action.payload 
})
////////////////////////////////////////
.addCase(updateOrder.pending,(state)=>{
    state.updateOrderInfo.LoadingupdateOrder=true
})
    .addCase(updateOrder.fulfilled,(state,action)=>{
    state.updateOrderInfo.LoadingupdateOrder=false
    state.updateOrderInfo.SuccessupdateOrder= true       
    state.updateOrderInfo.updatedProduct=action.payload
})
    .addCase(updateOrder.rejected,(state,action)=>{
        state.updateOrderInfo.LoadingupdateOrder=false
        state.updateOrderInfo.ErrorupdateOrder= true  
        state.updateOrderInfo.messageupdateOrder=action.payload 
})
///////////////////////////
.addCase(getAllUserOrders.pending,(state)=>{
    state.getAllUserOrdersMadeInfo.LoadinggetAllUserMadeOrders=true
})
    .addCase(getAllUserOrders.fulfilled,(state,action)=>{
        state.getAllUserOrdersMadeInfo.AllUserOrders=action.payload
    state.getAllUserOrdersMadeInfo.LoadinggetAllUserMadeOrders=false
    state.getAllUserOrdersMadeInfo.SuccessgetAllUserMadeOrders= true       
})
    .addCase(getAllUserOrders.rejected,(state,action)=>{
        state.getAllUserOrdersMadeInfo.LoadinggetAllUserMadeOrders=false
        state.getAllUserOrdersMadeInfo.ErrorgetAllUserMadeOrders= true  
        state.getAllUserOrdersMadeInfo.messagegetAllUserMadeOrders=action.payload 
})
////////////////////////////////////////
.addCase(deleteOrder.pending,(state)=>{
    state.deleteOrderInfo.LoadingdeleteOrder=true
})
    .addCase(deleteOrder.fulfilled,(state,action)=>{
    state.deleteOrderInfo.LoadingdeleteOrder=false
    state.deleteOrderInfo.SuccessdeleteOrder= true       
    state.deleteOrderInfo.deletedProduct=action.payload
})
    .addCase(deleteOrder.rejected,(state,action)=>{
        state.deleteOrderInfo.LoadingdeleteOrder=false
        state.deleteOrderInfo.ErrordeleteOrder= true  
        state.deleteOrderInfo.messagedeleteOrder=action.payload 
})


    }
})

export const {reset,reset1,reset3}=orderSlice.actions
export default orderSlice.reducer