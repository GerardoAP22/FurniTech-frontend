import { createContext, useState, useEffect, ReactNode } from 'react';

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

interface CartContextType {
  cartItems: Item[];
  addToCart: (item: Item) => void;
  removeFromCart: (item:Item) => void;
  clearCart: () => void;
  getTotal: () =>  number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, updateCartItems] = useState<Item[]>(
    localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')!) : []
  );

  const addToCart = (item: Item) => {
    const cartItemExists = cartItems.find((cartItem) => cartItem.id === item.id);

    if (cartItemExists) {
      updateCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
      );
    } else {
      updateCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (item: Item) => {
    const cartItemExists = cartItems.find((cartItem) => cartItem.id === item.id);

    if (cartItemExists && cartItemExists.quantity === 1) {
      updateCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
    } else {
      updateCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
        )
      );
    }
  };

  const clearCart = () => {
    updateCartItems([]);
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + parseInt(item.price) * item.quantity, 0);
  };

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems")
    if(cartItems){
        updateCartItems(JSON.parse(cartItems));
    }
  },[])

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart, getTotal, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
