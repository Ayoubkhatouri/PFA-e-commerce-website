import React,{useContext, useEffect, useState} from 'react'
import {  useNavigate } from "react-router-dom"
import { LinkContainer } from "react-router-bootstrap"
import {Table,Button} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getAllUsers ,deleteUser,reset1,addUserLogin} from '../features/user/userSlice.js'
import context1 from '../context1'
import { toast } from 'react-toastify'
import Meta from '../components/Meta'

const ListAllUsersScreen = () => {

    const dispatch=useDispatch()
    const {isEn}=useContext(context1)

    const user=useSelector(state=>state.user)
    const {isLoadingAllUsers,isErrorAllUsers,messageAllUsers,AllUsers}=user.AllUsersInfo
    const {userLogin}=user

    const {SuccessDelete,ErrorDelete}=user.deleteUserInfo
     //all Users except the  admin
     let allUsersNonthis=AllUsers.filter((u)=>u.id!==userLogin.id)

 
     const userLocalStorage=JSON.parse(localStorage.getItem('userLogin'))

    const navigate=useNavigate()
    useEffect(()=>{ 
        if(userLocalStorage.id!==userLogin.id)
        dispatch(addUserLogin)

        if(userLogin && userLogin.role==="SUPER_ADMIN"){
       
        dispatch(getAllUsers())
    
        }
        else{
            navigate('/login')
        }
        if(SuccessDelete){
            dispatch(getAllUsers())
            toast.success("User deleted")
            dispatch(reset1())
        }
        if(ErrorDelete){
            toast.error("Error deleting user")
            dispatch(reset1())
        }
    },[dispatch,navigate,userLogin,SuccessDelete,ErrorDelete,userLocalStorage.id])

    const deleteHndler=(id)=>{
        if(window.confirm("Vous etes sur ?")){
       dispatch(deleteUser(id))
  
    }
}




  return (
    <>
     <Meta title={isEn ? "All Users" : "Tous Les Utilisateurs"}/>
        <h1 className='addLine mb-4'>{isEn ? "Users":'Utilisateurs'}</h1> 
        {isLoadingAllUsers ? <Loader/> : isErrorAllUsers ? <Message variant='danger'>{messageAllUsers}</Message> : (
            <Table striped bordered="true" hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>{isEn ? "First Name":'Prenom'} </th>
                        <th>{isEn ? "Last Name":'Nom'} </th>
                        <th>{isEn ? "email":'Email'} </th>
                        <th>{isEn ? "Number":'Numero'} </th>
                        <th> Role</th>
                        <th></th>
                  
                    </tr>
                </thead>
                <tbody>
                    {allUsersNonthis.map((user)=>(
                        <tr key={user.id}>
                            <td>{user.firstname}</td>
                            <td>{user.lastname}</td>
                            <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                            <td>{user.tele}</td>
                            <td>{user.role}</td>
                        <td>
                                <LinkContainer to={`/admin/users/modifier/${user.id}`}>
                                <Button  className=' mx-2 mt-1 styleBtn'>
                                        <i className='fas fa-edit ' style={{color:'green'}}></i>
                                    </Button>
                                </LinkContainer>
                                <Button   className=' mx-2 mt-1 styleBtn' onClick={()=>deleteHndler(user.id)}>
                                <i className='fas fa-trash'  style={{color:'red'}}></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
    </>
  )
}

export default ListAllUsersScreen