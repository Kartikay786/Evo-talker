import React, { useState } from 'react'
import axios from 'axios'

const SignupForm = ({ toggleVisibility }) => {

  
  const [loading,setLoading ]  = useState(false);
  const [formData,setFormData] = useState({
    name:'',
    email:'',
    password:''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  

  const handleRegister = async (e)=>{
    e.preventDefault();
    setLoading(true);

  try{
    if(!formData.name || !formData.email || !formData.password){
      alert('Please fill all fields');
    }
    const result = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/register`,formData);
    if(result) alert('Account Created Successfully');
    console.log('Register Api response :',result)
  }
  catch(err){
    console.log('Register Api Error : ',err);
    alert('Server Error');
  }
  finally{
    setLoading(false);
  }

  setFormData({
    name:'',
    email:'',
    password:''
  });
  }
  return (
    <>
        <div className="loginform" style={{minHeight:'20vh',padding:' 6vh',border:'5px solid #ffc019', width:'400px',borderRadius:'24px'}}>
            <h1 style={{fontSize:'3rem',textAlign:'center',  fontFamily: 'Jost_h',color:'#010822',marginBottom:'5vh'}}>Signup</h1>
           
            <form action="">
                 <input type="text" style={{fontSize:'1.2rem',marginTop:'3vh',fontFamily:'Jost_l',padding:'4px 10px',border:'none',background:'transparent',borderBottom:'2px solid #010822',width:'100%'}}
                placeholder='Enter your Name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                />
                 <input type="text" style={{fontSize:'1.2rem',marginTop:'3vh',fontFamily:'Jost_l',padding:'4px 10px',border:'none',background:'transparent',borderBottom:'2px solid #010822',width:'100%'}}
                placeholder='Enter your Email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                />
                <input type="text" style={{fontSize:'1.2rem',marginTop:'3vh',fontFamily:'Jost_l',padding:'4px 10px',border:'none',background:'transparent',borderBottom:'2px solid #010822',width:'100%'}}
                placeholder='Enter your Password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                />
                
                 <button onClick={toggleVisibility} style={{width:'6vw',padding:'4px'}}>Login</button> <span style={{fontSize:'5rem',margin:'15px',position:'relative',top:'2.5vh'}}>/</span>
                  <button onClick={handleRegister} disabled={loading} style={{width:'9vw',padding:'12px'}}>
                    {loading?'Processing':'Signup'}
                    </button> 
            </form>
        </div>
    </>
  )
}

export default SignupForm