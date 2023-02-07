import React,{useEffect, useState} from 'react'
import { Button,Form } from 'react-bootstrap'
import {  Link } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listShopDetails } from '../features/product/productSlice'



const EditShopScreen = () => {
    const [name,setName]=useState("")
    const [description,setDescription]=useState("")
    const params=useParams()
    const dispatch=useDispatch()

    const product=useSelector(state=>state.product)
    
    const {isLoadingshop,isErrorshop,isSuccessshop,messageshop,shop}=product.shopDetails

    useEffect(()=>{
        dispatch(listShopDetails(params.id))
        if(isSuccessshop)
        {
            setName(shop?.name)
            setDescription(shop?.description)
        }

    },[dispatch,params.id,isSuccessshop,shop?.name,shop?.description])

    const submitHandler=(e)=>{
        e.preventDefault()
    }

  return (
    <>
    <Link to={`/shop/admin/${params.id}`} className='btn btn-light my-3'><i className="fa-solid fa-arrow-left"></i> Go Back</Link>
    <FormContainer>
        <h1 className='addLine'>Edit Your Shop</h1>
        {/*LoadingcreateShop && <Loader/>*/}
      
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
                <Button className='mb-5 mt-3' type='submit' variant='primary'>Edit</Button>
            </Form>
        
    </FormContainer>
    </>
  )
}

export default EditShopScreen
