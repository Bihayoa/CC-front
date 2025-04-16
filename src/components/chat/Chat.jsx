import io from 'socket.io-client'
import React, { useState } from 'react'
import './chat.css'
import Ch from './ch';
import { webSocketPort } from '../../config/backendCon.config';
import Topbar from '../topbar/Topbar'

const socket = io.connect(`http://localhost:${webSocketPort}`);

export default function Chat() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  // const [showChat, setShowChat] = useState(false);
  const [curRoom, setCurRoom] = useState();

  // const joinRoom = () => {
  //   if(username!=="" && room !==""){
  //       socket.emit("join_room", room)
  //       setShowChat(true);
  //   }
  // }


  return (
    <>
      <Topbar />
        <div className="chat">
          {curRoom && (<Ch socket={socket} username={username} room={room} />)
}
        </div>
    </>
  )
}
