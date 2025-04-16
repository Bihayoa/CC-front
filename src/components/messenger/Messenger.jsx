import React from 'react'
import Topbar from '../topbar/Topbar'
import './messenger.css'
import Conversation from '../conversations/Conversation'
import Message from '../message/Message'
import ChatOnline from '../chatOnline/ChatOnline'

function Messenger() {
  return (
    <>
        <Topbar />
        <div className='messengerContainer'>
            <div className="chatMenu">
              <div className='chatMenuWrapper'>
                <input placeholder="Поиск друзей" className='chatMenuInput' />
                <Conversation />
                <Conversation />
                <Conversation />
                <Conversation />
              </div>
            </div>
            <div className="chatBox">
              <div className="chatBoxWrapper">
                <div className="chatBoxTop">
                  <Message />
                  <Message own={true}/>
                  <Message />
                  <Message />
                  <Message />
                  <Message />
                  <Message />
                  <Message />
                  <Message />
                  <Message />
                  <Message />
                  <Message />
                  <Message />
                  <Message />
                  <Message />
                </div>
                <div className="chatBoxBottom">
                  <textarea name="" id="" className="chatMessageInput" placeholder='Напиши что-нибудь'></textarea>
                  <button className='chatSubmitButton'>Отправить</button>
                </div>
              </div>
            </div>
            <div className="chatOnline">
              <div className="chatOnlineWrapper">
                <ChatOnline />
              </div>
            </div>
        </div>
    </>
  )
}

export default Messenger