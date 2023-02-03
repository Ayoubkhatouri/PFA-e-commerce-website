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


const userService={
    login,
    register,
    getUserDetails
}

export default userService