import React from 'react';
import { Link } from 'react-router-dom';

interface Item {
  id: number;
  image: string;
  name: string;
  price: string;
}

interface CarouselProps {
  items: Item[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  return (
    <div className="carousel">
      <div className="carousel-container">
        {items.map((item) => (
          <div key={item.id} className="carousel-item">
            <Link to={`/items/${item.id}`}>
              <div className="item-info">
                <span className="item-name">{item.name}</span>
                <span className="item-price">${item.price}</span>
                <img src={item.image} alt={item.name} />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
