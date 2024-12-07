import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './Login.css'
import emoji from '../../assets/emojitwbg.png'

import AOS from 'aos';
import 'aos/dist/aos.css'

const SignupForm = ({ toggleVisibility }) => {

  useEffect(() => {
    AOS.init({ duration: 1000 });
    AOS.refresh();
  })

  const fileInputRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    image: null
  })

  const handlefileSelect = (e) => {
    fileInputRef.current.click();
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  }

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
        return;
      }

      const newFormData = new FormData();
      newFormData.append('name', formData.name);
      newFormData.append('email', formData.email);
      newFormData.append('password', formData.password);
      newFormData.append('image', formData.image);

      const result = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/register`, newFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );

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
      password: '',
      image: null,
    });
  }
  return (
    <>
      <div className='loginform_cnct' style={{ display: 'flex', height: 'auto', width: 'auto', backgroundColor: '#fff', borderRadius: '24px' }}>
        <div className="loginform" style={{}} data-aos='zoom-in'>
          <h1 style={{ fontSize: '3rem', textAlign: 'center', fontFamily: 'Jost_h', color: '#0B192C', marginBottom: '2vh' }}>Sign Up</h1>
          <p style={{ fontSize: '1.15rem', textAlign: 'center', fontFamily: 'Jost_l', color: '#0B192C', marginBottom: '4vh' }}>Hey,Thanks to join Evo Spacer. Enter your details to create account !! </p>
          <div>

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
            <input type="password" style={{ fontSize: '1.2rem', marginBottom: '24px', marginTop: '3vh', fontFamily: 'Jost_l', padding: '4px 10px', border: 'none', background: 'transparent', borderBottom: '2px solid #010822', width: '100%' }}
              placeholder='Enter your Password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              type="file"
              ref={fileInputRef} // Reference to the input
              style={{ display: 'none' }} // Hide the input
              onChange={handleFileChange} // Handle file selection
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <p style={{ fontFamily: 'Jost_l', }}>Upload Profile</p>
              <div onClick={handlefileSelect} style={{ padding: '8px 24px', fontFamily: 'Jost_l', backgroundColor: '#0B192C', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}>
                Choose
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', height: '10vh', alignItems: 'center' }}>
              {/* <button onClick={toggleVisibility} className='smallbtn' style={{ padding: '6px', width: '100px', scale: '0.9' }}>Signup</button> */}
              {/* <span className='slash' style={{}}>/</span> */}
              <button onClick={handleRegister} className='smallbtn' disabled={loading} style={{ padding: '10px 12px', width: '100%', marginTop: '25px' }}>
                {loading ? 'Processing' : 'Signup'}
              </button>
              <p style={{ fontFamily: 'Jost_l', marginTop: '20px', }}>I am already with you ? <span onClick={toggleVisibility} style={{ color: '#D91656', cursor: 'pointer' }}>Login</span></p>
            </div>
          </div>
        </div>
        <img className='emojiimg' src={emoji} alt="" />
      </div>
    </>
  )
}

export default SignupForm