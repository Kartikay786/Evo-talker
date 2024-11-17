import React,{useState,useEffect} from "react";
import axios from 'axios';
import './Profile.css'
import AOS from 'aos';
import 'aos/dist/aos.css'

const PostCreate = () => {

    
  useEffect(()=>{
    AOS.init({duration:1000});
    AOS.refresh();
},[]);

    const [loading,setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        tags: '',
        author: '',
    });

    const token = localStorage.getItem('userToken');
    console.log(token);
    const userId = localStorage.getItem('userId');

    // Load author ID from localStorage after component mounts
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        
        if (userId) {
            setFormData(prevData => ({ ...prevData, author: userId }));
        }
    }, []);
    console.log(formData.author);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCreatePost = async (e) => {
        e.preventDefault(e);
        setLoading(true);

        try {
            const result = await axios.post(`${import.meta.env.VITE_API_URL}/api/post/${userId}`, {
                ...formData,
                author:userId
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log('Post response:', result);
            alert('Post created successfully');
        } catch (err) {
            console.log('Post error:', err);
            alert('Network Issue');
           
        }
        finally{
            setLoading(false)
        }

        setFormData({
            title: '',
            content: '',
            tags: '',
            author: '',
        });
    };

    return (
        <>
         <div className="postcreate" style={{}} data-aos="zoom-in">
                   <h1 style={{ fontSize: '2rem', margin: '10px 0 20px ',textAlign:'center',padding:'0 0 20px ', color: '#010822',borderBottom:'1px solid #010822' }}>Create Post</h1>
                    <form action="" onSubmit={handleCreatePost}>
                        <input
                            type="text"
                            style={{ width: '100%', borderRadius: '24px',textTransform:'capitilize', fontSize: '1.3rem', fontFamily: 'Jost_l', padding: '8px 12px', border: '2px solid #ffc019 ', color: '#ffc019 ', background: 'transparent' }}
                            placeholder="Title of your Post"
                            value={formData.title}
                            name="title"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            style={{ width: '100%', borderRadius: '24px', marginTop: '2vh', fontFamily: 'Jost_l', fontSize: '1.3rem', padding: '8px 12px', border: '2px solid #ffc019 ', color: '#ffc019 ', background: 'transparent' }}
                            placeholder="Write Content of your Post..."
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            style={{ width: '100%', borderRadius: '24px', marginTop: '2vh', fontFamily: 'Jost_l', fontSize: '1.3rem', padding: '8px 12px', border: '2px solid #ffc019 ', color: '#ffc019 ', background: 'transparent' }}
                            placeholder="# tag someone"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit" disabled={loading} style={{ padding: '4px 4px',width:'90px', display: 'flex', justifySelf: 'flex-end', justifyContent: 'center' }}>
                            {loading ? 'Creating':'Create'}
                        </button>
                    </form>
                </div>
         
        </>
    );
}

export default PostCreate