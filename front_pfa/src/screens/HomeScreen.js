import React,{useEffect,useContext, useState} from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {Row , Col, Form} from 'react-bootstrap'
import Products from '../components/Products'
import context1 from '../context1'
import { listProducts,listShops } from '../features/product/productSlice'
import  Loader  from '../components/Loader'
import ProductCarousel from '../components/ProductCarsoul'



const HomeScreen = () => {
  const [keyword,setKeyword]=useState('')
  const [keywordCat,setKeywordCat]=useState('')

  const {isEn} = useContext(context1)
  const dispatch=useDispatch()

   const productList=useSelector(state=>state.product)
   const {isLoading,isError,message,products}=productList.productsDetails
   const {shops}=productList.shopsDetails
   const user=useSelector(state=>state.user)
   const userLogin=user.userLogin
   const {LoadinggetUserDetails,ErrorgetUserDetails,userDetails}=user.UserDetailsInfo

   let ProductBySearchName=[]
   let ProductBySearchCategory=[]
   let ProductBySearch=[]

   if(keyword.length){
    let regex=new RegExp(keyword,'i')
    for(let i=0;i<products.length;i++){
      if(products[i].name.match(regex))
      ProductBySearchName.push(products[i])
    }
   }
   else  ProductBySearchName=products

   if(keywordCat.length){
    let regex=new RegExp(keywordCat,'i')
    for(let i=0;i<products.length;i++){
      if(products[i].category.match(regex))
      ProductBySearchCategory.push(products[i])
    }
   }
   else ProductBySearchCategory=products

   //let s merge the two
   ProductBySearch=ProductBySearchName.filter(p=>ProductBySearchCategory.includes(p))

 

  useEffect(()=>{
    
    dispatch(listProducts()) 
    dispatch(listShops()) 

    if(ErrorgetUserDetails){
      window.location.reload(true)
    }
    
  
  },[dispatch,isError,ErrorgetUserDetails])


  if(isLoading)
  return <Loader/>

  return (
   
    <>
    <Row>
    <Col   sm={12} md={8} lg={7} xl={7}>
    <ProductCarousel allProducts={products}/>
    </Col>
    <Col   sm={12} md={4} lg={5} xl={5} >
    <h1 className='addLine mb-3 mt-3'>{isEn ?"Shops":"Boutiques"}</h1>
    <div className='shopList'>
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
   </div>
    
    </Col>
    </Row>  
    <div className='myDivSearch addLine  mb-4 mt-5'>
    <h1 className='hh' >{isEn ? "Latest Products":"Derniers Produits"}</h1>
    <div className='myInputSearch'>
    <Form   style={{height:'40px'}} className='bottomMe'>
        <Form.Control type='text' name='q'  onChange={(e)=>setKeyword(e.target.value)}
        placeholder={isEn ? "Search By Name":"Chercher Par Nom"} ></Form.Control>
    </Form>
    <Form   style={{height:'40px'}} className='bottomMe aa'> 
        <Form.Control type='text' name='q'  onChange={(e)=>setKeywordCat(e.target.value)}
        placeholder={isEn ? "Search By Category":"Chercher Par Category"} ></Form.Control>
    </Form>
    </div>
    </div>

     <Row> 
        {ProductBySearch.map((product)=>(
            <Col  key={product.id} sm={12} md={6} lg={4} xl={3}>
            <Products product={product}/>
            </Col>
        ))}
    </Row>
    </>
   
   
)
}

export default HomeScreen