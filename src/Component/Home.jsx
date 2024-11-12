import React from 'react'
import './Home.css'
import 'remixicon/fonts/remixicon.css'
import greenbg from '../assets/EvoTalkerbg.jpg'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const navigate = useNavigate();

    const forLogin = () => {
        navigate('/login')
    }

  return (
    <>
        <div className="homepage">
            
            <nav>
                <h1> <span style={{color:'#010822'}}>Evo_</span><span style={{color:'#ffc019'}}>Talker</span></h1>
                <div className="navelem">
                    <button onClick={forLogin}>Login</button>
                </div>
            </nav>

            <div className="container">
                <div className="ylw_cnct">
                    <h1>Connect with <span style={{color:'#ffc019 '}}>Evo_Talker</span> to connecting World </h1>
                    <button onClick={forLogin}>Get Started <i className="ri-arrow-right-up-line"></i></button>
                </div>
                <div className="grn_cnct">
                    <img src={greenbg} alt="" />
                </div>
            </div>
     </div>
    </>
  )
}

export default Home