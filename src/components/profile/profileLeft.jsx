import React, {useState} from 'react'
import "./profile.css"
import noProfileImg from "../assets/noProfileImg.png"
import { backendUploadDirectoryURL } from '../../config/filesPath.config'
import ImageZoom from '../imageZoom/imageZoom';


export default function ProfileLeft(props) {

  const [isImageZoom, setIsImageZoom] = useState(false);
  const avatar = props.avatar !== 'null' && props.avatar !== 'undefined' && props.avatar !== null && props.avatar !== undefined ? `${backendUploadDirectoryURL}/${props.avatar}` : noProfileImg

  const zoomImage = () => {
    isImageZoom ? setIsImageZoom(false) : setIsImageZoom(true);
  }

  return (
    <>
    {isImageZoom && (
            <>
              <div className="zoomContainer"> <ImageZoom image_src={avatar}  /> </div>
              <img className="bg" onClick={()=>{setIsImageZoom(false)}}/>
    
            </>
              )}
    <div className='profileLeft'>
            <div className="profileLeftContainer">
              <div className='profileAvatarAndUsername'>
                <div className="profilePicture">
                  <img src={avatar} alt=' avatar loading failed' className='avatar' onClick={() => {zoomImage()}}></img>
                </div>
              </div>
              <div className="logAndDesc">
                <div className="profileUsername">{props.profileData.login}</div>
                <div className="profileDesc">{props.profileData.description ? props.profileData.description : "У пользователя нет описания аккаунта"}</div>
              </div>
            </div>
    </div>
    </>
  )
}
