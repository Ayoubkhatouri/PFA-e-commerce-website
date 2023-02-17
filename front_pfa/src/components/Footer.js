import React, { useContext } from 'react'
import context1 from '../context1'

const Footer = () => {
  const {isEn}=useContext(context1)

  return (
    
<footer className="footer">
  <div className="footer__addr">
    <h1 className="footer__logo">{isEn ?" If shopping doesn't make you happy, then you're in the wrong shop! ":
  " Si le shopping ne vous rend pas heureux, alors vous êtes dans le mauvais magasin! "}</h1>
        
    <h2>contact</h2>
    
    <address>
      5534 Somewhere In. The World 22193-10212<br></br>
          
      <a className="footer__btn" href="mailto:ayoub.khatouri@usmba.com">{isEn ?"Email Us":"Envoyez-nous un email"}</a>
    </address>
  </div>
  
  <ul className="footer__nav">
    <li className="nav__item">
      <h2 className="nav__title">{isEn ?"Media" :"Médias"}</h2>

      <ul className="nav__ul">
        <li>
          <a href="#">{isEn ?"Online" :"En Ligne"}</a>
        </li>

        <li>
          <a href="#">{isEn ? "Print" :"Imprimer"}</a>
        </li>
            
        <li>
          <a href="#">{isEn ?"Alternative Ads" :"Annonces alternatives"}</a>
        </li>
      </ul>
    </li>
    
    <li className="nav__item nav__item--extra">
      <h2 className="nav__title">{isEn ?"Technology"  : "Technologie"}</h2>
      
      <ul className="nav__ul nav__ul--extra">
        <li>
          <a href="#">{isEn ?"Hardware Design" : "Conception matérielle"}</a>
        </li>
        
        <li>
          <a href="#">{isEn ?"Software Design":"Conception de logiciels"}</a>
        </li>
        
        <li>
          <a href="#">{isEn ?"Digital Signage" :"Affichage numérique"}</a>
        </li>
        
        <li>
          <a href="#">{isEn ?"Automation":"Automatisation"}</a>
        </li>
        
        <li>
          <a href="#">{isEn ?"Artificial Intelligence":"Intelligence Artificielle"}</a>
        </li>
        
        <li>
          <a href="#">IoT</a>
        </li>
      </ul>
    </li>
    
    <li className="nav__item">
      <h2 className="nav__title">{isEn ?"Legal" :"Juridique"}</h2>
      
      <ul className="nav__ul">
        <li>
          <a href="#">{isEn ?"Privacy Policy" :"Politique De Confidentialité"}</a>
        </li>
        
        <li>
          <a href="#">{isEn ?"Terms of Use":"Conditions d'utilisation"}</a>
        </li>
        
        <li>
          <a href="#">{isEn ?"Sitemap":"Plan du site"}</a>
        </li>
      </ul>
    </li>
  </ul>
  
  <div className="legal">
    <p>&copy; 2023 Something. All rights reserved.</p>
    
    <div className="legal__links">
      <span>Made with <span className="heart">♥</span> remotely from Anywhere</span>
    </div>
  </div>
</footer>
  )
}

export default Footer
