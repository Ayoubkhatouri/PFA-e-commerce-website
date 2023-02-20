import React,{useState,useEffect,useContext} from 'react'
import {Form ,Button, Row ,Col} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { Link,useNavigate } from "react-router-dom"
import { useDispatch,useSelector } from 'react-redux'
import { register } from '../features/user/userSlice'
import Spinner from '../components/Spinner'
import {toast} from 'react-toastify'
import context1 from '../context1'



const RegisterScreen = () => {
    const [nom,setNom]=useState('')
    const [prenom,setPrenom]=useState('')   
    const [email,setEmail]=useState('')
    const [telephone,setTele]=useState('')
    const [ville,setVille]=useState('')
    const [adresse,setAdresse]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [Message2,setMessage2]=useState(null)

    const {isEn} = useContext(context1)

    const dispatch=useDispatch()
    const navigate=useNavigate()
    const user=useSelector(state=>state.user)
    const {isLoading,isError,isSuccess,message,userLogin}=user

    useEffect(()=>{
        if(isSuccess || userLogin){
            toast.success((isEn ?'Welcome ' : "Bienvenue ")+userLogin.firstname +" "+userLogin.lastname)
            navigate('/')
        }
        if(isError) toast.error(message)
    },[navigate,isSuccess,userLogin,isError,message,isEn])

    const submitHandler=(e)=>{
        e.preventDefault()
        if(password !== confirmPassword){
            toast.error(isEn ?'Passwords do not match':"Les mots de passe ne sont pas les memes")
         }
         else{
            dispatch(register({
                lastname:nom,
                firstname:prenom,
                tele:telephone,
                ville,
                adresse,email,
                password})) 
         }
       
       }

     
       if(isLoading) 
       return <Spinner/>

  return (
    <div className='backReg'>

        <Row>
          
        <Col  sm={12} md={12} lg={6} xl={6} className="opc">
        <FormContainer >
        <h1 className='addLine mb-5 mt-3'>{isEn ? "Register":'S\'inscrire'}</h1>
      
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
                <Form.Label >{isEn ?"Last Name":"Nom" }</Form.Label>
                <Form.Control type='name' placeholder={isEn ? 'Enter Your Last Name':'Entrer Votre Nom'} value={nom}
                onChange={(e)=>setNom(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='prenom' className='mt-3'>
                <Form.Label>{isEn ? "First Name":'Prenom'} </Form.Label>
                <Form.Control type='name' placeholder={isEn ? 'Enter Your First Name':'Entrer Votre Prenom'} value={prenom}
                onChange={(e)=>setPrenom(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='email' className='mt-3'>
                <Form.Label>{isEn ? "Email Address":'Adresse Email'}</Form.Label>
                <Form.Control type='email' placeholder={isEn ? "Enter Your Email Address":'Entrer Votre Adresse Email'} value={email}
                onChange={(e)=>setEmail(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='tele' className='mt-3'>
                <Form.Label>{isEn ? "Telephone":'Téléphone'}</Form.Label>
                <Form.Control type='tel' placeholder={isEn ?"Enter Your Phone Number":'Entrer Votre Numéro De Téléphone'} value={telephone}
                onChange={(e)=>setTele(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='ville' className='mt-3'>
                <Form.Label>{isEn ?"City": "Ville"}</Form.Label>
                <Form.Control  placeholder={isEn ?"Enter Your City":'Entrer Votre Ville'} value={ville}
                onChange={(e)=>setVille(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='adresse' className='mt-3'>
                <Form.Label>{isEn ? "Address":"Adresse"}</Form.Label>
                <Form.Control  placeholder={isEn ?"Enter Your Address":'Entrer Votre Adresse'} value={adresse}
                onChange={(e)=>setAdresse(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='password' className='mt-3'>
                <Form.Label>{isEn ? "Password":"Mot De Passe"}</Form.Label>
                <Form.Control type='password' placeholder={isEn ?"Enter Your Password":'Entrer Votre Mot De Passe'} value={password}
                onChange={(e)=>setPassword(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='confirmPassword' className='mt-3'>
                <Form.Label>{isEn ?"Confirm Password" :"Confirmer Mot De Passe"} </Form.Label>
                <Form.Control type='password' placeholder={isEn ?"Confirm Your Password" :"Confirmer Votre Mot De Passe"} value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary' className='mt-3'>{isEn ? "Identify":"S'identifiez"}</Button>
        </Form>
        <Row className='py-3'>
          <Col>
      {isEn ? "Already have an account ? " : "Vous avez déja un compte ? " }<Link  to='/users/abonnez'>{isEn ? " Login" :"S'abonnez"}</Link>
          </Col>
      
        </Row>
    </FormContainer>
    </Col>
    <Col  sm={12} md={12} lg={6} xl={6}>
        <div className='mrg'>
    <h4 className='ff1'>{isEn ? "Welcome to the word of E-Commerce":"Bienvenue dans le monde du e-commerce"}</h4>
    <hr className='borderme'></hr>
    <h3 className='ff2'>{isEn ? "You will be soon on the list and you will be the first to know about our latest products, exclusive offers, and much more"
    :"Vous serez bientôt sur la liste et vous serez le premier à connaître nos derniers produits, nos offres exclusives et bien plus encore"
    }
    </h3>
    </div>
           </Col>
    </Row>
    </div>
  )
}

export default RegisterScreen
