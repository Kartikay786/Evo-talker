
// author not take

import axios from 'axios';
import React, { useEffect, useState } from 'react';



const PostCnct = () => {
    const [data, setData] = useState([]);
    const [postUsername,setPostUsername] = useState();

    const userId = localStorage.getItem('userId');
    
    const token = localStorage.getItem('userToken');

    // get all post

    useEffect(() => {
        const getAllPost = async () => {
            try {
                const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/post/`);
                setData(result.data.posts);
                console.log(result.data.posts);
            } catch (err) {
                console.log('Error fetching posts:', err);
            }
        };
        getAllPost();
    }, []);

    // get all comments

    useEffect(() => {
        const getPostComments = async () => {
            try {
                const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/comment/6731ce665a914625a40588d1`);
                setPostUsername(result.data);
                console.log(result.data.comments);
            } catch (err) {
                console.log('Error fetching posts:', err);
            }
        };
        getPostComments();
    }, []);


    // create comment

    const [formData,setFormData] = useState({
        comment:''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCreateComment = async (e,postId) => {
        e.preventDefault();

        try {
            const result = await axios.post(`https://post-backend-1-7lgf.onrender.com/api/comment/${postId}/${userId}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log('Comment response:', result);
            alert('Comment created successfully');
        } catch (err) {
            console.log('Comment error:', err);
            alert('Network Issue');
        }

        setFormData({
            comment:''
        });
    };

    return (
        <div className="ylw_cnct" style={{ justifyContent: 'start', paddingTop: '15vh' }}>
             
       <div className="postcontainer" style={{ width: '90%', minHeight: '30vh'}}>
            {data.map((post) => (
                <div key={post._id} className="post" style={{ minHeight: '30vh', width: '100%', backgroundColor: '#febe16', marginTop: '8vh', borderRadius: '12px', padding: '4vh' }}>
                    <h1 style={{ fontSize: '2rem', margin: '10px 0 20px ',padding:'0 0 20px ', color: '#010822',borderBottom:'1px solid #010822' }}>{post.author.name || 'NA'}</h1>
                    
                    <h1 style={{ fontSize: '1.5rem',fontWeight:'500', margin: '10px 0 5px ', color: '#010822' }}>{post.title}</h1>
                    <div style={{ fontFamily: 'Jost_l', fontSize: '1.3rem', color: '#032119',margin:'2vh 0' }}>{post.content}</div>
                    <p style={{ fontSize: '1.1rem', fontFamily: 'Jost_l', marginTop: '2.5vh', color: '#032119', fontWeight: '600' }}>{post.tags.join(' ')}</p>

                    <input 
                        type="text" 
                        name='comment'
                        value={formData.comment}
                        onChange={handleChange}
                        style={{ width: '88%', marginTop: '5vh', borderRadius: '16px', fontSize: '1.2rem', fontFamily: 'Jost_l', padding: '8px 12px', border: '2px solid #032119 ', color: '#032119 ', background: 'transparent' }}
                        placeholder='Write a Comment ...'
                    />
                    
                    <button onClick={(e) => handleCreateComment(e, post._id)} style={{backgroundColor:'#032119',padding:'2px',width:'50px', height:'50px',borderRadius:'50%',marginLeft:'10px',color:'#fff',fontFamily:'Jost_l',fontWeight:'100'}}><i className="ri-send-plane-fill"></i></button>
                </div>
            ))}
        </div>
        </div>
    );
};

export default PostCnct