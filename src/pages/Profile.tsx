
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../context/AuthContext'
import { getOrders } from '../api/routes';
import OrderTab from './OrderTab'
import NameChange from './NameChange'
import '../styles/profile.css'

interface Item {
  item: string;
  quantity: number; 
}

interface Order { 
  order_items: Item[];
  order_id: number;
}

const Profile = () => {
  const {username, logout, deleteUser} = useAuth()
  const [previousOrders, setPreviousOrders] = useState<Order[]>([])
  const [changeName, setNameChange] = useState<boolean>(false)
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
        console.log(orders)
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
    <div className={"profile"}>
      <h1>Welcome, {username}!</h1>
      {previousOrders&&previousOrders.map((order:Order)=> {
        return (
          <OrderTab order_items={order.order_items}/>
        )
      })}
      <NameChange show={changeName}/>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleDelete}>Delete Profile</button>
      <p><a onClick={setNameState} className={"changeName"}>Change E-mail address</a></p>
    </div>
  );
};

export default Profile;
