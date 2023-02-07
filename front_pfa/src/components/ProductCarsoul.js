import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import { Carousel,Image } from 'react-bootstrap'
import context1 from '../context1'



const ProductCarousel = ({allProducts}) => {
    const {isEn} = useContext(context1)

    let TopProducts=[...allProducts]
     TopProducts=TopProducts?.sort((a,b)=>(b.rating -a.rating)).slice(0,3)

  return <>
  <h1 className='addLine mb-3 mt-3'>{isEn ?"Top 3 Products":"Meilleurs 3 Produits"}</h1>
 
    <Carousel pause='hover' className='myCarousel bg-dark'>
        {TopProducts.map((product)=>(
            <Carousel.Item key={product.id}>
                <Link to={`/product/${product.id}`}>
                    <Image className='imageCarousel'  src={product.image} alt={product.name} fluid/>
                    <Carousel.Caption className='carousel-caption'>
                        <h2>{product.name} (${product.price})</h2>
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>
        ))}
    </Carousel>
  
        
  </>
  
}


export default ProductCarousel