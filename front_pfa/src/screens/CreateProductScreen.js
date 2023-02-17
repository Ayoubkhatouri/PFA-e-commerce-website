import React,{useState,useEffect, useContext} from 'react'
import { Link, useNavigate, useLocation ,useParams} from "react-router-dom"
import {Form ,Button, Spinner} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { createProduct,reset} from '../features/product/productSlice'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'
import { getUserDetails } from '../features/user/userSlice'
import context1 from '../context1'

 const CreateProductScreen  = () => {
    const {isEn,setIsEn}=useContext(context1)

    const [name,setName]=useState('')
    const [price,setPrice]=useState(0)
    const [image,setImage]=useState('')
    const [brand,setBrand]=useState('')
    const [category,setCategory]=useState('')
    const [countInStock,setCountInStock]=useState(0)
    const [description,setDescription]=useState('')
    const [uploading,setUploading]=useState(false)
   

    const dispatch=useDispatch()
    const navigate=useNavigate()
    const product=useSelector(state=>state.product)

    
    const {Loadingcreate,Errorcreate,Successcreate,messagecreate,createdProduct}=product.createProductInfo
     
    const user=useSelector(state=>state.user)
    const {LoadingUserDetails,ErrorUserDetails,userDetails}=user.UserDetailsInfo
    const {userLogin}=user


    useEffect(()=>{
        dispatch(getUserDetails(userLogin.id))
        if(Successcreate){
            toast.success(isEn ? "Product Created":"Produit Crée")
            dispatch(reset())
            navigate('/')
        }
        if(Errorcreate){
            toast.error(isEn ? "Error Create Product !" :"Erreur De Crée ce Produit")
            dispatch(reset())
        }
        

    
    },[dispatch,Successcreate,navigate,Errorcreate,userLogin.id,isEn])

    const uploadFileHandler=async(e)=>{
        const file=e.target.files[0]
   
    let reader=new FileReader()
    reader.readAsDataURL(file)
    reader.onload=async function(){
    setImage(reader.result)
  

    }
    reader.onerror=function(error){
      console.log('Error',error)
    }
  
    }
    

const submitHandler=(e)=>{
    e.preventDefault()
    
    let product={
        name,
        price,
        image,
        brand,
        category,
        reviewDTOS: [],
        description,
        countInStock,
        shopId:userDetails?.shopDTO?.id
    }
    
    dispatch(createProduct(product))
   
}

  if(Loadingcreate)
  return <Spinner/>

  return (
    <>
    <Link to={`/shop/admin/${userDetails?.shopDTO?.id}`} className='btn btn-light my-3'><i className="fa-solid fa-arrow-left"></i> Go Back</Link>
    <FormContainer>
        <h1 className='addLine'>{isEn ? "Create product":"Crée Une Produit "}</h1>
        {Loadingcreate && <Loader/>}
      
            <Form onSubmit={submitHandler} className='fw-bold'>
            <Form.Group controlId='name' className='mt-3'>
                    <Form.Label>{isEn ? "Name" :"Nom"} </Form.Label>
                    <Form.Control type='name' placeholder={isEn ? 'Enter name' :"Entrer votre Nom"} value={name}
                    onChange={(e)=>setName(e.target.value)}> 
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='price' className='mt-3'>
                    <Form.Label>{isEn ?"Enter Price" :"Enter Prix"}</Form.Label>
                    <Form.Control type='number' placeholder='Enter Price' value={price}
                    onChange={(e)=>setPrice(e.target.value)}> 
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='image' className='mt-3'>
                <Form.Label>Image</Form.Label>
                    <Form.Control type='text' placeholder='Enter Image Url' value={image}
                    onChange={(e)=>setImage(e.target.value)}> 
                     </Form.Control>
                     <Form.Control type='file' label='Choose File'  onChange={uploadFileHandler}></Form.Control>
                     {uploading && <Loader/>}
                </Form.Group>
                <Form.Group controlId='brand' className='mt-3'>
                <Form.Label>Brand</Form.Label>
                    <Form.Control type='text' placeholder='Enter Brand ' value={brand}
                    onChange={(e)=>setBrand(e.target.value)}> 
                     </Form.Control>
                </Form.Group>
                <Form.Group controlId='countInStock' className='mt-3'>
                <Form.Label>{isEn ? "Count In Stock ": "Quantité Dans Le Stock"}</Form.Label>
                    <Form.Control type='number' placeholder='Enter countInStock ' value={countInStock}
                    onChange={(e)=>setCountInStock(e.target.value)}> 
                     </Form.Control>
                </Form.Group>
                <Form.Group controlId='category' className='mt-3'>
                <Form.Label>category</Form.Label>
                    <Form.Control type='text' placeholder='Enter category ' value={category}
                    onChange={(e)=>setCategory(e.target.value)}> 
                     </Form.Control>
                </Form.Group>
                <Form.Group controlId='description' className='mt-3'>
                <Form.Label>description</Form.Label>
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

export default CreateProductScreen
