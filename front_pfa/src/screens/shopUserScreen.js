import React, { useEffect,useContext } from 'react'
import { Col, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import Products from '../components/Products'
import { listShopDetails } from '../features/product/productSlice'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import Count from '../components/Count'
import { getAllShopOrders ,reset4} from '../features/order/orderSlice'
import context1 from '../context1'



const ShopUserScreen = () => {

  
  const dispatch=useDispatch()
  const params=useParams()

  const {isEn} = useContext(context1)

  const product=useSelector(state=>state.product)
    
    const {isLoadingshop,isErrorshop,messageshop,shop}=product.shopDetails
    const order=useSelector(state=>state.order)
    const {AllShopOrders}=order.getAllShopOrdersReceivedInfo

  useEffect(()=>{
    dispatch(reset4())
dispatch(listShopDetails(params.id))
dispatch(getAllShopOrders(params.id))
},[dispatch,params.id])

let nbrRting=0
shop?.productsDto?.map(p=>(
 p.reviewDTOS.map(r=>
   nbrRting+=r.rating
 ) 
))

const counts=[
  { 
   "logo":<i className="fa-brands fa-product-hunt"></i>,
   "id": "1",
   "label":isEn ?"Products" : "Produits",
   "number": shop?.productsDto?.length+"",
   "duration": "1"},
   { 
     "logo":    <i className='fas fa-star' ></i>,
     "id": "2",
     "label":isEn ? "Products Stars" : "Produits Etoiles",
     "number": nbrRting+"",
     "duration": "1"},
   { 
       "logo":<i className="fas fa-inbox"></i>    ,
       "id": "3",
       "label":isEn ? "Received Demandes" : "Demandes Recus",
       "number": AllShopOrders?.length+"",
       "duration": "1"},
    { 
         "logo":<i className="fas fa-check-circle"></i>,
         "id": "4",
         "label": isEn ? "Accepted Demandes" : "Demandes Acceptées",
         "number": AllShopOrders?.filter(o=>o.status==="Accepted").length+"",
         "duration": "1"},
]

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

<Row>
  {counts.map(c=>(
    <Col key={c.id}  sm={6} md={6} lg={3} xl={3}>
    <Count data={c}/>
    </Col>
  ))}
</Row>

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
