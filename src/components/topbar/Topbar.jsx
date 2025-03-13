import React from 'react'
import "./Topbar.css"
import logo from "../assets/logo32x32.png"
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import adminAvatar from "../assets/adminAvatar.jpg";
import noImg from "../assets/noProfileImg.png"

export const Topbar = () => {
    // const haveAUserAvatar = localStorage.getItem('avatar_url');
    // const avatar = haveAUserAvatar === null ?  'c:/Users/Forward/Desktop/final/src/components/assets/noProfileImg.png' : haveAUserAvatar
    const avatar_url = localStorage.getItem('avatar_url');
    return(
        <div className='topbarContainer'>
                <div className="topbarLeft"></div>
                    <img src={logo} alt="" />
                    <span className='logo'>CatsCool</span>
                <div className="topbarCenter">
                    <div className="searchbar">
                        <SearchIcon  className='searchIcon'/>
                        <input placeholder='Поиск постов, друзей, видео' className='searchInput' />
                    </div>
                </div>
                <div className="topbarRight">
                    <div className="topbarLinks">
                        <span className="topbarLink">Главная страница</span>
                        <span className="topbarLink">Мои посты</span>
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
                    <img src={avatar_url ? avatar_url : noImg} alt="profile Img" className="topbarImg" />
                </div>
        </div>
    );
}

export default Topbar;