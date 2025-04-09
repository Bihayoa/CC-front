import { getMeURL, APIUsersURL } from "../config/dbCon.config";

const register = async(URL, user) => {
        const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

     const userData = await response.json();
     return userData;
}

const login = async(URL, user) => {
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    }
  );
  try{
      const userData = await response.json();
      return userData;
  }catch(err){
    console.log(err)
    return err
    }
}

const getMe = async(token) => {
    const response = await fetch(getMeURL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,        
        },
    })
    const getMeData = await response.json();
    return getMeData;
}

const getUserByLogin = async(login) => {
    const res = await fetch(`${APIUsersURL}/${login}`);
    if(!res.ok){
        throw new Error(`Ошибка запроса: ${res.status}`)
    }

    const data = await res.json();
    return data;
}




export {register, login, getMe, getUserByLogin};
