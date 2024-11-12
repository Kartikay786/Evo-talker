import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ toggleVisibility }) => {

  const navigate = useNavigate();
  const [loading,setLoading ]  = useState(false);
  
    const [formdata,setFormdata] =useState({
      email:'',
      password:''
    })

    const handleChange = (e)=>{
      const {name, value} = e.target ; 
      setFormdata({...formdata,[name]:value});
    }

    const handleLogin = async (e) => {
      e.preventDefault();
      setLoading(true);

      try{

        if(!formdata.email || !formdata.password){
          alert('Please fill all fields');
        }

        const result = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/login`,formdata,);

        console.log(result.data);
        localStorage.setItem('userToken',result.data.token);
        localStorage.setItem('userName',result.data.user.name);
        localStorage.setItem('userId',result.data.user._id);
        localStorage.setItem('userEmail',result.data.user.email);
        alert('Login Successfully');
        navigate('/user');
      }
      catch(err){
        console.log('Login Error:',err);
        alert('Login failed due to network error');
        
      }
      finally{
        setLoading(false);
      }
    }
  return (
    <>
        <div className="loginform" style={{minHeight:'20vh',padding:' 6vh',border:'5px solid #ffc019', width:'400px',borderRadius:'24px'}}>
            <h1 style={{fontSize:'3rem',textAlign:'center',  fontFamily: 'Jost_h',color:'#010822',marginBottom:'5vh'}}>Login</h1>
            <form action="">
                
                 <input type="text"  style={{fontSize:'1.2rem',marginTop:'3vh',fontFamily:'Jost_l',padding:'4px 10px',border:'none',background:'transparent',borderBottom:'2px solid #010822',width:'100%'}}
                placeholder='Enter your Email'
                name='email'
                value={formdata.email}
                onChange={handleChange}
                />
                <input type="text" style={{fontSize:'1.2rem',marginTop:'3vh',fontFamily:'Jost_l',padding:'4px 10px',border:'none',background:'transparent',borderBottom:'2px solid #010822',width:'100%'}}
                placeholder='Enter your Password'
                name='password'
                value={formdata.password}
                onChange={handleChange}
                />
                 <button onClick={toggleVisibility}   style={{width:'6vw',padding:'4px'}}>Signup</button> <span style={{fontSize:'5rem',margin:'15px',position:'relative',top:'2.5vh'}}>/</span>
                  <button onClick={handleLogin} disabled={loading} style={{width:'9vw',padding:'12px'}}>
                    {loading? 'Processing...' : 'Login'}
                    </button> 
            </form>
        </div>
    </>
  )
}

export default LoginForm