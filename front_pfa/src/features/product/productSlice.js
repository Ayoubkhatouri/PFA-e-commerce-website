import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";

const initialState={
    productsDetails:{
        products:[],
        isError:false,
        isSuccess:false,
        isLoading:false,
        message:''
    },
    createProductInfo:{
        createdProduct: {},
        Successcreate:false,
        Loadingcreate:false,
        Errorcreate:false,
        messagecreate:''
    },
    createShopInfo:{
        createdShop: {},
        SuccesscreateShop:false,
        LoadingcreateShop:false,
        ErrorcreateShop:false,
        messagecreateShop:''
    },
}

//get all Products
export const listProducts=createAsyncThunk('products/getAll',async(_,thunkAPI)=>{
    try {
        return await productService.listProducts()
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


//create a product
export const createProduct=createAsyncThunk('product/create',async(product,thunkAPI)=>{
    try {
       return  await productService.createProduct(product)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//create a shop
export const createShop=createAsyncThunk('shop/create',async(shop,thunkAPI)=>{
    try {
       return  await productService.createShop(shop)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})










export const productSlice=createSlice({
    name:'product',
    initialState,
    reducers:{
        reset:(state)=>{
            state.createProductInfo={
                createdProduct: {},
                Successcreate:false,
                Loadingcreate:false,
                Errorcreate:false,
                messagecreate:''
            }
        }

    },
    
    extraReducers:(builder)=>{
        builder
        .addCase(listProducts.pending,(state)=>{
            state.productsDetails.isLoading=true
        })
        .addCase(listProducts.fulfilled,(state,action)=>{
            state.productsDetails.isLoading=false
            state.productsDetails.isSuccess=true
            state.productsDetails.products=action.payload //cause we sed more data in payload (porductController.js)
        
        })
        .addCase(listProducts.rejected,(state,action)=>{
            state.productsDetails.isLoading=false
            state.productsDetails.isError=true
            state.productsDetails.message=action.payload 
        })

        .addCase(createProduct.pending,(state)=>{
            state.createProductInfo.Loadingcreate=true
        })
            .addCase(createProduct.fulfilled,(state,action)=>{
            state.createProductInfo.Loadingcreate=false
            state.createProductInfo.Successcreate= true       
            state.createProductInfo.createdProduct=action.payload
        })
            .addCase(createProduct.rejected,(state,action)=>{
                state.createProductInfo.Loadingcreate=false
                state.createProductInfo.Errorcreate= true  
                state.createProductInfo.messagecreate=action.payload 
        })


        .addCase(createShop.pending,(state)=>{
            state.createShopInfo.LoadingcreateShop=true
        })
            .addCase(createShop.fulfilled,(state,action)=>{
            state.createShopInfo.LoadingcreateShop=false
            state.createShopInfo.SuccesscreateShop= true       
            state.createShopInfo.createdShop=action.payload
        })
            .addCase(createShop.rejected,(state,action)=>{
                state.createShopInfo.LoadingcreateShop=false
                state.createShopInfo.ErrorcreateShop= true  
                state.createShopInfo.messagecreateShop=action.payload 
        })

    }
})

export const {reset}=productSlice.actions
export default productSlice.reducer