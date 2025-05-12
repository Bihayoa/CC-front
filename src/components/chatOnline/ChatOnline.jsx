import './chatOnline.css';

import React from 'react'

function ChatOnline() {
  return (
    <div className='chatOnline'>
        <div className='chatOnlineFriend'>
            <div className="chatOnlineImgContainer">
                <img src="" alt="" className='chatOnlineImg' />
                <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">DANIL</span>
        </div>
    </div>
  )
}

export default ChatOnline