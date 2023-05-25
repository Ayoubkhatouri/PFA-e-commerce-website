import React, { useEffect,useContext } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import Products from '../components/Products'
import { getUserDetails } from '../features/user/userSlice'
import { useParams } from 'react-router-dom'
import { deleteProduct,reset5} from '../features/product/productSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Count from '../components/Count'
import { getAllShopOrders, reset4 } from '../features/order/orderSlice'
import context1 from '../context1'
import Spinner from '../components/Spinner'
import Meta from '../components/Meta'


const ShopAdminScreen = () => {

  const user=useSelector(state=>state.user)
  const {userLogin}=user
  const dispatch=useDispatch()
  const params=useParams()
  const navigate=useNavigate()

  const {LoadinggetUserDetails,ErrorUserDetails,userDetails}=user.UserDetailsInfo

  const product=useSelector(state=>state.product)
  const {LoadingDelete,ErrorDelete,messageDelete,SuccessDelete}=product.deleteProductInfo
  

  
  const order=useSelector(state=>state.order)
  const {AllShopOrders,SuccessgetAllShopReceivedOrders}=order.getAllShopOrdersReceivedInfo

  const {isEn} = useContext(context1)

  useEffect(()=>{
    dispatch(reset4())
    dispatch(getAllShopOrders(params.id))
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
 
 
},[dispatch,userLogin,SuccessDelete,ErrorDelete,params.id])

  

const handlDelete=(productId)=>{
  dispatch(deleteProduct(productId))
 }

 
let nbrRting=0
userDetails?.shopDTO?.productsDto?.map(p=>(
 p.reviewDTOS.map(r=>
   nbrRting+=r.rating
 ) 
))

const counts=[
  { 
   "logo":<i className="fa-brands fa-product-hunt"></i>,
   "id": "1",
   "label": isEn ?"Products" : "Produits",
   "number":  (userDetails?.shopDTO?.productsDto?.length!==undefined) ? userDetails?.shopDTO?.productsDto?.length+"" : "0",
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
       "label": isEn ? "Received Demandes" : "Demandes Recus",
       "number": AllShopOrders?.length+"",
       "duration": "1"},
    { 
         "logo":<i className="fas fa-check-circle"></i>,
         "id": "4",
         "label":  isEn ? "Accepted Demandes" : "Demandes Acceptées",
         "number": AllShopOrders?.filter(o=>o.status==="Accepted").length+"",
         "duration": "1"},
]

 
if(LoadinggetUserDetails) return <Spinner/>

  return (
    <>
      <Meta title={isEn ? "Admin Shop" : "Magasin Administrateur"}/>
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
