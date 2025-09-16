import React, { useEffect } from 'react'
import './Welcome.css'
import { Link } from 'react-router-dom'
import logo from '../../assets/filesshare-removebg.png'
import Design from '../../assets/Design_sans_titre-removebg-preview.png'
import AOS from "aos";
import "aos/dist/aos.css";
import ScrollReveal from 'scrollreveal';


export default function Welcome() {

  useEffect(() => {
    ScrollReveal().reveal('.reveal', {
      duration: 4000,    // Durée de l'animation en ms
      origin: 'bottom',  // L'origine du scroll (top, bottom, left, right)
      distance: '50px',  // Distance à parcourir
      easing: 'ease-in-out',  // Type d'animation
      reset: true        // L'animation se répète quand on scroll à nouveau
    });
    ScrollReveal().reveal('.nav', {
      duration: 3000,   
      opacity: 0, 
      distance: '0px',  
      easing: 'ease-in-out',       
    })
    ScrollReveal().reveal('.reveal2', {
      duration: 3000,   
      origin: 'left',
      distance: '50px',  
      easing: 'ease-in-out',       
    })
    AOS.init();
  }, []);

  useEffect(() => {
    // ..
    // Simule le comportement de window.onload avec useEffect

    // Simule window.onload
    // window.setTimeout(fadeout, 500);
  }, []);
  return (
    <div className='welcome'>
<nav class="nav">
  <a href="#">
<img src={logo} alt=""  />
<span className='pacifico'>FilesShare</span>
  </a>
</nav>
<section class="body">
<div>
        <h1 className='reveal'>Welcome to FilesShare !</h1>
        <p className='reveal2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel libero vel nunc ultricies semper. Donec tincidunt, nunc vel volutpat eleifend, justo risus vulputate ipsum, a pulvinar velit velit vel velit. Donec aliquet ligula vel ipsum placerat, at gravida velit dignissim.</p>
        <p className='reveal2'>Lorem ipsum dolor sit amet.</p>
        <Link to="/authentication"  >
        
        <h2  data-aos="fade-up-left"
                  data-aos-duration="3000" >Commencer</h2>
  
        </Link>
    </div>
    <div >
      <img src={Design} alt="" className='nav' />
    </div>
</section>
        
    </div>
  )
}
