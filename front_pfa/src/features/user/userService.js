import axios from "axios";


//Login user
const login=async(userdata)=>{

    const {data}=await axios.post('/api/users/auth/authenticate',userdata)
    if(data){
        localStorage.setItem('userLogin',JSON.stringify(data))
    }
    return data
}

//Register user
const register=async(userdata)=>{

    const {data}=await axios.post('/api/users/auth/register',userdata)
    if(data){
        localStorage.setItem('userLogin',JSON.stringify(data))
    }
    return data
}

//get user details
const getUserDetails=async(id,thunkAPI)=>{
    //get user Login
    const state=thunkAPI.getState()
    const userLogin=state.user.userLogin

    const config={
        headers:{
            Authorization:`Bearer ${userLogin.token}`
        }
    }
    const {data}=await axios.get(`/api/users/${id}`,config)
    return data
}

//Update User Profile
const updateUser=async(userdata,thunkAPI)=>{
    //get user Login
    const state=thunkAPI.getState()
    const userLogin=state.user.userLogin

    const config={
        headers:{
            Authorization:`Bearer ${userLogin.token}`
        }
    }
    const {data}=await axios.put(`/api/users/update/${userdata.id}`,userdata,config)
   
    return data
}

//get all Users Profile
const getAllUsers=async(thunkAPI)=>{
     //get user Login
     const state=thunkAPI.getState()
     const userLogin=state.user.userLogin
 
     const config={
         headers:{
             Authorization:`Bearer ${userLogin.token}`
         }
     }
    const {data}=await axios.get('/api/users/supadmin/getAll',config)

    return data
}


//Delete User
const deleteUser=async(id,thunkAPI)=>{
    const state=thunkAPI.getState()
    const userLogin=state.user.userLogin
    const config={
        headers:{
            Authorization:`Bearer ${userLogin.token}`
        }
    }
    await axios.delete(`/api/users/supadmin/delete/${id}`,config)
}

//get user details
const getSingleUser=async(id,thunkAPI)=>{
     //get user Login
     const state=thunkAPI.getState()
     const userLogin=state.user.userLogin
 
     const config={
         headers:{
             Authorization:`Bearer ${userLogin.token}`
         }
     }
    const {data}=await axios.get(`/api/users/supadmin/${id}`,config)
    return data
}

const userService={
    login,
    register,
    getUserDetails,
    updateUser,
    getAllUsers,
    deleteUser,
    getSingleUser
}

export default userService