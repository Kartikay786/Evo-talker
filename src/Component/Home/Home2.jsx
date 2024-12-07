import React from 'react'
import video from '../../assets/bgvideo.mp4'

const Home2 = () => {
    return (
        <>
            <div className='h-screen w-full relative '>
                <video style={{width:'100%'}} className='h-auto w-full' controls>
                    <source src={video} type="video/mp4" />
                   
                </video>
            </div>
        </>
    )
}

export default Home2