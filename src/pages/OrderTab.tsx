import React from 'react';

interface Item {
  item: string;
  quantity: number; 
}

interface OrderTabProps {
  order_items: Item[];
}

const OrderTab: React.FC<OrderTabProps> = ({ order_items }) => {
  // You can now use order_items here
  return (
    <div>
      {order_items.map((item, index) => (
        <p key={index}>{item.item} - {item.quantity}</p>
      ))}
    </div>
  );
};

export default OrderTab;
