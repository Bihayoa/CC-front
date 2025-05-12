import { feedPostsURL, postsByIDURL, postsURL, putLikeToPost } from "../config/postsURL.config";

const postByID = async (id) => {
    const response = await fetch(`${postsURL}/${id}`);
    if (!response.ok){
        throw new Error('НУ ГДЕ_ТО ОШИБКА ПРИ ПОЛУЧЕНИИ ПОСТА ПО АЙДИ, ВОЗМОЖНО ТАКОГО ПОСТА ВООБЩЕ НЕ СУЩЕСТВУЕТ ИЛИ ОН БЫЛ УДАЛЕН');
    }

    const data = await response.json();
    return data;
}

const putLike = async(id, token) => {
    const URL = `${putLikeToPost}/${id}`;
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
        },
    });
    const likeResponse = await response.json(); 
    return likeResponse.likeCount; // Поменяйте здесь на соответствующий объект
};

const feedPosts = async(PORTION_OF_ITEMS, offset) => {
    const res = await fetch(
        `${feedPostsURL}/?limit=${PORTION_OF_ITEMS}&offset=${offset}`
      );
  
      if (!res.ok) {
        throw new Error(`Ошибка HTTP: ${res.status}`);
      }
  
      const data = await res.json();
      return data;
}

const createPost = async(token, post) =>{
    const response = await fetch(postsURL, {
        method: 'POST',
        body: post,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const postData = await response.json();
    return postData;
}

const postsByID = async(offset, limit, ids) => {
    const response = await fetch(`${postsByIDURL}/?offset=${offset}&limit=${limit}&ids=${ids}`);
    if(!response.ok){
        throw new Error(`Ошибка запроса: ${response.status}`)
    }

    const data = await response.json();
    return data;
}

export {postByID, putLike, feedPosts, createPost, postsByID};