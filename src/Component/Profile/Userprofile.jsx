import React from 'react'
import { useNavigate } from 'react-router-dom';

const Userprofile = () => {
    const navigate = useNavigate();

    const forUser = () => {
        navigate('/user')
    };

    const name = localStorage.getItem('userName');
    const email = localStorage.getItem('userEmail');

    return (
        <>
        <div className="loginform" style={{ height: '50vh', padding: ' 6vh', border: '5px solid #ffc019', width: '90%', borderRadius: '24px' }}>
            <h1 style={{ fontSize: '3rem', textAlign: 'center', fontFamily: 'Jost_h', color: '#010822', marginBottom: '5vh' }}>Profile</h1>
            <form action="">    

               <p style={{fontFamily:'Jost_l',fontSize:'1.4rem'}}>Name : {name} </p>
               <p style={{fontFamily:'Jost_l',fontSize:'1.4rem',marginTop:'2vh'}}>Email : {email} </p>

                <button onClick={forUser} style={{ width: '6vw', padding: '4px' }}>Back</button> <span style={{ fontSize: '5rem', margin: '15px', position: 'relative', top: '2.5vh' }}>/</span> <button style={{ width: '9vw', padding: '12px' }}>Update</button>
            </form>
        </div>        

        </>
    )
}

export default Userprofile