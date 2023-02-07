import React, { useEffect } from 'react'
import { Col, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import Products from '../components/Products'
import { listShopDetails } from '../features/product/productSlice'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'



const ShopUserScreen = () => {

  
  const dispatch=useDispatch()
  const params=useParams()

  const product=useSelector(state=>state.product)
    
    const {isLoadingshop,isErrorshop,messageshop,shop}=product.shopDetails


  useEffect(()=>{
dispatch(listShopDetails(params.id))
},[dispatch,params.id])

 if(isLoadingshop) 
 return <Loader/>

  return (
    <>
     
     <div id="ct">
  <div className="corner "id="left_top"></div>
  <div className="corner" id="left_bottom"></div>
  <div className="corner" id="right_top"></div>
  <div className="corner" id="right_bottom"></div>
  <span>{shop?.name}</span>
  <blockquote>
    <p><i>&ldquo; { shop?.description}&rdquo; </i></p>
  </blockquote>
</div>

      <Row style={{
        marginBottom:"40px",
        marginTop:"40px",
        backgroundColor:"rgb(240, 238, 238)"
      }}>
        
        {shop?.productsDto?.map((product)=>(
        <Col  key={product.id} sm={12} md={6} lg={4} xl={3}>
            <Products product={product}/>
           
            </Col>
          ))}
         
      </Row>
    </>
  
  )
}

export default ShopUserScreen
