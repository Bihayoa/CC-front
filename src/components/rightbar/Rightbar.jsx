import "./Rightbar.css"

import React from 'react'
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import friendOnlineIcon from "../assets/Gigachad.webp"

export default function Rightbar() {
  return (
    <div className="rightbar">
        <div className="rightbarWrapper">
            <h4 className="rightbarTitle">Друзья онлайн:</h4>
            <ul className="rightbarFriendList">
              <li className="rightbarFriend">
                <div className="rightbarProfileImgContainer">
                  <img className="rightbarProfileImg" src={friendOnlineIcon} alt="" />
                  <span className="rightbarOnline" ></span>
                </div>
                <span className="rightbarUsername">Sigma Boy</span>
              </li>
            </ul>
        </div>
    </div>
  )
}
