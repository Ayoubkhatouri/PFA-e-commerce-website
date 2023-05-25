import React,{useState,useEffect,useContext} from 'react'
import {  useNavigate } from "react-router-dom"
import {Form ,Button, Row ,Col, Table} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Spinner from '../components/Spinner'
import { getUserDetails,updateUser,reset2 } from '../features/user/userSlice'
import { toast } from 'react-toastify'
import Meta from '../components/Meta'
import context1 from '../context1'



 const ProfileScreen = () => {
   
    const dispatch=useDispatch()

    const {isEn} = useContext(context1)
    const navigate=useNavigate()
    const user=useSelector(state=>state.user)
    const {userLogin}=user


    const {LoadinggetUserDetails,userDetails}=user.UserDetailsInfo

    const {isLoadingUpdate,isErrorUpdate,isSuccessUpdate,messageUpdate}=user.userUpdateInfo

    const [nom,setName]=useState("")
    const [prenom,setPrenom]=useState("")
    const [email,setEmail]=useState("")
    const [telephone,setTelephone]=useState("")
    const [ville,setVille]=useState("")
    const [adresse,setAdresse]=useState("")
    const [role,setRole]=useState("")
    
    

 

    useEffect(()=>{
     if(userLogin)
        dispatch(getUserDetails(userLogin.id))
    if(userDetails.lastname){
        setName(userDetails.lastname)
        setPrenom(userDetails.firstname )
        setEmail(userDetails.email)
        setTelephone(userDetails.tele)
        setVille(userDetails.ville)
        setAdresse(userDetails.adresse)
        setRole(userDetails.role)
    }
    if(isSuccessUpdate){
        toast.success("User updated")
        dispatch(getUserDetails(userLogin.id))
        
        dispatch(reset2())
        navigate("/")

    }    
    if(isErrorUpdate){
    toast.error("Error Updating User")
    dispatch(reset2())
    }
    
    },[userDetails.role,isSuccessUpdate,isErrorUpdate,dispatch,userLogin,userLogin.userId,navigate,userDetails.email,userDetails.ville,userDetails.tele,userDetails.adresse,userDetails.lastname,userDetails.firstname])

const submitHandler=(e)=>{
    e.preventDefault()
    let id=userDetails.id
 dispatch(updateUser({id,lastname:nom,firstname:prenom,email,tele:telephone,ville,adresse,role}))


 }

 
  if(isLoadingUpdate || LoadinggetUserDetails)
  return <Spinner/>

  return(<>
  <Meta title={isEn ? "Profile" : "Profile"}/>
   <Row>
    <Col >
    <h2  className='addLine mb-5 mt-3 '>{userLogin.firstname} Profile </h2>

      
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='nom'>
                <Form.Label>Nom </Form.Label>
                <Form.Control type='nom' placeholder='Entrer le Nom' value={nom}
                onChange={(e)=>setName(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='prenom'>
                <Form.Label>Prenom </Form.Label>
                <Form.Control type='nom' placeholder='Entrer le Prenom' value={prenom}
                onChange={(e)=>setPrenom(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='tete' className='mt-3'>
                <Form.Label>Telephone</Form.Label>
                <Form.Control type='tele' placeholder='Numero de Telephone' value={telephone}
                onChange={(e)=>setTelephone(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='ville' className='mt-3'>
                <Form.Label>Ville</Form.Label>
                <Form.Control type='text' placeholder='Ville' value={ville}
                onChange={(e)=>setVille(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='adresse' className='mt-3'>
                <Form.Label>Adresse</Form.Label>
                <Form.Control type='text' placeholder='Adresse' value={adresse}
                onChange={(e)=>setAdresse(e.target.value)}> 
                </Form.Control>
            </Form.Group>
         
           
            <Button type='submit' variant='primary' className='mt-3'>Modifié</Button>
        </Form>
    </Col>
    
  </Row>
  </>)
}

export default ProfileScreen
