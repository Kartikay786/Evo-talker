import React, { useState, useEffect } from 'react'
import Userprofile from './Profile/Userprofile';
import PostCreate from './Profile/CreatePost';
import MyPost from './Profile/MyPost'
import './Profile/Profile.css'

const Profile = () => {

    return (
        <>
            <div style={{padding:'0 2vh'}}>

                {/* <Userprofile />

                <hr style={{ margin: '10vh 0' }} />

                <PostCreate />


                <hr style={{ margin: '10vh 0' }} />

                {/* <MyPost/> */}

                {/* <MyPost /> */} 

                <div className="profile_cnct_left" style={{backgroundColor:'',display:'flex',gap:'6vh',justifyContent:'center',paddingTop:'20vh'}}>
                    <Userprofile/>
                    <PostCreate/>
                </div>

                <hr style={{ margin: '10vh 0 2vh' ,height:'5px'}} />
                <div className='post_cnct_right' style={{width:'100%',}}>
                    <MyPost/>
                </div>
            </div>

        </>
    )
}

export default Profile




