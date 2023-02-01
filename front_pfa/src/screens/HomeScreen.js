import React,{useEffect,useContext} from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {Row , Col} from 'react-bootstrap'
import Products from '../components/Products'
import context1 from '../context1'
import { listProducts } from '../features/product/productSlice'
import  Loader  from '../components/Loader'




const HomeScreen = () => {
  const {isEn} = useContext(context1)
  const dispatch=useDispatch()

   const productList=useSelector(state=>state.product)
   const {isLoading,isError,message,products}=productList.productsDetails


  useEffect(()=>{
   
    dispatch(listProducts())  

  },[dispatch,isError])


  if(isLoading)
  return <Loader/>

  return (
   
    <>
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