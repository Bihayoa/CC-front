import React from 'react'
import "./profile.css"
import noProfileImg from "../assets/noProfileImg.png"
import { backendUploadDirectoryURL } from '../../config/filesPath.config'

export default function ProfileLeft(props) {
  
  const avatar = props.avatar !== 'null' && props.avatar !== 'undefined' && props.avatar !== null && props.avatar !== undefined ? `${backendUploadDirectoryURL}/${props.avatar}` : noProfileImg


  return (
    <div className='profileLeft'>
            <div className="profileLeftContainer">
              <div className='profileAvatarAndUsername'>
                <div className="profilePicture">
                  <img src={avatar} alt=' avatar loading failed' className='avatar'></img>
                </div>
              </div>
              <div className="logAndDesc">
                <div className="profileUsername">{props.profileData.login}</div>
                <div className="profileDesc">{props.profileData.description ? props.profileData.description : "У пользователя нет описания аккаунта"}</div>
              </div>
            </div>
    </div>
  )
}
