import React from 'react'
import ImageUpload from '../imageUpload/ImageUpload'
import Topbar from '../topbar/Topbar'
import './settings.css'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useState } from 'react';

export default function ProfileSetting() {
  const [exitPageVisible, setExitPageVisible] = useState(false);

  const exit = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('avatar_url');
    window.location.reload();
  }

  return (
    <>
      <title>Profile Settings</title>

      <Topbar />

      {exitPageVisible && (
        <>
          <div className='exitWindow'>
            <h1>Вы точно хотите выйти с аккаунта?</h1>
            <div className='exitWinBtns'>
              <button className='NoBtn' onClick={() => {setExitPageVisible(false)}}>Нет</button>
              <button className='YesBtn' onClick={() => {exit()}}>Да</button>
            </div>
          </div>
          <div className='bgF' />
        </>
      )}


      <div className="settingsWrapper">
        <div className='avatarSet'>
          <h1>Загрузить аватар</h1>
          <ImageUpload />
        </div>
        <button className='logout' onClick={() => {setExitPageVisible(true)}}>
          ВЫХОД С АККАУНТА
          <ExitToAppIcon />
        </button>
      </div>
    </>
  )
}
