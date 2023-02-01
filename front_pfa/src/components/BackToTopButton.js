import React,{useEffect,useState} from 'react'
import { Button } from 'react-bootstrap'

const BackToTopButton = () => {
    const [backToTopButton,setBackToTopButton]=useState(false)
    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            if(window.scrollY>100) 
            setBackToTopButton(true)
            else
            setBackToTopButton(false)
        })
    },[])
    const scrollUp=()=>{
        window.scrollTo({
            top:0,
            behavior:"smooth"
        })
    }
  return (
    <div>
      {backToTopButton &&<Button style={{
        position:"fixed",
        bottom:"50px",
        right:"50px",
       fontSize:"27px",
        backgroundColor:"gold",
      }} onClick={scrollUp}><i className="fa-solid fa-arrow-up"></i></Button>}
    </div>
  )
}

export default BackToTopButton
