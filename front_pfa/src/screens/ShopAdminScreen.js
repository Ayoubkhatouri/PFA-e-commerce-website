import React, { useEffect } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import Products from '../components/Products'
import { getUserDetails } from '../features/user/userSlice'
import { useParams } from 'react-router-dom'
import { deleteProduct,reset5} from '../features/product/productSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const ShopAdminScreen = () => {

  const user=useSelector(state=>state.user)
  const {userLogin}=user
  const dispatch=useDispatch()
  const params=useParams()
  const navigate=useNavigate()

  const {LoadingUserDetails,ErrorUserDetails,userDetails}=user.UserDetailsInfo

  const product=useSelector(state=>state.product)
  const {LoadingDelete,ErrorDelete,messageDelete,SuccessDelete}=product.deleteProductInfo
  

  useEffect(()=>{

    if(userLogin)
    dispatch(getUserDetails(userLogin.id))
    if(SuccessDelete)
    {
      toast.success("Product Deleted")
      dispatch(reset5())
    }
    if(ErrorDelete){
      toast.error("Error delete product !")
      dispatch(reset5())
    }
 
},[dispatch,userLogin,SuccessDelete,ErrorDelete])

const handlDelete=(productId)=>{
  dispatch(deleteProduct(productId))
 }

 


  return (
    <>
     
     <div id="ct">
  <div className="corner "id="left_top"></div>
  <div className="corner" id="left_bottom"></div>
  <div className="corner" id="right_top"></div>
  <div className="corner" id="right_bottom"></div>
  <span>{userDetails && userDetails.shopDTO && userDetails.shopDTO.name}</span>
  <blockquote>
    <p><i>&ldquo; {userDetails && userDetails.shopDTO && userDetails.shopDTO.description}&rdquo; </i></p>
  </blockquote>
</div>

      <Row style={{
        marginBottom:"40px",
        marginTop:"40px",
        backgroundColor:"rgb(240, 238, 238)"
      }}>
        <Col sm={12} md={4} lg={3} xl={2} style={{
           borderRight: "5px solid white"
        }}>
          <ul className='myList'>
          <LinkContainer to={`/shop/admin/edit/${params.id}`}>
            <li >Edit Your Shop</li>
            </LinkContainer>
            <LinkContainer to="/products/create">
            <li >Add Product</li>
            </LinkContainer>
            <LinkContainer to={`/admin/orders/received/${params.id}`}>
            <li>Demandes Recus</li>
            </LinkContainer>
            <LinkContainer to={`/admin/orders/statisques/${params.id}`}>
            <li>Statistique</li>
            </LinkContainer>
          </ul>      
                        
        </Col >
        {userDetails && userDetails.shopDTO && userDetails.shopDTO.productsDto.map((product)=>(
        <Col className='productCont'  key={product.id} sm={12} md={6} lg={4} xl={3}>
          <Button  className='deleteProductBtn' onClick={()=>handlDelete(product.id)}>  <i   className="fa-solid fa-trash del"></i></Button>
          <Button  className='editProductBtn' onClick={()=>navigate(`/product/admin/edit/${product.id}`)}>  <i className="fa-solid fa-pen-to-square"></i></Button>
            <Products product={product}/>
            </Col>
          ))}
         
      </Row>
    </>
  
  )
}

export default ShopAdminScreen
