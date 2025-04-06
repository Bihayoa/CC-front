import React from 'react'
import "./profile.css"
import noProfileImg from "../assets/noProfileImg.png"

export default function ProfileLeft(props) {
  return (
    <div className='profileLeft'>
            <div className="profileLeftContainer">
              <div className='profileAvatarAndUsername'>
                <div className="profilePicture">
                  <img src={(props.avatar !== 'null' && props.avatar !== 'undefined' && props.avatar !== null && props.avatar !== undefined ? props.avatar : noProfileImg)} alt=' avatar loading failed' className='avatar'></img>
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
