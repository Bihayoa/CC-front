import {oneImageToAvatarUploadURL, changeDescriptionURL } from "../config/filesPath.config"

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
        console.log("ERROR AT SET AVATAR: ", err)
    }
}

const setDescription = async(token, description) => {
    const response = await fetch(changeDescriptionURL, {
        method: 'PATCH',
        body: JSON.stringify(description),
        headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });

    const data = await response.json();
    return data;
}

export {setAvatar, setDescription}