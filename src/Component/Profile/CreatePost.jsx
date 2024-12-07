import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import './Profile.css'
import AOS from 'aos';
import 'aos/dist/aos.css'

const PostCreate = () => {


    useEffect(() => {
        AOS.init({ duration: 1000 });
        AOS.refresh();
    }, []);

    const fileInputRef = useRef();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        content: '',
        image: null
    });

    const handlefileSelect = (e) => {
        fileInputRef.current.click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
        }
    }

    const token = localStorage.getItem('userToken');
    console.log(token);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCreatePost = async (e) => {
        e.preventDefault(e);
        setLoading(true);


        try {
            const newPostFormData = new FormData();
            newPostFormData.append('content', formData.content);
            newPostFormData.append('image', formData.image);

            const result = await axios.post(`http://localhost:3000/api/post/create`, newPostFormData
                , {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    },
                });

            console.log('Post response:', result);
            alert('Post created successfully');
        } catch (err) {
            console.log('Post error:', err);
            alert('Network Issue');

        }
        finally {
            setLoading(false)
        }

        setFormData({
            content: '',
            postimage: null,
        });
    };

    return (
        <>
            <div className="postcreate" style={{}} data-aos="zoom-in">
                <h1 style={{ fontSize: '2rem', margin: '0px 0 20px ', textAlign: 'start', padding: '0 0 10px ', color: '#010822', borderBottom: '1px solid #010822' }}>Create Post</h1>
                <form action="" onSubmit={handleCreatePost} style={{ padding: '0 ' }}>

                    <input
                        type="text"
                        style={{ width: '100%', borderRadius: '8px', marginTop: '2vh', fontFamily: 'Jost_l', fontSize: '1.3rem', padding: '8px 12px', border: '1px solid #010822 ', color: '#333 ', background: 'transparent' }}
                        placeholder="Write Content of your Post..."
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="file"
                        ref={fileInputRef} // Reference to the input
                        style={{ display: 'none' }} // Hide the input
                        onChange={handleFileChange} // Handle file selection
                    />
                    <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'end', marginTop: '24px', gap: '16px' }}>
                        <i onClick={handlefileSelect} className="ri-image-add-line" style={{ fontSize: '2rem', color: '#666' }}></i>
                        <button type="submit" disabled={loading} style={{ padding: '10px 12px', width: '120px', backgroundColor: '#D91656', color: '#fff', borderRadius: '8px' }}>
                            {loading ? 'Creating' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>

        </>
    );
}

export default PostCreate