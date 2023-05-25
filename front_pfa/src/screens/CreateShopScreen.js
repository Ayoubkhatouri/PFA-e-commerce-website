import React,{useState,useEffect,useContext} from 'react'
import { Link, useNavigate, useLocation ,useParams} from "react-router-dom"
import {Form ,Button, Spinner} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { createShop} from '../features/product/productSlice'
import Loader from '../components/Loader'
import {toast} from 'react-toastify'
import Meta from '../components/Meta'
import context1 from '../context1'


 const CreateShopScreen  = () => {
    const {isEn,setIsEn}=useContext(context1)
    const [name,setName]=useState('')
    const [description,setDescription]=useState('')
    
   
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const product=useSelector(state=>state.product)

    
    const {LoadingcreateShop,ErrorcreateShop,SuccesscreateShop,messagecreateShop,createdShop}=product.createShopInfo
     
    const user=useSelector(state=>state.user)
    const {userLogin}=user


    useEffect(()=>{
        if(SuccesscreateShop){
            toast.success("Congratulations "+userLogin.firstname+" you have created your own shop")
            //localStorage.removeItem('userLogin')
            navigate('/')
            window.location.reload()
        }

    
    },[dispatch,SuccesscreateShop,navigate])

    

const submitHandler=(e)=>{
    e.preventDefault()
   
    let shop={
        name,
        description,
        productsDto: [],
        ownerLastName:userLogin.lastname,
        userId:userLogin.id,
        ownerFirstName:userLogin.firstname
        
    }

    dispatch(createShop(shop))
   
}

  if(LoadingcreateShop)
  return <Spinner/>

  return (
    <>
        <Meta title={isEn ? "Create A Shop" : "Cree Un Magasin"}/>
    <Link to='/' className='btn btn-light my-3'><i className="fa-solid fa-arrow-left"></i> Go Back</Link>
    <FormContainer>
        <h1 className='addLine'>Create Your Own Shop</h1>
        {LoadingcreateShop && <Loader/>}
      
            <Form onSubmit={submitHandler} className='fw-bold'>
            <Form.Group controlId='name' className='mt-3'>
                    <Form.Label>Name Your Shop </Form.Label>
                    <Form.Control type='name' placeholder='Enter name' value={name}
                    onChange={(e)=>setName(e.target.value)}> 
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='description' className='mt-3'>
                <Form.Label>Description</Form.Label>
                    <Form.Control type='text' placeholder='Enter description ' value={description}
                    onChange={(e)=>setDescription(e.target.value)}> 
                     </Form.Control>
                </Form.Group>
                <Button className='mb-5 mt-3' type='submit' variant='primary'>Create</Button>
            </Form>
        
    </FormContainer>
    </>
   
  )
}

export default CreateShopScreen
