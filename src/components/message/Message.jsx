import React from 'react'
import './message.css'

function Message({own}) {
  return (
    <div className= {own ? "messageContainer own" : "messageContainer"}>
        <div className="messageTop">
            <img className="messageImg"  src="" alt="" />
            <p className='messageText'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro, provident natus </p>
        </div>
        <div className="messageBottom">1 hour ago</div>
    </div>
  )
}

export default Message