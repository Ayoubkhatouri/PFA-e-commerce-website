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
const getUserDetails=async(id)=>{
    const config={
        headers:{
           // Authorization:`Bearer ${token}`
        }
    }
    const {data}=await axios.get(`/api/users/${id}`)
    return data
}

//Update User Profile
const updateUser=async(userdata)=>{
   
    const {data}=await axios.put(`/api/users/update/${userdata.id}`,userdata)
   
    return data
}

//get all Users Profile
const getAllUsers=async()=>{
    
    const {data}=await axios.get('/api/users/getAll')

    return data
}


//Delete User
const deleteUser=async(id)=>{
    
    await axios.delete(`/api/users/delete/${id}`)
}

//get user details
const getSingleUser=async(id)=>{
    const config={
        headers:{
           // Authorization:`Bearer ${token}`
        }
    }
    const {data}=await axios.get(`/api/users/supadmin/${id}`)
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