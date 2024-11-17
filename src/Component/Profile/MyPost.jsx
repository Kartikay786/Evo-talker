import React, { useState,useEffect } from 'react'

import axios from 'axios';

import AOS from 'aos';
import 'aos/dist/aos.css'


const MyPost = () => {

    
    
  useEffect(()=>{
    AOS.init({duration:1000});
    AOS.refresh();
},[]);

    const [data ,setData] = useState([]);

    const token = localStorage.getItem('userToken');
    
    const userId = localStorage.getItem('userId');

    const name = localStorage.getItem('userName');

    useEffect(() => {
        const getAllPost = async () => {
            try {
                const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/post/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setData(result.data);
                console.log(result);
            } catch (err) {
                console.log('Error fetching posts:', err);
            }
        };
        getAllPost();
    }, []);
    return (
        <>
            <div className="myPostpage">
                <h1 style={{ fontSize: '2rem', margin: '10px 0 20px ', textAlign: 'center', padding: '0 0 20px ', color: '#010822', }}>My Post</h1>

                {
                data.map((post) => (
                    <div key={post._id} data-aos="fade-right"  style={{ backgroundColor: "#febe16",
                        border: "4px solid #febe16",
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        padding: "20px",
                        maxWidth: "90%",
                        margin: "20px auto",
                        color: "#010822",}}>
                        <h1 style={{ fontSize: '2rem', margin: '10px 0 20px ', padding: '0 0 20px ', color: '#010822', borderBottom: '1px solid #010822' }}>{name || 'NA'}</h1>

                        <h1 style={{ fontSize: '1.5rem', fontWeight: '500', margin: '10px 0 5px ', color: '#010822' }}>{post.title}</h1>
                        <div style={{ fontFamily: 'Jost_l', fontSize: '1.3rem', color: '#032119', margin: '2vh 0' }}>{post.content}</div>
                        <p style={{ fontSize: '1.1rem', fontFamily: 'Jost_l', marginTop: '2.5vh', color: '#032119', fontWeight: '600' }}>{post.tags.join(' ')}</p>

                      
                        <button type="submit"  style={{ padding: '4px 4px',width:'90px', display: 'flex', justifySelf: 'flex-end', justifyContent: 'center' }}>
                           Update
                        </button>
                          
                    </div>
                ))}
            </div>
        </>
    )
}

export default MyPost