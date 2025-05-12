import React, { useState } from 'react'
import './LoginSignup.css'

import lock_icon from '../assets/lock_line.png'
import mail_icon from '../assets/mail_line.png'
import user_icon from '../assets/user_3_line.png'
import login_icon from '../assets/flower_3_line.png'

import {registerURL, loginURL} from "../../config/postsURL.config.js"
import Fon from '../background/bgFon.jsx'
import {useNavigate} from "react-router-dom"
import Topbar from '../topbar/Topbar.jsx'
import { login, register } from '../../api/userAPI.js'
import { useEffect } from 'react'
let URL;

export const LoginSignup = () => {

  const navigate = useNavigate();
  const [token, setToken] = useState();
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
        const userData = await register(URL, user);
      // console.log(userData)
      //Сохранение токена и аватарЮрл
      // localStorage.setItem('token', userData.token)
      // localStorage.setItem('avatar_url', userData.avatar_url)
      setAction("Login");
      //Направление на главную страницу
      setInputUsername('');
      setInputEmail('');
      setInputPassword('');
      setInputName('');


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
        const userData = login(URL, user);
        //Сохранение токена с аватар юрл
        userData.then((resolve) => {
          localStorage.setItem('token', resolve.token);
          localStorage.setItem('avatar_url', resolve.avatar_url)
          setToken(resolve.token);
        })

        //Направление
        if ( token !== 'null' && token !== 'undefined' && token){
          navigate('/')
        }else{
          window.alert("Неверный пароль или логин")
        }
        // console.log(userData)
        return userData;
    }catch(err){
      console.log("error: ", err)
    }
  }    
}
  useEffect(() =>{
    if(token !== 'undefined' && token !== 'null' && token){
      navigate('/');
    }
  },[token])
  return (
      <>
      <Topbar />
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
      {action==="Sign Up"? <div /> :<div className="forgot-password">Забыл пароль? <span>Тыкай сюда!</span></div> }
      {action === "Sign Up" ? <div />: <div className="register" onClick={()=>{setAction("Sign Up")}}><span>Ещё не зарегистрирован?</span></div> }
      {action === "Login" ? <div />: <div className="login" onClick={()=>{setAction("Login")}}><span>Уже есть аккаунт?</span></div> }
      <div className='sendBtn'>
      {action === "Sign Up" ? <div className='submBtn' onClick={auth} > Создать </div> : <div className='submBtn' onClick={auth} >Войти</div> }
      </div>
    </div>
    </>
    
  )
}

export default LoginSignup;