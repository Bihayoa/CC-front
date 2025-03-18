import { useState, useEffect } from "react";
import { ip } from "../../config/dbCon.config";
import { backendUploadDirectoryURL } from "../../config/filesPath.config";
import Share from "../share/Share";
import "../feed/Feed.css"
import "./post.css"
import noProfileImg from '../assets/noProfileImg.png';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { feedPosts, putLike } from "../../api/postAPI";


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
  // const token = localStorage.getItem("token");

  const fetchPosts = async () => {
    // Предотвратить повторные запросы, если уже идет загрузка
    if (isLoading) return;
  
    setIsLoading(true);
    try {
      const data = await feedPosts(ip, PORTION_OF_ITEMS, offset);
      if (Array.isArray(data)) {
        setPosts((prev) => [...prev, ...data]);

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
  const changePhoto = (direction, postId) => {
    if (direction === 'next') {
      setCurPage((prev) => ({...prev, [postId] : curPage[postId] < postImages[postId].length - 1 ? curPage[postId] + 1 : 0}))
    } else {
      setCurPage((prev) => ({...prev, [postId] : curPage[postId] > 0 ? curPage[postId] - 1 : postImages[postId].length - 1}))
    }
  };

  return (
    <div className="feed">
      <Share />
      {posts.map((post, index) => (
        <div key={post.post_id}>
          <div className='postWrapper'>
            <div className="postTop">
              <div className="postTopLeft">
                <img src={post.avatar_url || noProfileImg} alt='' className='postProfileImg' />
                <span className='postUsername'>{post.login}</span>
                <span className='postDate'>{post.createdTime}</span>
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
              {postImages[post.post_id].length > 1 && (
                      <>
                          <a className='prev' onClick={() => changePhoto('prev', post.post_id)}>&larr;</a>
                          <a className='next' onClick={() => changePhoto('next', post.post_id)}>&rarr;</a>
                      </>
                  )}
                  <div className='slide'>
                    {postImages[post.post_id].length > 1 &&(
                      <img src={postImages[post.post_id][curPage[post.post_id]]} className='postImg'></img>
                    )}
                    {postImages[post.post_id].length === 1 && (
                      <img src = {postImages[post.post_id]} className="postImg"></img>
                    )}
                    </div>
              </div>
              </>
              )}

              {postImages[post.post_id].length === 0 && (
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
                <p>{post.views}</p>
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