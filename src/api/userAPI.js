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
  
    const userData = await response.json();
    return userData;
}

export {register, login};
