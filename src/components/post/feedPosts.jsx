import { useState, useEffect } from "react";
import { backendUploadDirectoryURL } from "../../config/filesPath.config";
import Share from "../share/Share";
import "../feed/Feed.css"
import "./post.css"
import noProfileImg from '../assets/noProfileImg.png';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { feedPosts, putLike } from "../../api/postAPI";
import ImageZoom from "../imageZoom/imageZoom";
import { useNavigate } from "react-router-dom";

const PORTION_OF_ITEMS = 4;
// const sortMethod = "created";


function FeedPosts() {

  const [offset, setOffset] = useState(0);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [flag, setFlag] = useState(true); // whether there are more posts to load
  const [isScrollEnabled, setIsScrollEnabled] = useState(true); // check for scroll event
  const [like, setLike] = useState({})
  const [curPage, setCurPage] = useState({});
  const [postImages, setPostImages] = useState({})
  const [isImgZoom, setIsImgZoom] = useState(false);
  const [zoomPhoto, setZoomPhoto] = useState('');
  const [zoomedPhotosCollection, setZoomedPhotosCollection] = useState('');
  const navigate = useNavigate();

  // const token = localStorage.getItem("token");

  const fetchPosts = async () => {


    // Предотвратить повторные запросы, если уже идет загрузка
    if (isLoading) return;
  
    setIsLoading(true);
    try {
      const data = await feedPosts(PORTION_OF_ITEMS, offset);
      if (Array.isArray(data)) {
        setPosts((prev) => [...prev, ...data]);
        console.log(data)
        data.forEach((post) => setLike((prev) => ({...prev, [post.post_id]:post.user_liked})))
        data.forEach((post) => post.image_urls ? setCurPage((prev) => ({...prev, [post.post_id]:0})) : () => {})
        data.forEach((post) => post.image_urls && post.image_urls !== "undefined" ? setPostImages((prev) => ({...prev, [post.post_id] : post.image_urls.map((photo) => `${backendUploadDirectoryURL}/${photo}`)})) : ()=>{})
        if (data.length < PORTION_OF_ITEMS) {
        setFlag(false);
        setIsScrollEnabled(false); // Отключить скроллинг
      }
      } else {
        console.warn("Ответ API не является массивом", data);
      }
    } catch (error) {
      console.error("Ошибка при загрузке постов:", error);
      setIsError(error);
    } finally {
      setIsLoading(false); // Завершить состояние загрузки в любом случае
    }
  };
  
  useEffect(() => {
    fetchPosts();
  }, [offset]);

  

  const handleLike = async (postId) => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const likeData = await putLike(postId, token);
            setLike(prev => ({...prev, [postId]: likeData }));
            console.log(like)
        } catch (err) {
            console.error(err);
        }
    } 
};

  const handleScroll = () => {
    if (!isScrollEnabled) {
      return; 
    }

    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.offsetHeight) {
      if (flag) {
        setOffset((prev) => prev + PORTION_OF_ITEMS);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrollEnabled]); // 

  if (isError) {
    return (
      <div>
        {isError.name}: {isError.message}
      </div>
    );
  }

  if (isLoading && posts.length === 0) {
    return <div>Pending...</div>;
  }

  // const PostImages = posts.map((post) => post.image_urls ? post.image_urls.map((photo) => `${backendUploadDirectoryURL}/${photo}`) : () => {});
  // const photosAmount = PostImages.map((photos) => photos.length);
  
  //
  const changePhoto = (direction, postId) => {
    if (isImgZoom === false) {
      if(direction === 'next'){
        setCurPage((prev) => ({...prev, [postId] : curPage[postId] < postImages[postId].length - 1 ? curPage[postId] + 1 : 0}))
    } else {
        setCurPage((prev) => ({...prev, [postId] : curPage[postId] > 0 ? curPage[postId] - 1 : postImages[postId].length - 1}))
    }
  }else {
    if(direction === 'next'){
      setCurPage((prev) => ({...prev, [zoomedPhotosCollection] : curPage[zoomedPhotosCollection] < postImages[zoomedPhotosCollection].length - 1 ? curPage[zoomedPhotosCollection] + 1 : 0}))
  } else {
      setCurPage((prev) => ({...prev, [zoomedPhotosCollection] : curPage[zoomedPhotosCollection] > 0 ? curPage[zoomedPhotosCollection] - 1 : postImages[zoomedPhotosCollection].length - 1}))
  }

  //Костыль
  let n;
  if(postImages[zoomedPhotosCollection][curPage[zoomedPhotosCollection]] === zoomPhoto){
    n = direction === 'next' ? (curPage[zoomedPhotosCollection] < postImages[zoomedPhotosCollection].length - 1 ? curPage[zoomedPhotosCollection] + 1 : 0) : (curPage[zoomedPhotosCollection] > 0 ? curPage[zoomedPhotosCollection] - 1 : postImages[zoomedPhotosCollection].length - 1)
  }
  
  //Устанавливаем увеличенную фотку с костылём
  setZoomPhoto(postImages[zoomedPhotosCollection][n])
}

  };

  //Увеличение картинок
  const zoomImage = (post) =>{
      setZoomedPhotosCollection(post.post_id);
      // console.log(curPage)
      if(isImgZoom === false){
        setIsImgZoom(true);
      } else{
        setIsImgZoom(false);
        console.log("this is work")
        // setZoomPhoto(null);
      }
      setZoomPhoto(postImages[post.post_id][curPage[post.post_id]])
  }

  const navigateToUserPage = (login) => {
    navigate(`/${login}`);
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

  
  let avatar;

  return (
    <div className="feed">
      <Share />
      {isImgZoom && (
        <>
          <div className="zoomContainer"> <ImageZoom image_src={zoomPhoto}  /> </div>
          <img className="bg" onClick={()=>{setIsImgZoom(false)}}/>

        </>
          )}

      {posts.map((post) => (
        <div key={post.post_id}>
          <div className="avatars">
            {avatar = post.avatar_url !== 'undefined' && post.avatar_url !== 'null' && post.avatar_url ? `${backendUploadDirectoryURL}/${post.avatar_url}` : noProfileImg}
          </div>
          <div className='postWrapper'>
            <div className="postTop">
              <div className="postTopLeft" onClick={() => {navigateToUserPage(post.login)}}>
                <img src={avatar} alt='' className='postProfileImg' />
                <span className='postUsername'>{post.login}</span>
                <span className='postDate'>{calculateTime(Date.parse(post.createdTime))}</span>
              </div>
              <div className="postTopRight">
                <MoreVertIcon className='options' />
              </div>
            </div>
            <div className="postCenter">
              <span className="postTitle">{post.title}</span>
                
              {postImages[post.post_id].length >= 1 && ( 
                <>
                <div className='photos'>
              {(postImages[post.post_id].length > 1 && isImgZoom === false) && (
                      <>
                          <a className='prev' onClick={() => changePhoto('prev', post.post_id)}>&larr;</a>
                          <a className='next' onClick={() => changePhoto('next', post.post_id)}>&rarr;</a>
                      </>
                  )}
              {(postImages[post.post_id].length > 1 && isImgZoom === true && postImages[zoomedPhotosCollection].length > 1) && (
                      <>
                          <a className='prevZoomed' onClick={() => changePhoto('prev', post.post_id)}>&larr;</a>
                          <a className='nextZoomed' onClick={() => changePhoto('next', post.post_id)}>&rarr;</a>
                      </>
                  )}
                  <div className='slide'>
                    {(postImages[post.post_id].length > 1 && isImgZoom !== true) &&(
                      <img src={postImages[post.post_id][curPage[post.post_id]]} className='postImg' onClick={() => zoomImage(post)}></img>
                    )}
                    {(postImages[post.post_id].length === 1 && isImgZoom !== true) && (
                      <img src = {postImages[post.post_id]} className="postImg" onClick={() => zoomImage(post)}></img>
                    )}
                    </div>
              </div>
              </>
              )}

              {(postImages[post.post_id].length === 0 && isImgZoom !== true) && (
                <>
                <div className="space">

                </div>
                </>
              )}
              <span className="postText">{post.text}</span>
            </div>
            <div className="postBottom">
              <div className="postBottomLeft">
                <ThumbUpOffAltIcon className='likeButton' onClick={() => handleLike(post.post_id)} />
                <span className="postLikeCounter">{(like[post.post_id] || 0)} людям понравилось</span>
                <RemoveRedEyeIcon />
                <p>{post.views}   </p>
                <span className="id">id: {post.post_id}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      {isLoading && <div>Loading...</div>}
    </div>
  );
}

export default FeedPosts;