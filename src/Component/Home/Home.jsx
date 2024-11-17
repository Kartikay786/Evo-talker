import React, { useEffect } from 'react'
import './Home.css'
import 'remixicon/fonts/remixicon.css'
import greenbg from '../../assets/EvoTalkerbg.jpg'
import { useNavigate } from 'react-router-dom'

import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {

    useEffect(()=>{
        AOS.init({duration:1000});
        AOS.refresh();
    },[]);

    const navigate = useNavigate();

    const forLogin = () => {
        navigate('/login')
    }

  return (
    <>
        <div className="homepage">
            
            <nav>
                <h1> <span style={{color:'#010822'}}>Evo_</span><span style={{color:'#ffc019'}}>Sphere</span></h1>
                <div className="navelem">
                    <button onClick={forLogin}>Login</button>
                </div>
            </nav>

            <div className="container">
                <div className="ylw_cnct">
                    <h1 data-aos="fade-up" >Connect with <span style={{color:'#ffc019 '}}>Evo_Sphere</span> to connecting World </h1>
                   <div data-aos="fade-up" style={{width:'100%'}}> <button className='homepage_ylw_btn' onClick={forLogin}>Get Started <i className="ri-arrow-right-up-line"></i></button></div>
                </div>
                <div className="grn_cnct" >
                    <img src={greenbg} alt="" />
                </div>
            </div>
     </div>
    </>
  )
}

export default Home