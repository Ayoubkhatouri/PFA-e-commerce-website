import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

//get the user from local storage
const userLogin=JSON.parse(localStorage.getItem('userLogin'))

const initialState={
    userLogin:userLogin ? userLogin : null,
    
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:'',
    UserDetailsInfo:{
        userDetails:{},
        SuccessgetUserDetails:false,    
        LoadinggetUserDetails:false,
        ErrorgetUserDetails:false,
        messagegetUserDetails:''
    },
}



//login user
export const login=createAsyncThunk('user/login',async(userData,thunkAPI)=>{
    try {
        return await userService.login(userData) 
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)

    }
})


//register user
export const register=createAsyncThunk('user/register',async(userData,thunkAPI)=>{
    try {
        return await userService.register(userData) 
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//get user profile
export const getUserDetails=createAsyncThunk('user/details',async(id,thunkAPI)=>{
    try {
       
        return await userService.getUserDetails(id)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})



export const userSlice =createSlice({
    name:'user',
    initialState,
    reducers:{
        reset:(state)=>{}
    },
    extraReducers:(builder)=>{
        builder
        .addCase(login.pending,(state)=>{
        state.isLoading=true
    })
        .addCase(login.fulfilled,(state,action)=>{
        state.isLoading=false
        state.isSuccess= true       
        state.userLogin=action.payload 
    })
        .addCase(login.rejected,(state,action)=>{
        state.isLoading=false
        state.isError=true
        state.message=action.payload
        state.userLogin=null
    })

///////////////////////////////////

    .addCase(register.pending,(state)=>{
        state.isLoading=true
    })
        .addCase(register.fulfilled,(state,action)=>{
        state.isLoading=false
        state.isSuccess= true       
        state.userLogin=action.payload 
    })
        .addCase(register.rejected,(state,action)=>{
        state.isLoading=false
        state.isError=true
        state.message=action.payload
        state.userLogin=null
    })


       /////////////////////////
.addCase(getUserDetails.pending,(state)=>{
    state.UserDetailsInfo.LoadinggetUserDetails=true
})
    .addCase(getUserDetails.fulfilled,(state,action)=>{
    state.UserDetailsInfo.LoadinggetUserDetails=false
    state.UserDetailsInfo.SuccessgetUserDetails= true       
    state.UserDetailsInfo.userDetails=action.payload
})
    .addCase(getUserDetails.rejected,(state,action)=>{
    state.UserDetailsInfo.LoadinggetUserDetails=false
    state.UserDetailsInfo.ErrorgetUserDetails=true
    state.UserDetailsInfo.messagegetUserDetails=action.payload 
})




    }
})


export const {reset}=userSlice.actions
export default userSlice.reducer