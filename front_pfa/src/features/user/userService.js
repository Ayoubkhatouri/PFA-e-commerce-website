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


const userService={
    login,
    register
}

export default userService