import React,{useContext, useEffect} from 'react'
import {  useNavigate, useParams } from 'react-router-dom'
import { Navbar,Nav,NavDropdown, Button } from 'react-bootstrap'
import { LinkContainer} from 'react-router-bootstrap'
import { useSelector,useDispatch } from 'react-redux'
import context1 from '../context1'
import { getUserDetails,addUserLogin } from '../features/user/userSlice'


const Header = () => {

    
  const {isEn,setIsEn}=useContext(context1)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  

 const user=useSelector(state=>state.user)
const userLogin=user.userLogin

  const {LoadinggetUserDetails,ErrorgetUserDetails,userDetails}=user.UserDetailsInfo



 
  const userLocalStorage=JSON.parse(localStorage.getItem('userLogin'))
  useEffect(()=>{
    
    if(userLocalStorage)
    dispatch(getUserDetails(userLocalStorage.id))
    if(userLocalStorage?.id !==userLogin?.id)
    dispatch(addUserLogin())
  
   

},[dispatch,userLogin?.id ])

  const logoutHandler=()=>{
    localStorage.removeItem('userLogin')
    navigate('/')
    window.location.reload()

  }

  return (
    <header>
      <header>
          <Navbar bg="primary" variant='dark'  expand="lg" collapseOnSelect >
     
     <LinkContainer to='/'>
       <Navbar.Brand className='logo'>E-COMM</Navbar.Brand>
       </LinkContainer>

       <Navbar.Toggle aria-controls="basic-navbar-nav" />
       <Navbar.Collapse id="basic-navbar-nav">
       <div className='abonnement '>
       {userLogin ? (
          <>
           <NavDropdown style={{
            marginRight:"20px"
           }} title={userLogin.firstname && userLogin.firstname.toUpperCase()}   >
                <LinkContainer to={`users/profile`} >
                  <NavDropdown.Item>{isEn ? "Profil":"Profile"}</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to={`users/SentOrders`} >
                  <NavDropdown.Item>{isEn ? "Sent Orders":"Demandes Envoyé"}</NavDropdown.Item>
                </LinkContainer>
           {userDetails.shopDTO ?
           <LinkContainer to={`shop/admin/${userDetails.shopDTO.id}`} >
           <NavDropdown.Item>{isEn ? "Your Shop":"Votre Boutique"} </NavDropdown.Item>
         </LinkContainer> :
         <LinkContainer to={`shop/create`} >
         <NavDropdown.Item>{isEn ? "Create Your Shop":"Crée Votre Boutique"} </NavDropdown.Item>
       </LinkContainer>
           }
                
                 
                 {userLogin && userLogin.role==="SUPER_ADMIN"&& (
              
                  <LinkContainer to='/users/all'>
                   <NavDropdown.Item>{isEn ? "Users":"Utilisateurs"}</NavDropdown.Item>
                 </LinkContainer>
                
                 )}
                </NavDropdown>
             
         <Nav.Link className='signIn navItems abb'  onClick={logoutHandler} style={{color:'gold'}}><span className='hoverMe'><i className='fa-solid fa-arrow-right-from-bracket'></i>{isEn ? "Logout":"Se Déconnecter"} </span></Nav.Link>
             </>
           ) :(
            <>
              <LinkContainer to="users/abonnez" >
              <Nav.Link className='signIn navItems abb'><i className='fas fa-user' ></i> {isEn ? "Login":"Se Connecter"}</Nav.Link>
              </LinkContainer>
               <LinkContainer to="users/register ">
               <Nav.Link className='signIn navItems abb'><i className='fas fa-user-plus' ></i> {isEn ? "Register":"S'inscrire"}</Nav.Link>
               </LinkContainer>
               </>
           )}
           
            
      </div>
      <Button style={{
                backgroundColor:"white",
                marginRight:"10px"

            }} onClick={()=>setIsEn(()=>!isEn)}> <span style={{
              color:"#2c3e50",
              fontWeight:"bold"
            }}>{isEn ? <div><div className='translateFr' ></div>French </div>:<div><div className='translateEn' ></div>Anglais</div>}</span></Button>
           </Navbar.Collapse>
           </Navbar>
    </header>
            
    </header>
  )
}

export default Header
