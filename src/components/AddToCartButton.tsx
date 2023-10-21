import React, { useContext } from 'react';
import { CartContext } from '../context/cart';

interface Item {
  id: number;
  image: string;
  name: string;
  color: string;
  price: string;
  description: string;
  category: string;
  tags: string;
  quantity:number;
}

interface AddToCartButtonProps {
  item: Item;
}

function AddToCartButton({ item }: AddToCartButtonProps) { 
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('AddToCartButton must be used within a CartProvider');
  }

  const { addToCart } = context;

  const handleAddToCart = () => {
    addToCart(item);
  };

  return (
    <div>
      <button className='add-to-cart-button' onClick={handleAddToCart}>Add to Cart</button>       
    </div>
  );
}

export default AddToCartButton;