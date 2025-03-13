import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import { postsURL, usersURL } from '../../config/dbCon.config';
import noProfileImg from '../assets/noProfileImg.png';
import "./post.css"

import { backendUploadDirectoryURL } from '../../config/filesPath.config';

import Arrows from "../assets/right-arrow.png"
import Dot from "../assets/record.png"

import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const PostByID = () => {

    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [curPhoto, setCurPhoto] = useState(0);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`${postsURL}/${id}`);
                if (!response.ok){
                  throw new Error('НУ ГДЕ_ТО ОШИБКА ПРИ ПОЛУЧЕНИИ ПОСТА ПО АЙДИ, ВОЗМОЖНО ТАКОГО ПОСТА ВООБЩЕ НЕ СУЩЕСТВУЕТ ИЛИ ОН БЫЛ УДАЛЕН');
                }

                const data = await response.json();
                setPost(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошшибка {error}</p>;

    // let photosLength = post.images_u;

    // const PostImages = `${backendUploadDirectoryURL}/${post.image_urls[0]}`
    // console.log(post.image_urls.length);

    const postImages = post.image_urls.map((photo) => `${backendUploadDirectoryURL}/${photo}`);
    const photosAmount = postImages.length;

    const changePhoto = (direction) => {
      if (direction === 'next') {
          setCurPhoto((prev) => (prev + 1) % photosAmount);
      } else {
          setCurPhoto((prev) => (prev - 1 + photosAmount) % photosAmount);
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
                <ThumbUpOffAltIcon className='likeButton' />
                <span className="postLikeCounter">{post.likes} людям понравилось</span>
              {/* <div className="postBottomRight">
                <ChatIcon className='chatImg'/>
                <span className="postCommentText">6 комментариев</span>
              </div> */}
              <RemoveRedEyeIcon />
              <p>{Math.round(post.views/2)}</p>
              </div>
            </div>
        </div>
    </div>
    
    )
}



export default PostByID;