import React, { useState } from 'react'
import './LoginSignup.css'

import lock_icon from '../assets/lock_line.png'
import mail_icon from '../assets/mail_line.png'
import user_icon from '../assets/user_3_line.png'
import login_icon from '../assets/flower_3_line.png'

import {registerURL, loginURL} from "../../config/dbCon.config.js"
import Fon from '../background/bgFon.jsx'
import {useNavigate} from "react-router-dom"

let URL;

export const LoginSignup = () => {

  const navigate = useNavigate();
  
  //LOGIN/REGISTER CHANGING
  const [action, setAction] = useState("Login");

  //NAME FIELD GET
  const [inputName, setInputName] = useState('');
  const handleChangeName = (event) => {
    setInputName(event.target.value);
  };

  //USERNAME FIELD GET
  const [inputUsername, setInputUsername] = useState('');
  const handleChangeUsername = (event) => {
    setInputUsername(event.target.value);
  };

  //EMAIL FIELD GET
  const [inputEmail, setInputEmail] = useState('');
  const handleChangeEmail = (event) => {
    setInputEmail(event.target.value);
  };

  //PASSWORD FIELD GET
  const [inputPassword, setInputPassword] = useState('');
  const handleChangePassword = (event) => {
    setInputPassword(event.target.value);
  };

    async function auth(){
      //Регистрация
      if (action === "Sign Up"){
        let user = {
          name: inputName,
          login: inputUsername,
          email: inputEmail,
          password: inputPassword,
        }
      //Определение куда отправлять запросы
      URL = registerURL;
      //Отправление
      try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

      const userData = await response.json();
      // console.log(userData)
      //Сохранение токена и аватарЮрл
      localStorage.setItem('token', userData.token)
      localStorage.setItem('avatar_url', userData.avatar_url)
      //Направление на главную страницу
      navigate('/')
      return userData;
    }catch(err){
      console.log("error: ", err)
    }
  }
    //Вход
    if(action==="Login"){
      let user = {
        email: inputEmail,
        password: inputPassword,
      }
      //Определение куда отправлять запросы
      URL = loginURL;
      //Отправление
      try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        }
      );
      
      const userData = await response.json();
      //Сохранение токена с аватар юрл
      localStorage.setItem('token', userData.token);
      localStorage.setItem('avatar_url', userData.avatar_url)
      //Направление
      navigate('/')
      // console.log(userData)
      return userData;
    }catch(err){
      console.log("error: ", err)
    }
  }    
}

  return (
      <div className='container'>
      <title>CC | Sign</title>
      <Fon />
      <div className='header'>
        <div className='text'>{action}</div>
        <div className='underline'></div>
      </div>

      <div className='inputs'>
        {action==="Login"? <div /> : <div className='input'>
          <img src={user_icon} alt="" />
          <input type='text' placeholder='Name' onChange={handleChangeName}/>
        </div>}
        {action === "Login"?<div />:<div className='input'>
          <img src={login_icon} alt="" />
          <input type='text' placeholder='Username' onChange={handleChangeUsername}/>
        </div>}
        
          <div className='input'>
          <img src={mail_icon} alt="" />
          <input type='email' placeholder='Email' onChange={handleChangeEmail}/>
        </div>
        <div className='input'>
          <img src={lock_icon} alt="" />
          <input type='password' placeholder='Password' onChange={handleChangePassword}/>
        </div>
        
      </div>
      {action==="Sign Up"? <div /> :<div className="forgot-password">Lost Password <span>Click Here!</span></div> }
      {action === "Sign Up" ? <div />: <div className="register" onClick={()=>{setAction("Sign Up")}}><span>Not registred yet?</span></div> }
      {action === "Login" ? <div />: <div className="login" onClick={()=>{setAction("Login")}}><span>Already have account?</span></div> }
      <div className='sendBtn'>
        <div className='submBtn' onClick={auth} >Submit</div>
      </div>
    </div>

    
  )
}

export default LoginSignup;