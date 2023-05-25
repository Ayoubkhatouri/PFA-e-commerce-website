import React,{useEffect, useState,useContext} from 'react'
import { Button,Form } from 'react-bootstrap'
import {  Link, useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listShopDetails,updateShop,reset4 } from '../features/product/productSlice'
import { toast } from 'react-toastify'
import Meta from '../components/Meta'
import context1 from '../context1'



const EditShopScreen = () => {
    const {isEn,setIsEn}=useContext(context1)
    const [name,setName]=useState("")
    const [description,setDescription]=useState("")
    const params=useParams()
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const product=useSelector(state=>state.product)
    
    const {isLoadingshop,isErrorshop,isSuccessshop,messageshop,shop}=product.shopDetails

    const {Successupdate,Loadingupdate,Errorupdate,messageupdate}=product.updateShopInfo

    useEffect(()=>{
        dispatch(listShopDetails(params.id))
        if(isSuccessshop)
        {
            setName(shop?.name)
            setDescription(shop?.description)
        }
        if(Successupdate){
        toast.success("Shop Updated")
        dispatch(reset4())
        navigate(`/shop/admin/${params.id}`)
        }
        if(Errorupdate){
        toast.success("Error Update Shop")
        dispatch(reset4())
        }

    },[dispatch,params.id,isSuccessshop,shop?.name,shop?.description,Successupdate,navigate,Errorupdate])

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(updateShop({id:params.id,name,description}))
    }

  return (
    <>
     <Meta title={isEn ? "Edit Shop" : "Modifier Magasin"}/>
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
