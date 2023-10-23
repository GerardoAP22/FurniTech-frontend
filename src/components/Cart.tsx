import React, { useContext, useState, useEffect, SyntheticEvent } from 'react';
import { CartContext } from '../context/cart';
import { createOrder } from '../api/routes';
import {useAuth} from '../context/AuthContext'

interface Item {
  id: number;
  image: string;
  name: string;
  color: string;
  price: string;
  description: string;
  category: string;
  tags: string;
  quantity: number;
}

interface OrderItem {
    id: number;
    image:string;
    name:string;
    price:string;
    quantity:number;
}

export default function Cart() {
  const {username, email} = useAuth()
  const context = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [populatedCart, setPopulatedCart] = useState<boolean>(false)



  if (!context) {
    throw new Error('cartItems must be used within a CartProvider');
  }

  const { cartItems, removeFromCart, clearCart, getTotal } = context;

  useEffect(()=>{
    if(cartItems.length>=1){
      setPopulatedCart(true)
    }else{
      setPopulatedCart(false)
    }
  },[cartItems])

  const handleRemoveFromCart = (item: Item) => {
    removeFromCart(item);
  };

  const handleCheckout = async (evt: SyntheticEvent) => {
    evt.preventDefault();
    try {
      const order_items = cartItems.map((item) => ({
        item: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
      }));
  
      const requestData = {
        email: email as string,
        username,
        order_items,
      };
  
      const response = await createOrder(requestData);
      console.log(response);
  
      clearCart();
    } catch (err) {
      console.error(err);
    }
  };
  

  useEffect(() => {
    const total = getTotal();
    setTotalPrice(total);
  }, [cartItems, getTotal]);

  return (
    <div>
      <div className="cart-items-container">
        {cartItems.map((item, index) => (
          <div className="cart-item" key={index}>
            <div className="cart-item-image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="cart-item-details">
              <p className="cart-item-name">{item.name}</p>
              <p className="cart-item-quantity">Quantity: {item.quantity}</p>
              <p className="cart-item-price">Price: ${item.price}</p>
            </div>
            <div>
             <svg className="remove-button" onClick={() => handleRemoveFromCart(item)}
             width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 5L11 11M11 5L17 11M19 1H8L1 8L8 15H19C19.5304 15 20.0391 14.7893 20.4142 14.4142C20.7893 14.0391 21 13.5304 21 13V3C21 2.46957 20.7893 1.96086 20.4142 1.58579C20.0391 1.21071 19.5304 1 19 1Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              </div>
          </div>
        ))}
        <div className='cart-separator'>
        </div>
        <div className='cart-checkout-container'>
          <p className='cart-order-details'>ORDER DETAILS</p>
          <div className='cart-checkout-price-container'>
            <div>Total:</div>
            <div>${totalPrice}</div>
          </div>
          <button className='cart-checkout-button' onClick={handleCheckout}>CHECKOUT</button>
        </div>
      </div>
    </div>
  );
}
