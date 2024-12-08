import React, { useState, useEffect } from 'react'

import axios from 'axios';

import AOS from 'aos';
import 'aos/dist/aos.css'


const MyPost = () => {

    const [data, setData] = useState([]);
    const token = localStorage.getItem('userToken');

    // Initialize AOS
    useEffect(() => {
        AOS.init({ duration: 1000 });
        AOS.refresh();
    }, []);

    // Fetch all posts
    const getAllPost = async () => {
        try {
            const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/post/userpost`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setData(result.data.post);
        } catch (err) {
            console.error('Error fetching posts:', err);
        }
    };

    // Fetch posts on component mount
    useEffect(() => {
        getAllPost();
    }, []);

    // Handle delete post
    const handleDelete = async (e, postId) => {
        e.preventDefault();

        try {
            if (!postId) return console.log('PostId not found');

            await axios.delete(`${import.meta.env.VITE_API_URL}/api/post/${postId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert('Post deleted successfully');
            getAllPost(); // Fetch posts after deletion
        } catch (err) {
            console.error('Error deleting post:', err);
        }
    };

  

    return (
        <>
            <h1 style={{ fontSize: '2.5rem', margin: '10px 0 20px ', fontFamily: 'Jost_h', textAlign: 'center', padding: '0 0 20px ', color: '#fff', }}>My Post</h1>

            <div className="myPostpage"
                style={{
                    minHeight: '30vh',
                    marginTop: '5vh',
                    display: 'flex',
                    gap: '8vh',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                }}
            >
                {
                    data.map((post) => (
                        <div className="postcard" key={post._id}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                padding: '16px',
                                width: '520px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                backgroundColor: '#fff',
                            }}
                        >
                            <div className="userdets" style={{ display: 'flex' }}>
                                <img className="pfpic" src={post.authorImg} alt="" />
                                <div className="username" style={{ fontFamily: 'Jost_l' }}>
                                    <p>{post.authorName}</p>
                                    <p style={{ color: '#999', fontSize: '14px' }}>
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div className="postcontent">
                                {post.image && <img src={post.image} alt="Post" />}
                                <p className="posttext">{post.content}</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'end', marginTop: '24px', gap: '16px' }}>
                                {/* <button type="submit" style={{ padding: '10px 8px', width: '100px', backgroundColor: '#D91656', color: '#fff', borderRadius: '8px' }}>
                                    Update
                                </button> */}
                                <button onClick={(e) => handleDelete(e, post._id)} type="submit" style={{ padding: '10px 8px', width: '100px', backgroundColor: '#D91656', color: '#fff', borderRadius: '8px' }}>
                                    Delete
                                </button>
                            </div>



                        </div>
                    ))}
            </div>
        </>
    )
}

export default MyPost