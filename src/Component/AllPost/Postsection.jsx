
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
    const [likesCount, setLikesCount] = useState([]);
    const [commentData, setCommentData] = useState([]);
    const [likes, setLikes] = useState();
    const [hasliked, setHasliked] = useState();



    // fetch post
    const fetchPosts = async () => {

        try {
            setLoading(true);
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/post/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPosts(response.data.posts.reverse());

        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // like 
    const handleLike = async (postId, setLikesCount) => {
        try {
            const response = await axios.patch(`${import.meta.env.VITE_API_URL}/api/post/like/${postId}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setPosts((prevPosts)=>{
                prevPosts.map((post)=>{
                    post._id === post ? {
                        ...post,
                        likes:response.data.likes,
                        hasliked : !post.hasliked,
                    } :
                    post
                })
            })
        } catch (error) {
            console.error("Error liking the post:", error);
        }
    };

    // add comment
    const handleAddComment = async (postId) => {


        if (!commentInput.trim()) return; // Prevent empty comments
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/comment/${postId}`,
                { comment: commentInput },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post._id === postId
                        ? { ...post, comments: [...post.comments, response.data] }
                        : post
                )
            );
            alert('Comment done');
            getComment();
            fetchPosts();
            // Reset input
        } catch (error) {
            console.error("Error adding a comment:", error);
        }
        setCommentInput("");
    };

    const getComment = async (postId) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/comment/${postId}`);
            setCommentData(response.data.comments);
            console.log(response.data.comments);
        }
        catch (err) {
            console.log(err);
        }
    }




    return (
        <div className="cnct" style={{ padding: '0 4vw' }}>

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
                                        <p style={{ color: '#555', fontSize: '14px' }}>
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
                                    {
                                        post.hasliked ? (
                                            <div style={{ fontFamily: 'Jost_l', color: '#D91656', display: 'flex', alignItems: 'center' }} >
                                                <i onClick={() => {
                                                    handleLike(post._id); setLikes(post.likes.length); setHasliked(post.likes.includes(userId));
                                                }}
                                                    className="ri-heart-3-fill" /> {post.likes} UnLike
                                            </div>
                                        ) :
                                            (
                                                <div style={{ fontFamily: 'Jost_l', color: '#D91656', display: 'flex', alignItems: 'center' }} >
                                                    <i onClick={() => {
                                                        handleLike(post._id); setLikes(post.likes.length); setHasliked(post.likes.includes(userId));
                                                    }}
                                                        className="ri-heart-3-line" /> {post.likes} Like
                                                </div>
                                            )
                                    }
                                    <p
                                        onClick={() => {
                                            setPosts((prev) =>
                                                prev.map((p) =>
                                                    p._id === post._id
                                                        ? { ...p, showComments: !p.showComments }
                                                        : p
                                                )
                                            );
                                            getComment(post._id);
                                        }
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

                                        {Array.isArray(commentData) && commentData.map((comment) => (
                                            <div key={comment._id}>
                                                <p style={{ marginTop: '4px', fontFamily: 'Jost_l', color: '#555', textAlign: 'center' }}> . . .</p>
                                                <p style={{ marginTop: '4px', fontFamily: 'Jost_l', color: '#D91656', padding: '0 12px', display: 'flex', gap: '12px' }} ><i className="ri-arrow-right-fill"></i> {comment.comment}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))
                    )}

                    <div style={{ height: '100vh', width: '100%', position: 'fixed', backgroundColor: 'rgba(217, 22, 87, 0.5)', top: '  0vh', left: '0' }}>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCnct