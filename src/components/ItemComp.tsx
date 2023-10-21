import React from 'react'
import AddToCartButton from './AddToCartButton'

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
  
  interface ItemProps {
    item:Item;
  }
  
  const Item: React.FC<ItemProps> = ({item}) => {
    return (
      <div className='item'>
            <div className="item-image-container">
              <a href={`/items/${item['id']}`}><img className='item-image' src={item['image']} alt={item['name']}></img></a>
            </div>
            <div className='item-name-price'>
              <p className='item-name-price-title'>{item['name']}</p>
              <p>${item['price']}</p> <br />
              <AddToCartButton item={item}/>
            </div>
          </div>
    );
  };
  
  export default Item;