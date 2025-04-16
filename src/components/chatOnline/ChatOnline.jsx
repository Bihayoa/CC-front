import './chatOnline.css';

import React from 'react'

function ChatOnline() {
  return (
    <div className='chatOnline'>
        <div className='chatOnlineFriend'>
            <div className="chatOnlineImgContainer">
                <img src="http://192.168.101.173:8000/uploads/887e8850-2673-4cc1-9981-2080cfe5aec51742302510396.jpg" alt="" className='chatOnlineImg' />
                <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">DANIL</span>
        </div>
    </div>
  )
}

export default ChatOnline