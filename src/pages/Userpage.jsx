import React from 'react'
import '../Component/Home/Home.css'
import 'remixicon/fonts/remixicon.css'
import { useNavigate } from 'react-router-dom'
import PostCnct from '../Component/AllPost/Postsection'
import bg from '../assets/uplash.jpg'

const Userpage = () => {
    const navigate = useNavigate();
    const img = localStorage.getItem('userpfp')

    const forHome = () => {
        navigate('/');
        localStorage.clear();
    }

    const forProfile = () => {
        navigate('/profile')
    }

  return (
    <>
         <div className="homepage" style={{ backgroundSize: 'cover', backgroundImage: `url(${bg})`  }} >

                   
            <nav>
            <h1> <span style={{ color: '#010822' }}>Evo_</span><span style={{ color: '#fff' }}>Sphere</span></h1>
            <div className="navelem" style={{height:'40px',display:'flex',alignItems:'center'}}>
                        <img onClick={forProfile} style={{height:'35px',width:'35px',borderRadius:'50%',objectFit:'cover',marginRight:'2vh'}} src={img} alt="" />
                    <button onClick={forHome}>Logout</button>
                </div>
            </nav>

            
                  <PostCnct/>

          
     </div>
    </>
  )
}

export default Userpage