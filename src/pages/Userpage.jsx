import React from 'react'
import '../Component/Home.css'
import 'remixicon/fonts/remixicon.css'
import greenbg from '../assets/EvoTalkerbg.jpg'
import LoginForm from '../Component/LoginForm'
import SignupForm from '../Component/Signupform'
import Postsection from '../Component/Postsection'
import { useNavigate } from 'react-router-dom'
import PostCnct from '../Component/Postsection'

const Userpage = () => {
    const navigate = useNavigate();

    const forHome = () => {
        navigate('/');
        localStorage.clear();
    }

    const forProfile = () => {
        navigate('/profile')
    }

  return (
    <>
        <div className="homepage" style={{minHeight:'100vh'}}>
            
            <nav>
                <h1> <span style={{color:'#010822'}}>Evo_</span><span style={{color:'#ffc019'}}>Talker</span></h1>
                <div className="navelem">
                    <span onClick={forProfile} style={{backgroundColor:'#314B43',color:'#fff',padding:'8px',borderRadius:'50%',marginRight:'2vh'}}><i className="ri-user-line"></i></span>
                    <button onClick={forHome}>Logout</button>
                </div>
            </nav>

            <div className="container">

                  <PostCnct/>


                <div className="grn_cnct" >
                    <img src={greenbg} alt="" />
                </div>
            </div>
     </div>
    </>
  )
}

export default Userpage