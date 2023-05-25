import React, { useEffect, useState,useContext } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import { listProductDetails,updateProduct,reset7,reset8} from '../features/product/productSlice'
import Meta from '../components/Meta'
import context1 from '../context1'


const EditProductScreen = () => {
  const {isEn,setIsEn}=useContext(context1)
  const dispatch=useDispatch()
    
    const navigate=useNavigate()

    const params=useParams()
    const productId=params.id

    const product=useSelector(state=>state.product)
  
  const [name,setName]=useState('')
  const [price,setPrice]=useState(0)
  const [image,setImage]=useState('')
  const [brand,setBrand]=useState('')
  const [category,setCategory]=useState('')
  const [countInStock,setCountInStock]=useState(0)
  const [description,setDescription]=useState('')
  const [uploading,setUploading]=useState(false)


  const {isLoading,isError,message,productDetails}=product  

  
  const {Loadingupdate,Errorupdate,Successupdate,messageupdate,updatedProduct}=product.updateProductInfo
     


  useEffect(()=>{
  
      if(Successupdate){
          dispatch(reset7())
          dispatch(reset8())
          toast.success("Product Updated")
          navigate(`/shop/admin/${productDetails?.product?.shopId}`)
      }
else{
    if(!productDetails?.product?.name ){
      dispatch(listProductDetails(productId))
    }
    else{
      setName(productDetails?.product?.name)
      setPrice(productDetails?.product?.price)
      setImage(productDetails?.product?.image)
      setBrand(productDetails?.product?.brand)
      setCategory(productDetails?.product?.category)
      setCountInStock(productDetails?.product?.countInStock)
      setDescription(productDetails?.product?.description)
    }
  }
  },[dispatch,productDetails,productId,Successupdate,navigate])

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
    dispatch(updateProduct({
      id:productId,
      name,
      price,
      image,
      brand,
      category,
      description,
      countInStock
  }))
  }

  return (
    <>
       <Meta title={isEn ? "Edit Product" : "Modifier Produit"}/>
    <Link to={`/shop/admin/${productDetails?.product?.id}`} className='btn btn-light my-3'><i className="fa-solid fa-arrow-left"></i> Go Back</Link>
    <FormContainer>
        <h1 className='addLine'>Update product</h1>
        {Loadingupdate && <Loader/>}
        
            <Form onSubmit={submitHandler} className='fw-bold'>
            <Form.Group controlId='name' className='mt-3'>
                    <Form.Label>Name </Form.Label>
                    <Form.Control type='name' placeholder='Enter name' value={name}
                    onChange={(e)=>setName(e.target.value)}> 
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='price' className='mt-3'>
                    <Form.Label>Price</Form.Label>
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
                <Form.Label>countInStock</Form.Label>
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
                <Button className='mb-5 mt-3' type='submit' variant='primary'>Update</Button>
            </Form>
        
    </FormContainer>
    </>
   
  )
}

export default EditProductScreen
