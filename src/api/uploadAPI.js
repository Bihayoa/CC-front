import {oneImageToAvatarUploadURL } from "../config/filesPath.config"

const setAvatar = async(token, formData ) => {
    try{
        const res = await fetch(`${oneImageToAvatarUploadURL}`, {
            method: 'POST',
            body: formData,
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });

        if(!res.ok){
            throw new Error(`Ошибка запроса: ${res.status}`);
        }
        const data = await res.json();
        return data
    }catch(err){

    }
}

export {setAvatar}