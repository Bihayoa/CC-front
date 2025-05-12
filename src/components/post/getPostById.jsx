import React, {isValidElement, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import { postsURL, usersURL } from '../../config/postsURL.config';
import noProfileImg from '../assets/noProfileImg.png';
import "./post.css"

import { backendUploadDirectoryURL } from '../../config/filesPath.config';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { postByID, putLike } from '../../api/postAPI';
import ImageZoom from '../imageZoom/imageZoom';

const PostByID = () => {

    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [curPhoto, setCurPhoto] = useState(0);
    const [like, setLike] = useState(0);
    const [zoomPhoto, setZoomPhoto] = useState('');
    const [isImgZoom, setIsImgZoom] = useState(false);



    const token = localStorage.getItem("token");


    const likePost = async () => {
            if (token !== 'null' && token !== 'undefined'){
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
      if(isImgZoom === false){
      if (direction === 'next') {
          setCurPhoto(curPhoto < photosAmount - 1 ? curPhoto + 1 : 0);
      } else {
          setCurPhoto(curPhoto > 0 ? curPhoto - 1 : photosAmount - 1);
      }}else{
        if (direction === 'next') {
          setCurPhoto(curPhoto < photosAmount - 1 ? curPhoto + 1 : 0);
      } else {
          setCurPhoto(curPhoto > 0 ? curPhoto - 1 : photosAmount - 1);
      }
      }

      //костыль, не с первого раза перелистывать начинеает, хз почему
      let n;
      if(postImages[curPhoto] === zoomPhoto){
        n = direction === 'next' ? ((curPhoto < photosAmount - 1 ? curPhoto + 1 : 0)) : ((curPhoto > 0 ? curPhoto - 1 : photosAmount - 1))}
      setZoomPhoto(postImages[n])
    };

    const zoomImage = () =>{
      console.log(photosAmount)
      if(isImgZoom === false){
        setIsImgZoom(true);
      } else{
        setIsImgZoom(false);
        // setZoomPhoto(null);
      }
      setZoomPhoto(postImages[curPhoto])
  }

    const calculateTime = (createdTime) => {
    const currentTime = Date.now();
    let timeAfterCreate = (currentTime - createdTime) / 1000; // время в секундах

    if (timeAfterCreate < 60) {
        return "Создано меньше минуты назад";
    } else if (timeAfterCreate < 3600) { // 60 * 60
        const minutes = Math.round(timeAfterCreate / 60);
        return `Создано ${minutes} минут${minutes === 1 ? 'у' : ''} назад`;
    } else if (timeAfterCreate < 86400) { // 60 * 60 * 24
        const hours = Math.round(timeAfterCreate / 3600);
        return `Создано ${hours} часов назад`;
    } else if (timeAfterCreate < 31536000) { // 60 * 60 * 24 * 365
        const days = Math.round(timeAfterCreate / 86400);
        return `Создано ${days} дней назад`;
    } else {
        const years = Math.round(timeAfterCreate / 31536000);
        return `Создано ${years} лет назад`;
    }
}

    return(
        <div className='postID'>
          {isImgZoom && (
                  <>
                    <ImageZoom image_src={zoomPhoto}  />
                    <img className="bg" onClick={()=>{setIsImgZoom(false)}}/>
          
                  </>
                    )}
        <div className='postWrapper'>
          
            <div className="postTop">
              <div className="postTopLeft">
                <img src={post.avatar_url ? `${backendUploadDirectoryURL}/${post.avatar_url}` : noProfileImg} alt='' className='postProfileImg'/>
                <span className='postUsername'>{post.login}</span>
                <span className='postDate'>{calculateTime(Date.parse(post.createdTime))}</span>
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
                  {photosAmount === 0 && (
                    
                    <div className="space"></div>
                   )}
                  {(photosAmount > 1 && isImgZoom === false) && (
                      <>
                          <a className='prev' onClick={() => changePhoto('prev')}>&larr;</a>
                          <a className='next' onClick={() => changePhoto('next')}>&rarr;</a>
                      </>
                  )}
              {(photosAmount > 1 && isImgZoom === true) && (
                      <>
                          <a className='prevZoomed' onClick={() => changePhoto('prev')}>&larr;</a>
                          <a className='nextZoomed' onClick={() => changePhoto('next')}>&rarr;</a>
                      </>
                  )}
                  <div className='slide'>
                  <img src={postImages[curPhoto]} className='postImg' onClick={() => {zoomImage()}}></img>
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