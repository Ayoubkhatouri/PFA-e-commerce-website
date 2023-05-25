import React,{useState,useEffect, useContext} from 'react'
import { Link, useNavigate } from "react-router-dom"
import FormContainer from '../components/FormContainer'
import {Form ,Button, Row ,Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../features/user/userSlice'
import Spinner from '../components/Spinner'
import context1 from '../context1'
import {toast} from 'react-toastify'
import Meta from '../components/Meta'



const LoginScreen = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    
    const {isEn} = useContext(context1)

    const {isError,isSuccess,isLoading,message,userLogin}=useSelector(state=>state.user)

    useEffect(()=>{
        if(isSuccess || userLogin){
            toast.success((isEn ?'Welcome ' : "Bienvenue ")+userLogin.firstname +" "+userLogin.lastname)
          navigate('/')
        }
        if(isError) toast.error(message)
       
    },[dispatch,isSuccess,userLogin,navigate,isError,message,isEn])
  
   



    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(login({email,password}))
    }

    if(isLoading)
    return <Spinner/>

  return (
    <>
    <Meta title={isEn ? "Login" : "Se Connectez"}/>
    <div className='backReg fw-bold'> 
    <FormContainer>
    <h1 className='addLine mb-5 mt-3'>{isEn ? "Login":'Se Connecter'}</h1>

    <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
            <Form.Label> Email</Form.Label>
            <Form.Control type='email' placeholder={isEn ? "Enter email":'Entrer email'} value={email}
            onChange={(e)=>setEmail(e.target.value)}> 
            </Form.Control>
        </Form.Group>
        <Form.Group controlId='password' className='mt-4'>
            <Form.Label>{isEn ? "Password":'Mot De Passe'}</Form.Label>
            <Form.Control type='password' placeholder={isEn ? "Enter Password":'Entrer Mot de passe'} value={password}
            onChange={(e)=>setPassword(e.target.value)}> 
            </Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary' className='mt-5'>{isEn ? "Login":'Se Connecter'}</Button>
    </Form>
    <Row className='py-3 mb-5 mt-4'>
      <Col>
      {isEn ? "Create Account ? ":'Créer un compte ? '}<Link to='/users/register'> {isEn ? "Register":'S\'inscrire'}</Link>
      </Col>
    </Row>
  
</FormContainer>
</div>
</>)
}

export default LoginScreen
