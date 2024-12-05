import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './Login.css'

import AOS from 'aos';
import 'aos/dist/aos.css'

const SignupForm = ({ toggleVisibility }) => {

  useEffect(()=>{
    AOS.init({duration:1000});
    AOS.refresh();
  })

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.name || !formData.email || !formData.password) {
        alert('Please fill all fields');
      }
      const result = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/register`, formData);
      if (result) alert('Account Created Successfully');
      toggleVisibility();
      console.log('Register Api response :', result)
    }
    catch (err) {
      console.log('Register Api Error : ', err);
      alert('Server Error');
    }
    finally {
      setLoading(false);
    }

    setFormData({
      name: '',
      email: '',
      password: ''
    });
  }
  return (
    <>
      <div className="loginform" style={{  }}  data-aos='zoom-in'>
        <h1 style={{ fontSize: '3rem', textAlign: 'center', fontFamily: 'Jost_h', color: '#010822', marginBottom: '2vh' }}>Signup</h1>
        <p style={{ fontSize: '1.15rem', textAlign: 'center', fontFamily: 'Jost_l', color: '#010822', marginBottom: '4vh' }}>Hey, Enter your details to create  your account !! </p>
      
        <form action="">
          <input type="text" style={{ fontSize: '1.2rem', marginTop: '3vh', fontFamily: 'Jost_l', padding: '4px 10px', border: 'none', background: 'transparent', borderBottom: '2px solid #010822', width: '100%' }}
            placeholder='Enter your Name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input type="text" style={{ fontSize: '1.2rem', marginTop: '3vh', fontFamily: 'Jost_l', padding: '4px 10px', border: 'none', background: 'transparent', borderBottom: '2px solid #010822', width: '100%' }}
            placeholder='Enter your Email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input type="password" style={{ fontSize: '1.2rem',marginBottom:'28px', marginTop: '3vh', fontFamily: 'Jost_l', padding: '4px 10px', border: 'none', background: 'transparent', borderBottom: '2px solid #010822', width: '100%' }}
            placeholder='Enter your Password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            required
          />


          <div style={{ display: 'flex', justifyContent: 'center', height: '10vh', alignItems: 'center' }}>
            <button onClick={toggleVisibility} className='smallbtn' style={{ padding: '6px', width: '100px', scale: '0.9' }}>Login</button>
            <span className='slash' style={{}}>/</span>
            <button onClick={handleRegister} className='smallbtn' disabled={loading} style={{ padding: '10px 12px', width: '120px' }}>
              {loading ? 'Processing' : 'Signup'}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default SignupForm