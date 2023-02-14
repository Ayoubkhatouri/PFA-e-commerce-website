import React,{useState,useEffect} from 'react'
import {  useNavigate, useParams } from "react-router-dom"
import {Form ,Button, Row ,Col, Table} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Spinner from '../components/Spinner'
import { getSingleUser,updateUser,reset } from '../features/user/userSlice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'



 const ProfileScreen = () => {
   
    const dispatch=useDispatch()
    const params=useParams()

    const navigate=useNavigate()
    const user=useSelector(state=>state.user)
    const {userLogin}=user


    const {LoadinggetUser,ErrorgetUser,SingleuserData}=user.SingleUserDetails
    const {isLoadingUpdate,isErrorUpdate,isSuccessUpdate,messageUpdate}=user.userUpdateInfo

    const [nom,setName]=useState("")
    const [prenom,setPrenom]=useState("")
    const [email,setEmail]=useState("")
    const [telephone,setTelephone]=useState("")
    const [ville,setVille]=useState("")
    const [adresse,setAdresse]=useState("")
    const [role,setRole]=useState("")
    
    

 

    useEffect(()=>{
 
        dispatch(getSingleUser(params.id))
    if(SingleuserData.lastname){
        setName(SingleuserData.lastname)
        setPrenom(SingleuserData.firstname )
        setEmail(SingleuserData.email)
        setTelephone(SingleuserData.tele)
        setVille(SingleuserData.ville)
        setAdresse(SingleuserData.adresse)
        setRole(SingleuserData.role)
    }
    if(isSuccessUpdate){
        toast.success("User updated")
        dispatch(reset())
        navigate("/users/all")

    }    
    if(isErrorUpdate){
    toast.error("Error Updating User")
    dispatch(reset())
    }
    
    },[isSuccessUpdate,isErrorUpdate,dispatch,userLogin,params.id,navigate,SingleuserData.role,SingleuserData.email,SingleuserData.ville,SingleuserData.tele,SingleuserData.adresse,SingleuserData.lastname,SingleuserData.firstname])

const submitHandler=(e)=>{
    e.preventDefault()
    let id=params.id
 dispatch(updateUser({id,lastname:nom,firstname:prenom,email,tele:telephone,ville,adresse,role}))


 }

  if(isLoadingUpdate)
  return <Spinner/>

  return <Row>
    <Col >
    <h2  className='addLine mb-5 mt-3 '>{userLogin.userName} Profile </h2>
{LoadinggetUser && <Loader/>}
      
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
         
            <Form.Group controlId='role' className='mt-3'>
                <Form.Label>Role</Form.Label>
                <Form.Control as="select"  value={role}
                onChange={(e)=>setRole(e.target.value)}> 
                <option value="ADMIN">ADMIN</option>
                <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                </Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary' className='mt-3'>Modifié</Button>
        </Form>
    </Col>
    
  </Row>
}

export default ProfileScreen
