
import './App.css';
import { useState } from 'react';
import context1 from './context1';
import {Container} from 'react-bootstrap'
import{BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import CreateProductScreen from './screens/CreateProductScreen';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import BackToTopButton from './components/BackToTopButton';
import CreateShopScreen from './screens/CreateShopScreen';
import ShopAdminScreen from './screens/ShopAdminScreen';
import ProductScreen from './screens/ProductScreens';
import ShopUserScreen from './screens/shopUserScreen';
import EditShopScreen from './screens/EditShopScreen';
import EditProductScreen from './screens/EditProductScreen';


function App() {

  const [isEn,setIsEn]=useState(false)
  
  return (
   <>
   <context1.Provider value={{isEn,setIsEn}}>
    <Router>
      <ScrollToTop/>
      <Header/>
      <main>
      <Container>
      <Routes>
      <Route path="/" element={<HomeScreen/>}/>
      <Route path="/users/register" element={<RegisterScreen/>}/>
      <Route path="/users/abonnez" element={<LoginScreen/>}/>
      <Route path="/products/create" element={<CreateProductScreen/>}/>
      <Route path="/shop/create" element={<CreateShopScreen/>}/>
      <Route path="/shop/admin/:id" element={<ShopAdminScreen/>}/>
      <Route path="/product/:id" element={<ProductScreen/>}/>
      <Route path="/shop/:id" element={<ShopUserScreen/>}/>
      <Route path="/shop/admin/edit/:id" element={<EditShopScreen/>}/>
      <Route path="/product/admin/edit/:id" element={<EditProductScreen/>}/>
      </Routes>
      </Container>
      </main>
      <BackToTopButton/>
      <Footer/>
    </Router>
    <ToastContainer/>
   </context1.Provider>
   </>
  );
}

export default App;
