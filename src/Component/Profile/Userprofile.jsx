import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

import AOS from 'aos';
import 'aos/dist/aos.css'

const Userprofile = () => {

  useEffect(()=>{
    AOS.init({duration:1000});
    AOS.refresh();
},[]);


    const navigate = useNavigate();

    const forUser = () => {
        navigate('/user')
    };

    
    const img = localStorage  .getItem('userpfp')
    const name = localStorage.getItem('userName');
    const email = localStorage.getItem('userEmail');

    return (
        <>
        <div className="profilebox" style={{  }} data-aos="fade-up">
            {/* <h1 style={{ fontSize: '3rem', textAlign: 'center', fontFamily: 'Jost_h', color: '#010822', marginBottom: '5vh' }}>Profile</h1> */}
            <form action="">    
                <img src={img} style={{objectFit:'cover',height:'20vh',zIndex: '5px',position:'relative',width:'20vh',borderRadius:'50%',display:'flex',justifySelf:'center',margin:'2vh 0 4vh 0'}} alt="" />
               <p style={{fontFamily:'Jost_l',zIndex: '5px',position:'relative',fontSize:'1.4rem', color: '#010822'}}>Name : {name} </p>
               <p style={{fontFamily:'Jost_l',zIndex: '5px',position:'relative',fontSize:'1.4rem', color: '#010822',marginTop:'11px'}}>Email : {email} </p>

               <div style={{ display: 'flex', justifyContent: 'end', height: '10vh', alignItems: 'center' }}>
            {/* <button onClick={forUser} className='smallbtn' style={{ padding: '6px', width: '100px', scale: '0.9' }}>Back</button>
            <span className='slash' style={{}}>/</span> */}
            <button className='smallbtn' disabled style={{ padding: '10px 12px', width: '120px',backgroundColor:'#D91656  ',color:'#fff',borderRadius:'8px',marginRight:'12px',cursor:'pointer' }}>
              Update
            </button>
          </div>
            </form>
        </div>        

        {/* <div style={{position:'fixed',height:'100vh',width:'100%',backgroundColor:'#d9165782',top:'0'}}>
              
        </div> */}
        </>
    )
}

export default Userprofile