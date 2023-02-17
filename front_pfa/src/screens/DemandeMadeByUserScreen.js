
import React,{useContext, useEffect} from 'react'
import {  useNavigate,Link,useParams } from "react-router-dom"
import { LinkContainer } from "react-router-bootstrap"
import {Table,Button} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Message from '../components/Message'
import { deleteOrder, getAllUserOrders,reset3} from '../features/order/orderSlice'
import Spinner from '../components/Spinner'
import context1 from '../context1'
import { getUserDetails } from '../features/user/userSlice'
import { toast } from 'react-toastify'




const DemandeMadeByUserScreen = () => {
  const dispatch=useDispatch()
  const params=useParams()
    const {isEn}=useContext(context1);
  const order=useSelector(state=>state.order)
  const {AllUserOrders,SuccessgetAllUserMadeOrders,LoadinggetAllUserMadeOrders,ErrorgetAllUserMadeOrders,messagegetAllUserMadeOrders}=order.getAllUserOrdersMadeInfo
  const {LoadingupdateOrder,ErrorupdateOrder,SuccessupdateOrder}=order.updateOrderInfo

  const {LoadingdeleteOrder,ErrordeleteOrder,SuccessdeleteOrder}=order.deleteOrderInfo

  const user=useSelector(state=>state.user)
  const {userLogin}=user
  const {userDetails}=user.UserDetailsInfo
  
  useEffect(()=>{
    dispatch(getUserDetails(userLogin?.id))
dispatch(getAllUserOrders(userLogin.id))
  if(SuccessdeleteOrder){
    toast.success("Order deleted")
    dispatch(reset3())
  }
    
   },[dispatch,userLogin?.id,params.id,SuccessupdateOrder,ErrorupdateOrder,SuccessdeleteOrder])

   const deleteHandler=(orderId)=>{

   dispatch(deleteOrder(orderId))
   
   }


  return (
    <div> 
           <Link to={`/shop/admin/${userDetails.shopDTO?.id}`} className='btn btn-light my-3'><i className="fa-solid fa-arrow-left"></i>{isEn ? "Return":'Revenir'}</Link>
        {AllUserOrders.length === 0 ? <h1 className='addLine'>{isEn ? "No Demands":"Vous N'avez  Aucune Demandes"}</h1> : (
            <>
  <h1 className='addLine mb-5 mt-3'>{isEn ? "Received Demands":'Demandes Recus'}</h1>
  {/*Errordelete && <Message variant='danger'>{messagedelete}</Message>*/}
  {LoadinggetAllUserMadeOrders ? <Spinner/> : ErrorgetAllUserMadeOrders ? <Message variant='danger'>{messagegetAllUserMadeOrders}</Message> : (
      <Table striped bordered="true" hover responsive className='table-sm'>
          <thead>
              <tr> 
               <th>Shop Id</th>
              <th>{isEn ? "Product":'Produit'} </th>
                  <th>{isEn ? "Total Price":'Prix Totale'} </th>
                  <th>{isEn ? "Quantity":'Quantité'} </th>
                  <th>{isEn ? "Status":'Statut'} </th>
           
                  <th></th>
      
             
              </tr>
          </thead>
          <tbody>
              {AllUserOrders?.map((order)=>(
                  <tr key={order?.id}>
                     <td>{order.shopId}</td>
                        <td>{order.productName}</td>
                        <td>{order.totalePrice}</td>
                        <td>{order.qty}</td>
                      <td>{order.status}</td>
                     
                     
                      <td>
                      <Button disabled={order.status==="Accepted" ||order.status==="Refused"} variant='danger'  className='styleBtn mx-2 mt-1' onClick={()=>deleteHandler(order.id)}>
                        <i className="fa-solid fa-trash" style={{color:'red'}}></i>
                          </Button>
                      </td>
                  </tr>
              ))}
          </tbody>
      </Table>
  )}
      </>  )} 
      
    </div>
  
  )
}

export default DemandeMadeByUserScreen

