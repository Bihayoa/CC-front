import React, {isValidElement, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import { postsURL, usersURL } from '../../config/dbCon.config';
import noProfileImg from '../assets/noProfileImg.png';
import "./post.css"

import { backendUploadDirectoryURL } from '../../config/filesPath.config';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { postByID, putLike } from '../../api/postAPI';

const PostByID = () => {

    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [curPhoto, setCurPhoto] = useState(0);
    const [like, setLike] = useState(0);

    const token = localStorage.getItem("token");


    const likePost = async () => {
            if (token !== null && token !== 'undefined'){
          try {
            const like = putLike(id, token);
            setLike(like);
        }catch(err){
          console.error(err);
        }
      } else{
        //Логика что если пользователь не авторизован
      }
    }
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await postByID(id);
                setPost(data);
                setLike(Number(data.user_liked));
                console.log(data)
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Прости, но это явно Ошибка {error}</p>;

    const postImages = post.image_urls.map((photo) => `${backendUploadDirectoryURL}/${photo}`);
    const photosAmount = postImages.length;

    const changePhoto = (direction) => {
      if (direction === 'next') {
          setCurPhoto(curPhoto < photosAmount - 1 ? curPhoto + 1 : 0);
      } else {
          setCurPhoto(curPhoto > 0 ? curPhoto - 1 : photosAmount - 1);
      }
    };
    

    return(
        <div className='postID'>
        <div className='postWrapper'>
          
            <div className="postTop">
              <div className="postTopLeft">
                <img src={post.avatar_url ? post.avatar_url : noProfileImg} alt='' className='postProfileImg'/>
                <span className='postUsername'>{post.login}</span>
                <span className='postDate'>{post.createdTime}</span>
              </div>
              <div className="postTopRight">
                <MoreVertIcon className='options'/>
              </div>
            </div>
            <div className="postCenter">
                <span className="postTitle">{post.title}</span>
                <div className='photos'>
                  
                {photosAmount > 1 && (
                            <>
                                <a className='prev' onClick={() => changePhoto('prev')}>&larr;</a>
                                <a className='next' onClick={() => changePhoto('next')}>&rarr;</a>
                            </>
                        )}
                  <div className='slide'>
                    <img src={postImages[curPhoto]} className='postImg'></img>
                  </div>
                </div>

            </div>
                <span className="postText">{post.text}</span>     
            <div className="postBottom">
              <div className="postBottomLeft">
                <ThumbUpOffAltIcon className='likeButton' onClick={likePost} />
                <span className="postLikeCounter" >{like} людям понравилось</span>
              {/* <div className="postBottomRight">
                <ChatIcon className='chatImg'/>
                <span className="postCommentText">6 комментариев</span>
              </div> */}
              <RemoveRedEyeIcon />
              <p>{post.views}</p>
              </div>
            </div>
        </div>
    </div>
    
    )
}



export default PostByID;