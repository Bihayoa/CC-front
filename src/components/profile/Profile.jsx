import React, { useEffect, useState } from 'react'
import './profile.css';
import Topbar from '../topbar/Topbar';
import Sidebar from '../sidebar/Sidebar';
import { getMe } from '../../api/userAPI';
import ProfileLeft from './profileLeft';
import ProfileRight from './profileRight';


export default function Profile() {

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});


  const avatar = localStorage.getItem('avatar_url');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const getMeFetch = async() => {
      try{
        const data = await getMe(token);
        setProfile(data);
        console.log(data);
      }catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getMeFetch();
  }, []);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Прости, но это явно Ошибка {error}</p>;

  return (
    <>

    <title>Моя страница</title>

    <Topbar />
        <div className="profile">
            <Sidebar className="sidebar"/>
            <div className="profileContainer">
              <ProfileLeft avatar={avatar} profileData = {profile} className="profileLeft"/>
              <ProfileRight ids={profile.posts} login={profile.login} className="profileRight" />
            </div>
        </div>
    </>
  )
}
