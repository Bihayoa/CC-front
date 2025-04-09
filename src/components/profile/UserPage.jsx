import React, { useEffect, useState } from 'react'
import './profile.css'
import { getUserByLogin } from '../../api/userAPI';
import { useParams } from 'react-router-dom';
import Topbar from '../topbar/Topbar';
import Sidebar from '../sidebar/Sidebar';
import ProfileLeft from './profileLeft';
import ProfileRight from './profileRight';

export default function UserPage() {
    const { login } = useParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState({});
  
    useEffect(() => {
        const getUserFetch = async() => {
          try{
            const data = await getUserByLogin(login);
            setProfile(data);
            console.log(data);
          }catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
    
        getUserFetch();
      }, []);
    
      if (loading) return <p>Загрузка...</p>;
      if (error) return <p>Прости, но это явно Ошибка {error}</p>;
    
  return (
        <>
    
          <title>{profile.name}</title>
    
        <Topbar />
            <div className="profile">
                <Sidebar className="sidebar"/>
                <div className="profileContainer">
                  <ProfileLeft avatar={profile.avatar_url} profileData = {profile} className="profileLeft"/>
                  <ProfileRight ids={profile.posts} login={profile.login} avatar = {profile.avatar_url} className="profileRight" />
                </div>
            </div>
        </>
  )
}
