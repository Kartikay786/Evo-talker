
// author not take

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './AllPost.css'

import AOS from 'aos';
import 'aos/dist/aos.css'


const PostCnct = () => {

    useEffect(() => {
        AOS.init({ duration: 1000 });
        AOS.refresh();
    }, [])

    const [data, setData] = useState([]);
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('userToken');
    const name = localStorage.getItem('userName');
    const [commentboxVisible, setCommentboxVisible] = useState(false);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [commentInput, setCommentInput] = useState("");
    const [likesCount,setLikesCount] = useState([]);


    // fetch post
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:3000/api/post/", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPosts(response.data.posts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    // like 
    const handleLike = async (postId,setLikesCount) => {
        try {
            const response = await axios.post(`http://localhost:3000/api/comment/like/${postId}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // setPosts((prevPosts) =>
            //     prevmap((post) =>
            //         post._id === postId ? { ...post, likes: post.likes + 1 } : post
            //     )
            // );
            setLikesCount(response.data);
            console.log(response.data)
        } catch (error) {
            console.error("Error liking the post:", error);
        }
    };

    // add comment
    const handleAddComment = async (postId) => {
        if (!commentInput.trim()) return; // Prevent empty comments
        try {
            const response = await axios.post(
                `YOUR_API_ENDPOINT/posts/${postId}/comments`,
                { text: commentInput },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post._id === postId
                        ? { ...post, comments: [...post.comments, response.data] }
                        : post
                )
            );
            setCommentInput(""); // Reset input
        } catch (error) {
            console.error("Error adding a comment:", error);
        }
    };




    return (
        <div className="container" style={{padding:'0 4vw'}}>

        <div className="ylw_cnct" style={{ justifyContent: 'start', paddingTop: '15vh', width: '100%' }}>

            <div className="postcontainer" style={{}}>

         


                {loading ? (
                    <p>Loading...</p>
                ) : (
                    posts.map((post) => (
                        <div className="postcard" key={post._id}>
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
                            <hr style={{ marginTop: '24px', marginBottom: '12px' }} />
                            <div className="tools">
                                <div style={{ fontFamily: 'Jost_l', color: '#D91656',display:'flex',alignItems:'center' }} >
                                    <i onClick={() => handleLike(post._id,setLikesCount)} className="ri-heart-3-fill" /> {post.likes} Like
                                </div>
                                <p
                                    onClick={() =>
                                        setPosts((prev) =>
                                            prev.map((p) =>
                                                p._id === post._id
                                                    ? { ...p, showComments: !p.showComments }
                                                    : p
                                            )
                                        )
                                    }
                                    style={{ cursor: 'pointer' }}
                                >
                                    View Comments
                                </p>
                            </div>
                            {post.showComments && (
                                <div className="commentbox">
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            handleAddComment(post._id);
                                        }}
                                        style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}
                                    >
                                        <input
                                            className="commentInput"
                                            type="text"
                                            value={commentInput}
                                            onChange={(e) => setCommentInput(e.target.value)}
                                            placeholder="Share your Opinion ..."
                                        />
                                        <button type="submit"
                                        style={{ width: '50px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', margin: '0' }}
                                        >
                                            <i className="ri-send-plane-fill" />
                                        </button>
                                    </form>
                                    
                                    {post.comments.map((comment) => (
                                        <>
                                          <p style={{ marginTop: '16px', fontFamily: 'Jost_l', color: '#555', textAlign: 'center' }}> . . .</p>
                                  
                                        <p style={{ marginTop: '16px', fontFamily: 'Jost_l', color: '#555', padding: '0 12px' }} key={comment._id}>{comment.text}</p>
                                        </>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))
                )}

        {/* <div className="postcard">
                    <div className="userdets" style={{ display: 'flex' }}>
                        <img className='.pfpic' src="https://images6.alphacoders.com/135/1354082.jpeg" alt="" />
                        <div className="username" style={{ fontFamily: 'Jost_l' }}>
                            <p>Kuserboy789</p>
                            <p style={{ color: '#999', fontSize: '14px' }}>6 days ago</p>
                        </div>
                    </div>
                    <div className='postcontent'>
                        <img src="https://i.pinimg.com/originals/e8/c0/14/e8c01439e7eaa357d3608730b32ae42e.jpg" alt="" />
                        <p className='posttext'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam fuga mollitia accusantium perspiciatis commodi odit, fugit hic laborum praesentium sunt magni architecto nisi. Corporis nulla in voluptates quae et autem?</p>
                    </div>
                    <hr style={{ marginTop: '24px', marginBottom: '12px' }} />
                    <div className="tools">
                        <div style={{ fontFamily: 'Jost_l', color: '#D91656' }}> <i class="ri-heart-3-fill"></i> Like</div>
                        <p onClick={() => setCommentboxVisible(!commentboxVisible)} style={{ cursor: 'pointer' }}>View Comments</p>
                    </div>
                    </div> */}
            </div>
        </div>
        </div>
    );
};

export default PostCnct