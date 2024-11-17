import React, { useState } from 'react'
import '../Component/Home/Home.css'
import 'remixicon/fonts/remixicon.css'
import greenbg from '../assets/EvoTalkerbg.jpg'
import LoginForm from '../Component/Login/LoginForm'
import SignupForm from '../Component/Login/Signupform'
import { useNavigate } from 'react-router-dom'
import '../Component/Login/Login.css'

const Loginpage = () => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(true);

    const forHome = () => {
        navigate('/')
    }

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <>
            <div className="homepage">

                <nav>
                    <h1> <span style={{ color: '#010822' }}>Evo_</span><span style={{ color: '#ffc019' }}>Sphere</span></h1>
                    <div className="navelem">
                        <button onClick={forHome}>Back</button>
                    </div>
                </nav>

                <div className="container">
                    <div className="ylw_cnct">

                        {isVisible && <LoginForm toggleVisibility={toggleVisibility} />}
                        {!isVisible && <SignupForm toggleVisibility={toggleVisibility} />}

                        
                    </div>

                    <div id='green_cnct' className="grn_cnct">
                        <img src={greenbg} alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Loginpage