import React, { useEffect } from 'react'
import { Col, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import Products from '../components/Products'
import { getUserDetails } from '../features/user/userSlice'



const ShopScreen = () => {

  const user=useSelector(state=>state.user)
  const {userLogin}=user
  const dispatch=useDispatch()
  
console.log(userLogin)
  const {LoadingUserDetails,ErrorUserDetails,userDetails}=user.UserDetailsInfo

  useEffect(()=>{

    if(userLogin)
    dispatch(getUserDetails(userLogin.id))
 
},[dispatch,userLogin])

 

  return (
    <>
     
     <div id="ct">
  <div class="corner "id="left_top"></div>
  <div class="corner" id="left_bottom"></div>
  <div class="corner" id="right_top"></div>
  <div class="corner" id="right_bottom"></div>
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
            <li >Edit Your Shop</li>
            <LinkContainer to="/products/create">
            <li >Add Product</li>
            </LinkContainer>
            <li>Demandes Recus</li>
            <li>Edit Products </li>
            <li>Statistique</li>
          </ul>      
                        
        </Col >
        <Col sm={12} md={8} lg={9} xl={10}>
          {userDetails && userDetails.shopDTO && userDetails.shopDTO.productsDto.map((product)=>(
            <Col  key={product.id} sm={12} md={6} lg={4} xl={3}>
            <Products product={product}/>
            </Col>
          ))}
        </Col>
      </Row>
    </>
  
  )
}

export default ShopScreen
