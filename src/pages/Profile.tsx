
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../context/AuthContext'
import { getOrders } from '../api/routes';
import OrderTab from './OrderTab'
import NameChange from './NameChange'

interface Orders{
  image:string;
  item:string;
  price:string;
}

const Profile = () => {
  const {username, logout, deleteUser} = useAuth()
  const [previousOrders, setPreviousOrders] = useState<Orders[]>([])
  const [changeName, setNameChange] = useState<Boolean>(false)
  const navigate = useNavigate();

  useEffect(()=> {
    const getAllOrders = async () => {
      if(!username){
        return
      }
      try{
        const orders = await getOrders(username)
        if(orders){
          setPreviousOrders(orders)
        }
      }catch(error){
        console.log(error)
      }
    }
    getAllOrders()
  },[])

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/signin');
    } catch (error) {
      console.log(error)
    }
  };

  const handleDelete = async () => {
    try{
      await deleteUser()
      navigate('/signup')
    }catch(error){
      console.log('You are quite troublesome to get rid of')
    }
  } 

  const setNameState = () => {
    setNameChange(prevState => !prevState)
  }

  useEffect(() => {
    if (username==='Guest') {
      navigate('/signin');
    }
  }, [username]);

  return (
    <div>
      <h1>Welcome to Your Profile, {username}!</h1>
      {previousOrders&&previousOrders.map((order)=> {
        return(
          <OrderTab/>
        )
      })}
      <NameChange show={changeName}/>
      <button onClick={handleDelete}>Delete Profile</button>
      <button onClick={handleLogout}>Logout</button>
      <p><a onClick={setNameState}>Change Username</a></p>
    </div>
  );
};

export default Profile;
