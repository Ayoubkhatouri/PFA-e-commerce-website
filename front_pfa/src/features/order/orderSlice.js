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
        }
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
    }
})

export const {reset}=orderSlice.actions
export default orderSlice.reducer