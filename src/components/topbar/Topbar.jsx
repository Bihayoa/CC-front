import React from 'react'
import "./Topbar.css"
import logo from "../assets/logo32x32.png"
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import adminAvatar from "../assets/adminAvatar.jpg";
import noImg from "../assets/noProfileImg.png"
import { useNavigate } from 'react-router-dom';
import { backendUploadDirectoryURL } from '../../config/filesPath.config';


export const Topbar = () => {
    // const haveAUserAvatar = localStorage.getItem('avatar_url');
    // const avatar = haveAUserAvatar === null ?  'c:/Users/Forward/Desktop/final/src/components/assets/noProfileImg.png' : haveAUserAvatar
    const avatar_url = localStorage.getItem('avatar_url');
    const token = localStorage.getItem('token');

    const avatar = avatar_url !== 'undefined' && avatar_url !== 'null' && avatar_url ? `${backendUploadDirectoryURL}/${avatar_url}` : noImg;
    

    const navigate = useNavigate();

    const navigateToHomepage = () => {
        navigate('/');
        window.location.reload();
    }

    const navigateToProfile = () => {
        if(token !== 'undefined' && token !== 'undefined' && token){
            navigate('/me');
        }else{
            window.alert('Необходимо авторизоваться')
        }
    }

    const navigateToAuth = () => {
        navigate('/auth');
    }

    const navigateToProfileSettings = () => {
    if(token !== 'undefined' && token !== 'undefined' && token){
        navigate('/me/profile-settings');
    }else{
                window.alert('Необходимо авторизоваться')
        }
    }

    return(
        <div className='topbarContainer'>
                <div className="topbarLeft"></div>
                    <img src={logo} alt="" />
                    <span className='logo' onClick={navigateToHomepage}>CatsCool</span>
                <div className="topbarCenter">
                    <div className="searchbar">
                        <SearchIcon  className='searchIcon'/>
                        <input placeholder='Поиск постов, друзей, видео' className='searchInput' />
                    </div>
                </div>
                <div className="topbarRight">
                    <div className="topbarLinks">
                        <span className="topbarLink" onClick={navigateToHomepage}>Главная страница</span>
                        <span className="topbarLink" onClick={navigateToProfile}>Моя страница</span>
                    </div>
                    <div className="topbarIcons">
                        {/* <div className="topbarIconItem">
                            <PersonIcon />
                            <span className="topbarIconBadge">1</span>
                        </div>
                        <div className="topbarIconItem">
                            <ChatIcon />
                            <span className="topbarIconBadge">1</span>
                        </div>
                        <div className="topbarIconItem">
                            <NotificationsIcon />
                            <span className="topbarIconBadge">1</span>
                        </div> */}
                    </div>
                    {(token !== 'undefined' && token !== 'null' && token) ? (
                        <img src={avatar} alt={"profile img"} className="topbarImg" onClick={ navigateToProfileSettings } />
                    ) : <div className='registerBtn' onClick={navigateToAuth}> Зарегистрироваться </div>
                }
                </div>
        </div>
    );
}

export default Topbar;