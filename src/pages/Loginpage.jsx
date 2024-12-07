import React, { useState } from 'react'
import '../Component/Home/Home.css'
import 'remixicon/fonts/remixicon.css'
import greenbg from '../assets/EvoTalkerbg.jpg'
import LoginForm from '../Component/Login/LoginForm'
import SignupForm from '../Component/Login/Signupform'
import { useNavigate } from 'react-router-dom'
import bg from '../assets/uplash.jpg'
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
            <div className="homepage" style={{ backgroundSize: 'cover', backgroundImage: `url(${bg})` }} >

                <nav>
                    <h1> <span style={{ color: '#010822' }}>Evo_</span><span style={{ color: '#fff' }}>Sphere</span></h1>
                    <div className="navelem">
                        <button onClick={forHome}>Back</button>
                    </div>
                </nav>

                <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>

                    {isVisible && <LoginForm toggleVisibility={toggleVisibility} />}
                    {!isVisible && <SignupForm toggleVisibility={toggleVisibility} />}

                </div>

                
            </div>
        </>
    )
}

export default Loginpage