import { postsURL } from "../config/dbCon.config";


const postByID = async (id) => {
    const response = await fetch(`${postsURL}/${id}`);
    if (!response.ok){
        throw new Error('НУ ГДЕ_ТО ОШИБКА ПРИ ПОЛУЧЕНИИ ПОСТА ПО АЙДИ, ВОЗМОЖНО ТАКОГО ПОСТА ВООБЩЕ НЕ СУЩЕСТВУЕТ ИЛИ ОН БЫЛ УДАЛЕН');
    }

    const data = await response.json();
    return data;
}

const putLike = async(URL, token) => {
    const response = await fetch(URL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`,
    },
});
    const like = await response.json(); 
    return like;
}
export {postByID, putLike};