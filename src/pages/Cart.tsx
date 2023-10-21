import React, {useContext} from 'react';
import {CartContext} from '../context/cart'

export default function Cart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('cartItems must be used within a CartProvider');
  }

  const { cartItems } = context;

  console.log("In Cart Page")
  console.log(cartItems)
  return (
    <div>Cart</div>
  )
}

