
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/routes';
import {useAuth} from '../context/AuthContext'

const Profile = () => {
  const {username} = useAuth()
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.log(error, 'You stupid fuck')
    }
  };

  // useEffect(() => {
  //   const handleStorageChange = (e: StorageEvent) => {
  //     if (e.key === 'username' && e.newValue) {
  //       setUsername(e.newValue);
  //     }
  //   };

  //   window.addEventListener('storage', handleStorageChange);

  //   return () => {
  //     window.removeEventListener('storage', handleStorageChange);
  //   };
  // }, []);

  if (!username) {
    return <div>You must be logged in to see this page.</div>;

  }

  return (
    <div>
      <h1>Welcome to Your Profile, {username}!</h1>
      <button>End Game Session</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
