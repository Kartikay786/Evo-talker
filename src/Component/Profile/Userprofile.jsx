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

    const name = localStorage.getItem('userName');
    const email = localStorage.getItem('userEmail');

    return (
        <>
        <div className="profilebox" style={{  }} data-aos="fade-up">
            <h1 style={{ fontSize: '3rem', textAlign: 'center', fontFamily: 'Jost_h', color: '#010822', marginBottom: '5vh' }}>Profile</h1>
            <form action="">    

               <p style={{fontFamily:'Jost_l',fontSize:'1.4rem'}}>Name : {name} </p>
               <p style={{fontFamily:'Jost_l',fontSize:'1.4rem',marginTop:'2vh'}}>Email : {email} </p>

               <div style={{ display: 'flex', justifyContent: 'center', height: '10vh', alignItems: 'center' }}>
            <button onClick={forUser} className='smallbtn' style={{ padding: '6px', width: '100px', scale: '0.9' }}>Back</button>
            <span className='slash' style={{}}>/</span>
            <button className='smallbtn' disabled style={{ padding: '10px 12px', width: '120px' }}>
              Update
            </button>
          </div>
            </form>
        </div>        

        </>
    )
}

export default Userprofile