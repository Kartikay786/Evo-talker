import React,{useState,useEffect} from 'react'
import Userprofile from './Profile/Userprofile';
import PostCreate from './Profile/CreatePost';
import MyPost from './Profile/MyPost'

const Profile = () => {
   
    return (
        <>
        <Userprofile/>

        <hr style={{margin:'10vh 0'}}/>

         <PostCreate/>

         
        <hr style={{margin:'10vh 0'}}/>

        {/* <MyPost/> */}
     
     <MyPost/>

        </>
    )
}

export default Profile




