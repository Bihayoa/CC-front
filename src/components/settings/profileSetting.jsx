import React from 'react'
import ImageUpload from '../imageUpload/ImageUpload'
import Topbar from '../topbar/Topbar'
import './settings.css'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useState } from 'react';
import { setDescription } from '../../api/uploadAPI';

export default function ProfileSetting() {


  const [exitPageVisible, setExitPageVisible] = useState(false);
  
  //Получение токена
  const token = localStorage.getItem('token');


  const [inputDesc, setInputDesc] = useState('')
  const handleChangeDesc = (event) => {
      setInputDesc(event.target.value);
  };

  async function changeDescription() {
    try{
      let formData = {
        description : inputDesc
      };
      console.log(formData);
      const data = await setDescription(token, formData);
      setInputDesc('');
      window.alert("Описание обновлено");
      return data;
    }catch(err){
      console.log("ERROR AT TRYING CHANGE DESCRIPTION: ", err);
      window.alert('Какая-то ошибка');
    }
  }

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
        <div className="descriptionSet">
          <h1>Описание аккаунта</h1>
          <div className="descWrapper">
            <input value={inputDesc} placeholder='Введи новое описание' className='descInput' maxLength={120} onChange={handleChangeDesc}/>
            <button className="descBtn" onClick = {() => changeDescription()}>Поменять</button>
          </div> 


        </div>

      </div>
        <button className='logout' onClick={() => {setExitPageVisible(true)}}>
          ВЫХОД С АККАУНТА
          <ExitToAppIcon />
        </button>
    </>
  )
}
