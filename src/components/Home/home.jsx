import React, { useState } from 'react'
import './home.css'
import Topbar from '../topbar/Topbar.jsx'
import Sidebar from '../sidebar/Sidebar.jsx'
import Feed from '../feed/Feed.jsx'
import Rightbar from '../rightbar/Rightbar.jsx'
import Fon from '../background/bgFon.jsx'
import FeedPosts from '../post/feedPosts.jsx'

export const HomePage = () => {
    return (
    <>
        <title>CC | Home</title>
        
        <Topbar />
        {/* <Fon /> */}
        <div className="homeContainer">
            
            <Sidebar />
            <FeedPosts />
            <Rightbar />
        </div>
    </>
    )

}

export default HomePage;