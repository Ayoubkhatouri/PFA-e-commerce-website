import React,{useEffect,useContext} from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {Row , Col} from 'react-bootstrap'
import Products from '../components/Products'
import context1 from '../context1'
import { listProducts,listShops } from '../features/product/productSlice'
import  Loader  from '../components/Loader'
import ProductCarousel from '../components/ProductCarsoul'



const HomeScreen = () => {
  const {isEn} = useContext(context1)
  const dispatch=useDispatch()

   const productList=useSelector(state=>state.product)
   const {isLoading,isError,message,products}=productList.productsDetails
   const {shops}=productList.shopsDetails

  useEffect(()=>{
    
    dispatch(listProducts()) 
    dispatch(listShops()) 

  },[dispatch,isError])


  if(isLoading)
  return <Loader/>

  return (
   
    <>
    <Row>
    <Col   sm={12} md={8} lg={7} xl={7}>
    <ProductCarousel allProducts={products}/>
    </Col>
    <Col   sm={12} md={4} lg={5} xl={5}>
    <h1 className='addLine mb-3 mt-3'>{isEn ?"Shops":"Boutiques"}</h1>
   { shops?.map(shop=>(
    <Link to={`shop/${shop.id}`} style={{
      textDecoration:'none'
    }} key={shop.id} >
    <div className='shop' >
    <div className='imgStore'>
      </div>
      <div className='textStore' >
      <h4 className='titleShop'>{shop.name}</h4>
      <div ><strong> Number products :</strong>{shop.productsDto.length}</div>
      <div><strong>Owner: </strong>{shop.ownerFirstName} {shop.ownerLastName}</div>
      </div>
    </div>
    </Link>
   ))}
    
    </Col>
    </Row>  
     <h1 className='addLine mb-3 mt-3'>{isEn ?"Latest Products":"Derniers Produits"}</h1>
     <Row> 
        {products.map((product)=>(
            <Col  key={product.id} sm={12} md={6} lg={4} xl={3}>
            <Products product={product}/>
            </Col>
        ))}
    </Row>
    </>
   
   
)
}

export default HomeScreen