import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Login.css'
import AOS from 'aos';
import 'aos/dist/aos.css'

const LoginForm = ({ toggleVisibility }) => {

  useEffect(()=>{
    AOS.init({duration:1000});
    AOS.refresh();
  },[])

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formdata, setFormdata] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  }

  const handleLogin = async (e) => {
    e.preventDefault();


    setLoading(true);

    try {


      const result = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/login`, formdata,);

      console.log(result.data);
      localStorage.setItem('userToken', result.data.token);
      localStorage.setItem('userName', result.data.user.name);
      localStorage.setItem('userId', result.data.user._id);
      localStorage.setItem('userEmail', result.data.user.email);
      alert('Login Successfully');
      navigate('/user');
    }
    catch (err) {
      console.log('Login Error:', err);
      alert('Login failed due to network error');

    }
    finally {
      setLoading(false);
    }
  }
  return (
    <>
      <div className="loginform" style={{}} data-aos='zoom-in'>
        <h1 style={{ fontSize: '3rem', textAlign: 'center', fontFamily: 'Jost_h', color: '#010822', marginBottom: '5vh' }}>Login</h1>
        <div>

          <input type="text" style={{ fontSize: '1.2rem', marginTop: '3vh', fontFamily: 'Jost_l', padding: '4px 10px', border: 'none', background: 'transparent', borderBottom: '2px solid #010822', width: '100%' }}
            placeholder='Enter your Email'
            name='email'
            value={formdata.email}
            onChange={handleChange}
            required
          />
          <input type="password" style={{ fontSize: '1.2rem', marginTop: '3vh', fontFamily: 'Jost_l', padding: '4px 10px', border: 'none', background: 'transparent', borderBottom: '2px solid #010822', width: '100%' }}
            placeholder='Enter your Password'
            name='password'
            value={formdata.password}
            onChange={handleChange}
            required
          />
          <div style={{ display: 'flex', justifyContent: 'center', height: '10vh', alignItems: 'center' }}>
            <button onClick={toggleVisibility} className='smallbtn' style={{ padding: '6px', width: '100px', scale: '0.9' }}>Signup</button>
            <span className='slash' style={{}}>/</span>
            <button onClick={handleLogin} className='smallbtn' disabled={loading} style={{ padding: '10px 12px', width: '120px' }}>
              {loading ? 'Processing' : 'Login'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginForm