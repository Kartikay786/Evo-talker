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
            <div className="homepage" style={{ backgroundSize: '', backgroundImage: "url('https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjU0NmJhdGNoMy1teW50LTM0LWJhZGdld2F0ZXJjb2xvcl8xLmpwZw.jpg')" }} >

                <nav>
                    <h1> <span style={{ color: '#010822' }}>Evo_</span><span style={{ color: '#ffbb6d' }}>Sphere</span></h1>
                    <div className="navelem">
                        <button onClick={forHome}>Back</button>
                    </div>
                </nav>

                <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                    {isVisible && <LoginForm toggleVisibility={toggleVisibility} />}
                    {!isVisible && <SignupForm toggleVisibility={toggleVisibility} />}
                    {/*     <div className="ylw_cnct">

                        {isVisible && <LoginForm toggleVisibility={toggleVisibility} />}
                        {!isVisible && <SignupForm toggleVisibility={toggleVisibility} />}

                        
                    </div>

                    <div id='green_cnct' className="grn_cnct">
                        <img src={greenbg} alt="" />
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default Loginpage