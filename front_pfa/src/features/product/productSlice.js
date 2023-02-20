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
    productDetails:{
        product:[],
        isError:false,
        isSuccess:false,
        isLoading:false,
        message:''
    },
    createReviewInfo:{
      
        Successcreate:false,
        Loadingcreate:false,
        Errorcreate:false,
        messageErrorcreate:''
    },
    deleteReviewInfo:{
        Successdelete:false,
        Loadingdelete:false,
        Errordelete:false,
        messageErrordelete:''
    },
    shopsDetails:{
        shops:[],
        isError:false,
        isSuccess:false,
        isLoading:false,
        message:''
    },
    shopDetails:{
        shop:{},
        isErrorshop:false,
        isSuccessshop:false,
        isLoadingshop:false,
        messageshop:''
    },
    updateShopInfo:{
        Successupdate:false,
        Loadingupdate:false,
        Errorupdate:false,
        messageupdate:''
    },
    deleteProductInfo:{
        SuccessDelete:false,
        LoadingDelete:false,
        ErrorDelete:false,
        messageDelete:''
    },
    updateProductInfo:{
        Successupdate:false,
        Loadingupdate:false,
        Errorupdate:false,
        messageupdate:''
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
       return  await productService.createProduct(product,thunkAPI)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//create a shop
export const createShop=createAsyncThunk('shop/create',async(shop,thunkAPI)=>{
    try {
       return  await productService.createShop(shop,thunkAPI)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//get product details
export const listProductDetails=createAsyncThunk('products/getOne',async(id,thunkAPI)=>{
    try {
        return await productService.listProductDetails(id)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//update a product
export const productCreateReview=createAsyncThunk('product/review',async(productId_and_review,thunkAPI)=>{
    try {
       return  await productService.productCreateReview(productId_and_review,thunkAPI)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//delete a review
export const deleteReview=createAsyncThunk("/reviews/deleteReview",async(idrev,thunkAPI)=>{
    try {
      return  await productService.deleteReview(idrev,thunkAPI)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


//get all shops
export const listShops=createAsyncThunk('shops/getAll',async(_,thunkAPI)=>{
    try {
        return await productService.listShops()
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//get shop details
export const listShopDetails=createAsyncThunk('shops/getOne',async(id,thunkAPI)=>{
    try {
        return await productService.listShopDetails(id)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//update a product
export const updateShop=createAsyncThunk('shop/update',async(shop,thunkAPI)=>{
    try {
       return  await productService.updateShop(shop,thunkAPI)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//delete a product
export const deleteProduct=createAsyncThunk('product/delete',async(id,thunkAPI)=>{
    try {
         await productService.deleteProduct(id,thunkAPI)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//update a product
export const updateProduct=createAsyncThunk('product/update',async(product,thunkAPI)=>{
    try {
       return  await productService.updateProduct(product,thunkAPI)
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
        },
        reset2:(state)=>{
            state.createReviewInfo={
        Successcreate:false,
        Loadingcreate:false,
        Errorcreate:false,
        messageErrorcreate:''
            }
        },
        reset3:(state)=>{
            state.deleteReviewInfo={
                Successdelete:false,
                Loadingdelete:false,
                Errordelete:false,
                messageErrordelete:''
            }
        },
        reset4:(state)=>{
            state.updateShopInfo={
                Successupdate:false,
                Loadingupdate:false,
                Errorupdate:false,
                messageupdate:''
            }
        },
        reset5:(state)=>{
            state.deleteProductInfo={
                SuccessDelete:false,
                LoadingDelete:false,
                ErrorDelete:false,
                messageDelete:''
            }
        },
        reset6:(state)=>{
            state.createShopInfo={
                createdShop: {},
                SuccesscreateShop:false,
                LoadingcreateShop:false,
                ErrorcreateShop:false,
                messagecreateShop:''
            }
        },
        reset7:(state)=>{
            state.updateProductInfo={
                Successupdate:false,
                Loadingupdate:false,
                Errorupdate:false,
                messageupdate:''
            }
        },
        reset8:(state)=>{
            state.productDetails={
                product:[],
        isError:false,
        isSuccess:false,
        isLoading:false,
        message:''
            }
        },
    },
    
    extraReducers:(builder)=>{
        builder
        .addCase(listProducts.pending,(state)=>{
            state.productsDetails.isLoading=true
        })
        .addCase(listProducts.fulfilled,(state,action)=>{
            state.productsDetails.isLoading=false
            state.productsDetails.isSuccess=true
            state.productsDetails.products=action.payload 
        
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

       
            .addCase(listProductDetails.pending,(state)=>{
                state.productDetails.isLoading=true
            })
            .addCase(listProductDetails.fulfilled,(state,action)=>{
                state.productDetails.isLoading=false
                state.productDetails.isSuccess=true
                state.productDetails.product=action.payload 
            
            })
            .addCase(listProductDetails.rejected,(state,action)=>{
                state.productDetails.isLoading=false
                state.productDetails.isError=true
                state.productDetails.message=action.payload 
            })

            .addCase(productCreateReview.pending,(state)=>{
                state.createReviewInfo.Loadingcreate=true
            })
                .addCase(productCreateReview.fulfilled,(state,action)=>{
                state.createReviewInfo.Loadingcreate=false
                state.createReviewInfo.Successcreate= true   
                
            })
                .addCase(productCreateReview.rejected,(state,action)=>{
                    state.createReviewInfo.Loadingcreate=false
                    state.createReviewInfo.Errorcreate= true  
                    state.createReviewInfo.messageErrorcreate=action.payload
            })

            .addCase(deleteReview.pending,(state)=>{
                state.deleteReviewInfo.Loadingdelete=true
            })
                .addCase(deleteReview.fulfilled,(state,action)=>{
                state.deleteReviewInfo.Loadingdelete=false
                state.deleteReviewInfo.Successdelete= true   
              
            })
                .addCase(deleteReview.rejected,(state,action)=>{
                    state.deleteReviewInfo.Loadingdelete=false
                    state.deleteReviewInfo.Errordelete= true  
                    state.deleteReviewInfo.messageErrordelete=action.payload
            })

            .addCase(listShops.pending,(state)=>{
                state.shopsDetails.isLoading=true
            })
            .addCase(listShops.fulfilled,(state,action)=>{
                state.shopsDetails.isLoading=false
                state.shopsDetails.isSuccess=true
                state.shopsDetails.shops=action.payload 
            
            })
            .addCase(listShops.rejected,(state,action)=>{
                state.shopsDetails.isLoading=false
                state.shopsDetails.isError=true
                state.shopsDetails.message=action.payload 
            })

            .addCase(listShopDetails.pending,(state)=>{
                state.shopDetails.isLoadingshop=true
            })
            .addCase(listShopDetails.fulfilled,(state,action)=>{
                state.shopDetails.isLoadingshop=false
                state.shopDetails.isSuccessshop=true
                state.shopDetails.shop=action.payload 
            })
            .addCase(listShopDetails.rejected,(state,action)=>{
                state.shopDetails.isLoadingshop=false
                state.shopDetails.isErrorshop=true
                state.shopDetails.messageshop=action.payload 
            })

            .addCase(updateShop.pending,(state)=>{
                state.updateShopInfo.Loadingupdate=true
            })
                .addCase(updateShop.fulfilled,(state,action)=>{
                state.updateShopInfo.Loadingupdate=false
                state.updateShopInfo.Successupdate= true       
            })
                .addCase(updateShop.rejected,(state,action)=>{
                    state.updateShopInfo.Loadingupdate=false
                    state.updateShopInfo.Errorupdate= true  
                    state.updateShopInfo.messageupdate=action.payload 
            })

            .addCase(deleteProduct.pending,(state)=>{
                state.deleteProductInfo.LoadingDelete=true
            })
                .addCase(deleteProduct.fulfilled,(state,action)=>{
                state.deleteProductInfo.LoadingDelete=false
                state.deleteProductInfo.SuccessDelete= true       
        
            })
                .addCase(deleteProduct.rejected,(state,action)=>{
                    state.deleteProductInfo.LoadingDelete=false
                    state.deleteProductInfo.ErrorDelete= true  
                    state.deleteProductInfo.messageDelete=action.payload 
            })

            .addCase(updateProduct.pending,(state)=>{
                state.updateProductInfo.Loadingupdate=true
            })
                .addCase(updateProduct.fulfilled,(state,action)=>{
                state.updateProductInfo.Loadingupdate=false
                state.updateProductInfo.Successupdate= true       
            })
                .addCase(updateProduct.rejected,(state,action)=>{
                    state.updateProductInfo.Loadingupdate=false
                    state.updateProductInfo.Errorupdate= true  
                    state.updateProductInfo.messageupdate=action.payload 
            })
    }
})

export const {reset,reset2,reset3,reset4,reset5,reset6,reset7,reset8}=productSlice.actions
export default productSlice.reducer