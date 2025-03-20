import React, {useState} from 'react'
import "./share.css"
import userAvatar from "../assets/adminAvatar.jpg"
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import uploadIcon from '../assets/Coding-Apps-Website-Web-Form-Image-Attachment--Streamline-Ultimate.png';
// import ReplyIcon from '@mui/icons-material/Reply';

//IMPORT URL
import { postsURL } from '../../config/dbCon.config';
import { createPost } from '../../api/postAPI';

export default function Share() {
    const post = new FormData();

    async function create(){
        post.append('title', inputTitle);
        post.append('text', inputText);
        if (files){
        for (let i = 0; i < files.length; i++) {
            post.append('images', files[i]);
        }
    }
        const token = localStorage.getItem('token')

        try{
            const postData = await createPost(token, post);
            setInputText('');
            setInputTitle('');
            setFiles('');
            window.location.reload();
            return postData
        }catch(err){
            console.error("SORRY, BUT ITS AN ERROR: ", err)
        }
    } 

    //ПОЛУЧЕНИЕ ТЕКСТА
    const [inputText, setInputText] = useState('');
    const handleChangeText = (event) => {
        setInputText(event.target.value);
    };
    //ПОЛУЧЕНИЕ ЗАГОЛОВКА
    const [inputTitle, setInputTitle] = useState('')
    const handleChangeTitle = (event) => {
        setInputTitle(event.target.value);
    };
    //ПОЛУЧЕНИЕ ФАЙЛОВ
    const [files, setFiles] = useState('')
    const handleFileChange = (event) => {
        setFiles(event.target.files);
        console.log(files);
    };
  return (
    <div className='share'>
        <div className='shareWrapper'>
            <div className='shareTop'>
                <img className='shareProfileImg' src={userAvatar} alt=''/>
                <input value={inputTitle} placeholder='Введи заголовок поста' className='shareTitleInput' maxLength={75} onChange={handleChangeTitle}/>
            </div>
            
            <hr className='shareHr' />

            <textarea value={inputText} onChange={handleChangeText} className='inputText' placeholder='Текст поста'></textarea>


            <div className='shareBottom'>
                <div className='shareOptions'>
                    <div className='shareOption'>
                        <label htmlFor='fileUpload' className='fUpload'>
                            <img src={uploadIcon} alt='upload' className='shareIcon'></img>
                            <input id='fileUpload' type='file' onChange={handleFileChange} multiple accept='.png, .jpg, .jpeg, .webp, .gif' className='uploadInput'/>
                        </label>
                    </div>


                    <div className='shareOption'>
                        <LabelIcon htmlColor='blue' className='shareIcon'/>
                        <span className='shareOptionText'> Теги </span>
                    </div>

                    
                    <div className='shareOption'>
                        <EmojiEmotionsIcon htmlColor='goldenrod'  className='shareIcon'/>
                        <span className='shareOptionText'> Эмоции </span>
                    </div>
                </div>
                {/* <ReplyIcon  className='shareButton'/>      */}
                <button className='shareButton' onClick={create}>Создать</button>
            </div>
        </div>
    </div>
  )
}
