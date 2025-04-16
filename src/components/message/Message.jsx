import React from 'react'
import './message.css'

function Message({own}) {
  return (
    <div className= {own ? "messageContainer own" : "messageContainer"}>
        <div className="messageTop">
            <img className="messageImg"  src="http://192.168.101.173:8000/uploads/887e8850-2673-4cc1-9981-2080cfe5aec51742302510396.jpg" alt="" />
            <p className='messageText'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro, provident natus </p>
        </div>
        <div className="messageBottom">1 hour ago</div>
    </div>
  )
}

export default Message