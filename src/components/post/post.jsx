import React from 'react'
import "./post.css"
import logo from '../assets/adminAvatar.jpg'
import postPhoto from '../assets/Gigachad.webp'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatIcon from '@mui/icons-material/Chat';



export default function Post() {
  let login = "Bihayo"



  return (
    <div className='post'>
        <div className='postWrapper'>
            <div className="postTop">
              <div className="postTopLeft">
                <img src={logo} alt='' className='postProfileImg'/>
                <span className='postUsername'>{login}</span>
                <span className='postDate'>5 минут назад</span>
              </div>
              <div className="postTopRight">
                <MoreVertIcon className='options'/>
              </div>
            </div>
            <div className="postCenter">
                <span className="postTitle">Aisuak champion</span>
                <img src={postPhoto} className='postImg'></img>
            </div>
                <span className="postText">Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro laudantium voluptatum quo omnis corrupti qui nostrum vero aliquid veniam quibusdam rerum culpa inventore temporibus possimus magni distinctio beatae, commodi dignissimos.</span>     
            <div className="postBottom">
              <div className="postBottomLeft">
                <ThumbUpOffAltIcon className='likeButton' />
                <span className="postLikeCounter">32 людям понравилось</span>
              {/* <div className="postBottomRight">
                <ChatIcon className='chatImg'/>
                <span className="postCommentText">6 комментариев</span>
              </div> */}
              </div>
            </div>
        </div>
        <a>&rarr;</a>
    </div>
  )
}
