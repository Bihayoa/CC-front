import React from 'react'
import './post.css'
import Topbar from '../topbar/Topbar.jsx'
import Sidebar from '../sidebar/Sidebar.jsx'
import Rightbar from '../rightbar/Rightbar.jsx'
import PostByID from './getPostById'
// import Fon from '../background/bgFon.jsx'

export const PostID = () => {
    return (
    <>
        <title>CC | Home</title>
        
        <Topbar />

        <div className="homeContainer">
            {/* <Fon /> */}
            <Sidebar />
            <PostByID />
            <Rightbar />
        </div>
    </>
    )

}

export default PostID;
