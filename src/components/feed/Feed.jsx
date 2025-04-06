import "./Feed.css"

import React from 'react'
import Share from '../share/Share.jsx'
// import Post from "../post/post.jsx"

export default function Feed() {
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {/* <Post  /> */}
        {/* <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post /> */}
      </div>
    </div>
  )
}
