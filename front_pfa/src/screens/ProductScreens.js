import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Spinner,Form } from "react-bootstrap"
import { useParams } from 'react-router-dom'
import Rating from '../components/Rating'
import { listProductDetails ,productCreateReview} from '../features/product/productSlice'
import Message from '../components/Message'
import {toast} from 'react-toastify'



const ProductScreen = () => {
    const [qty,setQty]=useState(1)
    const [rating,setRating]=useState(0)
    const [comment,setComment]=useState('')


    const dispatch=useDispatch()
    
    const navigate=useNavigate()

    const product=useSelector(state=>state.product)
    
    const {isLoading,isError,message,productDetails}=product 
  
    

    const {Successcreate,Loadingcreate,Errorcreate,messageErrorcreate}=product.createReviewInfo

    const user=useSelector(state=>state.user)
    const {userLogin}=user 
   
    const params = useParams()

    useEffect(() => {
        if(Successcreate){
            toast.success('Review Submited !')
            setRating(0)
            setComment('')
        }
        dispatch(listProductDetails(params.id))

    }, [dispatch,params.id,Successcreate])


    const addtoCartHandler=()=>{
        navigate(`/cart/${params.id}?qty=${qty}`)
    }

    const sumbmitHandler=(e)=>{
        e.preventDefault()
        const productId_and_review={
            productId:params.id,
            reviewDTO:{
                rating,
                comment,
                userId:userLogin.id,
                ownerFirstName:userLogin.firstname,
                ownerLastName:userLogin.lastname,
                createdAt:new Date()
            }
        }   

        dispatch(productCreateReview(productId_and_review))
    }

    if(isLoading)
    return <Spinner/>

    return (
        <><Link to='/' className='btn btn-light my-3'><i className="fa-solid fa-arrow-left"></i> Go Back</Link>
           
                <>
               
            <Row >     
                <Col md={5}>
                    <Image src={productDetails.product.image} alt={productDetails.product.name} fluid />{/*fluid to keep the image in its container*/}
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{productDetails.product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={productDetails.product.rating} text={`${productDetails.product.numReviews} Reviews`} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <span style={{fontWeight:"bold"}}>Price: </span> ${productDetails.product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                           <span style={{fontWeight:"bold"}}> Description: </span> {productDetails.product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        <strong>${productDetails.product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>
                                        Status:
                                    </Col>
                                    <Col>
                                        {productDetails.product.countInStock > 0 ? 'In Stock' : 'Out of Stock '}
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            {productDetails.product.countInStock >0 && (
                                <ListGroupItem >
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col>
                                        <Form.Control 
                            as  ='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(productDetails.product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                                            
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            )}

                            <ListGroupItem>
                                <Button onClick={addtoCartHandler} className='btn-block ' type='button' disabled={productDetails.countInStock === 0}>Add To Cart</Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>

            <Row className='mb-5'>
                <Col sm={12} md={6} lg={6} xl={6}  style={{marginTop:"7px"}}>
                <h4 className='comments'>Commentaires</h4>
                       { !(productDetails.product && productDetails.product.reviewDTOS && productDetails.product.reviewDTOS.length>0) && <Message>No Reviews</Message>}
                       { (productDetails.product && productDetails.product.reviewDTOS && productDetails.product.reviewDTOS.length>0) &&(
                       <ListGroup variant='flush'>
                                {productDetails.product.reviewDTOS.map((review)=>(
                                    <ListGroup.Item  key={review.id}>
                                      <span>
                                         <strong>{review.ownerFirstName} {review.ownerLastName} | </strong>
                                         {review.createdAt.substring(0,10)}
                                      </span> 
                                      
                                      <div style={{
                                        display:"flex",
                                        justifyContent:"space-between"
                                      }}> {review.comment}
                                       <Rating value={review.rating} text=""/></div>
                                        
                                       
                                    </ListGroup.Item>
                                               
                                ))}
                                    </ListGroup>)
                                }
                               
                               </Col>
                               <Col sm={12} md={6} lg={6} xl={6}>
                                 <ListGroup variant='flush'>
                                
                                <ListGroup.Item>
                               
                               
                                    {Errorcreate && <Message variant='danger'>{messageErrorcreate}</Message>}
                                    {userLogin ? (
                                    <Form onSubmit={sumbmitHandler}>
                          
                                <h4 className='comments'>Ajouté Votre Commentaire</h4>
                                        <Form.Group controlId='comment'>
                                            <Form.Label>comment</Form.Label>
                                            <Form.Control as='textarea' row='3' value={comment}
                                            onChange={(e)=>setComment(e.target.value)}>
                                            </Form.Control>
                                        </Form.Group>
                                        
                                <h4 className='comments'>Ajouter Un Rating</h4>
                                <Form.Group controlId='rating'>
                                            <Form.Label>Rating</Form.Label>
                                            <Form.Control as='select' value={rating} 
                                            onChange={(e)=>setRating(e.target.value)}>
                                                <option value=''>Select ...</option>
                                                <option value='1'>1 - Poor</option>
                                                <option value='2'>2 - Fair</option>
                                                <option value='3'>3 - Good</option>
                                                <option value='4'>4 - Very Good</option>
                                                <option value='5'>5 - Excellent</option>
                                            </Form.Control>
                                        </Form.Group>
                                  
                                        <Button className='mt-3' type='submit' variant='primary'>Submit</Button>
                                    </Form>)
                                        :
                                    <Message>Please <Link to='/login'>Sign in</Link> to write a review{" "} </Message>}
                                </ListGroup.Item>
                                </ListGroup>
                                </Col>
            
            
            </Row>
            </>
            
            
        </>
    )
}

export default ProductScreen