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


const PORTION_OF_ITEMS = 4;

function FeedPosts() {

  const [curPhoto2, setCurPhoto2] = useState(0);
  const [curPhoto3, setCurPhoto3] = useState(0);
  const [curPhoto4, setCurPhoto4] = useState(0);
  const [curPhoto5, setCurPhoto5] = useState(0);


  const [offset, setOffset] = useState(0);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [flag, setFlag] = useState(true); // whether there are more posts to load
  const [isScrollEnabled, setIsScrollEnabled] = useState(true); // check for scroll event

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${ip}/api/posts/?limit=${PORTION_OF_ITEMS}&offset=${offset}`
      );

      if (!res.ok) {
        throw new Error(`Ошибка HTTP: ${res.status}`);
      }

      const data = await res.json();

      if (Array.isArray(data)) {
        setPosts((prev) => [...prev, ...data]);

        if (data.length < PORTION_OF_ITEMS) {
          setFlag(false);
          setIsScrollEnabled(false); // Disable scrolling
        }
      } else {
        console.warn("Ответ API не является массивом", data);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Ошибка при загрузке постов:", error);
      setIsError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [offset]);

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

  const PostImages = posts.map((post) => post.image_urls ? post.image_urls.map((photo) => `${backendUploadDirectoryURL}/${photo}`) : () => {});
  const photosAmount = PostImages.map((photos) => photos.length);
  const changePhoto2 = (direction, index) => {
    if (direction === 'next') {
        setCurPhoto2((prev) => (prev + 1) % photosAmount[index]);
    } else {
        setCurPhoto2((prev) => (prev - 1 + photosAmount[index]) % photosAmount[index]);
    }
  };
  const changePhoto3 = (direction, index) => {
    if (direction === 'next') {
        setCurPhoto3((prev) => (prev + 1) % photosAmount[index]);
    } else {
        setCurPhoto3((prev) => (prev - 1 + photosAmount[index]) % photosAmount[index]);
    }
  };
  const changePhoto4 = (direction, index) => {
    if (direction === 'next') {
        setCurPhoto4((prev) => (prev + 1) % photosAmount[index]);
    } else {
        setCurPhoto4((prev) => (prev - 1 + photosAmount[index]) % photosAmount[index]);
    }
  };
  const changePhoto5 = (direction, index) => {
    if (direction === 'next') {
        setCurPhoto5((prev) => (prev + 1) % photosAmount[index]);
    } else {
        setCurPhoto5((prev) => (prev - 1 + photosAmount[index]) % photosAmount[index]);
    }
  };

  return (
    <div className="feed">
      <Share />
      {posts.map((post, index) => (
        
        <div key={index}>
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
                  
                {photosAmount[index] === 2 && (
                            <>
                                <a className='prev2' onClick={() => changePhoto2('prev', index)}>&larr;</a>
                                <a className='next2' onClick={() => changePhoto2('next', index)}>&rarr;</a>
                            </>
                        )}

                {photosAmount[index] === 3 && (
                                            <>
                                                <a className='prev3' onClick={() => changePhoto3('prev', index)}>&larr;</a>
                                                <a className='next3' onClick={() => changePhoto3('next', index)}>&rarr;</a>
                                            </>
                                        )}

                {photosAmount[index] === 4 && (
                                                            <>
                                                                <a className='prev4' onClick={() => changePhoto4('prev', index)}>&larr;</a>
                                                                <a className='next4' onClick={() => changePhoto4('next', index)}>&rarr;</a>
                                                            </>
                                                        )}

                {photosAmount[index] === 5 && (
                                                            <>
                                                                <a className='prev5' onClick={() => changePhoto5('prev', index)}>&larr;</a>
                                                                <a className='next5' onClick={() => changePhoto5('next', index)}>&rarr;</a>
                                                            </>
                                                        )}



                  <div className='slide'>
                    {photosAmount[index] === 2 &&(
                      <img src={PostImages[index][curPhoto2]} className='postImg'></img>
                    )}
                    {photosAmount[index] === 1 && (
                        <img src={PostImages[index]} className='postImg'></img>
                    )}
                    {photosAmount[index] === 3 &&(
                      <img src={PostImages[index][curPhoto3]} className='postImg'></img>
                    )}
                     {photosAmount[index] === 4 &&(
                      <img src={PostImages[index][curPhoto4]} className='postImg'></img>
                    )}
                     {photosAmount[index] == 5 &&(
                      <img src={PostImages[index][curPhoto5]} className='postImg'></img>
                    )}
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
    
        </div>
      ))}
      {isLoading && <div>Loading...</div>}
    </div>
  );
}

export default FeedPosts;