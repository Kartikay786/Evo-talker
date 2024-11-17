
// author not take

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './AllPost.css'

import AOS from 'aos';
import 'aos/dist/aos.css'


const PostCnct = () => {

    useEffect(()=>{
        AOS.init({duration:1000});
        AOS.refresh();
      },[])

      
    const [data, setData] = useState([]);
    const [postUser, setPostUser] = useState();
    const [postComments, setPostComments] = useState([]);

    const userId = localStorage.getItem('userId');

    const token = localStorage.getItem('userToken');

    // get all post

    useEffect(() => {
        const getAllPost = async () => {
            try {
                const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/post/`);
                setData(result.data.posts);
                // console.log(result.data.posts);
            } catch (err) {
                console.log('Error fetching posts:', err);
            }
        };
        getAllPost();
    }, []);

    // get all comments

   
        const getPostComments = async (postId) => {
            try {
                const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/comment/${postId}`);
                setPostComments(result.data.comments);

                console.log(postComments);
            } catch (err) {
                console.log('Error fetching posts:', err);
            }
        };


    // create comment

    const [formData, setFormData] = useState({
        comment: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCreateComment = async (e, postId) => {
        e.preventDefault();

        try {
            const result = await axios.post(`${import.meta.env.VITE_API_URL}/api/comment/${postId}/${userId}`, formData, {
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
            comment: ''
        });
    };

    return (
        <div className="ylw_cnct" style={{ justifyContent: 'start', paddingTop: '15vh' }}>

            <div className="postcontainer" style={{}}>
                {/* {data.map((post) => (
                    <div key={post._id} className="post" style={{}}>
                        <h1 style={{ fontSize: '2rem', margin: '10px 0 20px ', padding: '0 0 20px ', color: '#010822', borderBottom: '1px solid #010822' }}>{post.author.name || 'NA'}</h1>

                        <h1 style={{ fontSize: '1.5rem', fontWeight: '500', margin: '10px 0 5px ', color: '#010822' }}>{post.title}</h1>
                        <div style={{ fontFamily: 'Jost_l', fontSize: '1.3rem', color: '#032119', margin: '2vh 0' }}>{post.content}</div>
                        <p style={{ fontSize: '1.1rem', fontFamily: 'Jost_l', marginTop: '2.5vh', color: '#032119', fontWeight: '600' }}>{post.tags.join(' ')}</p>

                        <div style={{width:'100%'}}>
                            <input
                                type="text"
                                name='comment'
                                className='commentInput'
                                value={formData.comment}
                                onChange={handleChange}
                                style={{ }}
                                placeholder='Write a Comment ...'
                            />

                            <button className='sendbtn' onClick={(e) => handleCreateComment(e, post._id)} style={{ backgroundColor: '#032119', padding: '2px', width: '50px', height: '50px', borderRadius: '50%', marginLeft: '10px', color: '#fff', fontFamily: 'Jost_l', fontWeight: '100' }}><i className="ri-send-plane-fill"></i></button>
                        </div>
                    </div>
                ))} */}
                {data.map((post) => (
                    <div key={post._id} style={styles.cardContainer} data-aos="fade-right">
                        <div style={styles.header}>
                            <h2 style={styles.title}>{post.title}</h2>
                            <p style={styles.username}>by {post.author.name}</p>
                        </div>
                        <div style={styles.content}>
                            <p>{post.content}</p>
                        </div>
                        <div style={styles.footer}>
                            <div style={styles.tags}>
                                {post.tags.map((tag, index) => (
                                    <span key={index} style={styles.tag}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div style={styles.comments}>
                                <strong>Comments:</strong>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItem: 'center', height: '5vh', margin: '12px 0' }}>
                                    <input
                                        type="text"
                                        name='comment'
                                        className='commentInput'
                                        value={formData.comment}
                                        onChange={handleChange}
                                        style={{}}
                                        placeholder='Write a Comment ...'
                                    />

                                    <button className='sendbtn' onClick={(e) => handleCreateComment(e, post._id)} style={{ backgroundColor: '#032119', padding: '2px', width: '40px', height: '40px', borderRadius: '50%', marginLeft: '10px', color: '#fff', fontFamily: 'Jost_l', fontWeight: '100', marginTop: '0vh' }}><i className="ri-send-plane-fill " style={{ marginTop: '1vh' }}></i></button>

                                   
                                </div>
                                {/* <p onClick={(e) => {getPostComments(post._id)}} style={{ fontSize: '1rem', fontFamily: 'Jost_l', marginTop: '2.5vh', color: '#032119', cursor: 'pointer' }}>See Comments ....</p> */}

                            </div>
                            {/* {
                                postComments && (
                                    <ul style={styles.commentList}>
                                        {postComments.map((comment, index) => (
                                            <li key={index} style={styles.comment}>
                                                {comment.comment}
                                            </li>
                                        ))}
                                    </ul>
                                )
                            } */}

                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
};


const styles = {
    cardContainer: {
        backgroundColor: "#febe16",
        border: "4px solid #febe16",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        maxWidth: "100%",
        margin: "20px auto",
        color: "#010822",
    },
    header: {
        borderBottom: "1px solid #314B43",
        marginBottom: "10px",
        paddingBottom: "10px"
    },
    title: {
        fontSize: "1.9rem",
        fontWeight: "bold",
        color: "#032119",
        margin: 0,
        fontFamily: 'Jost_h'
    },
    username: {
        fontSize: "1.2rem",
        color: "#032119",
        margin: 0,
        marginTop: '4px',
        fontFamily: 'Jost_l'
    },
    content: {
        fontSize: "16px",
        margin: "10px 0",
        color: '#032119',
        lineHeight: "1.5",
        fontFamily: 'Jost_l'
    },
    footer: {
        marginTop: "13px",
    },
    tags: {
        display: "flex",
        flexWrap: "wrap",
        gap: "5px",
    },
    tag: {
        backgroundColor: "",
        color: "#032119",
        fontSize: "15px",
        borderRadius: "4px",
        padding: "5px 8px",
        fontWeight: '600',
        fontFamily: 'Jost_h'
    },

    comments: {
        marginTop: "15px",
        fontSize: "17px",
        fontFamily: 'Jost_l',
        color: '#032119'
    },
    commentList: {
        listStyleType: "none",
        padding: 0,
        margin: 0,
        fontFamily: 'Jost_l'
    },
    comment: {
        backgroundColor: "#032119   ",
        color: "#fff8e6",
        padding: "5px 10px",
        borderRadius: "4px",
        marginBottom: "5px",
    },
};

export default PostCnct