import React, { useState, useEffect } from 'react';
import { getAllItems } from '../api/routes';
import ItemComp from '../components/ItemComp'
import {useAuth} from '../context/AuthContext'
 
interface Props{
    lighting?:string;
    furniture?:string;
    decor?:string;
    linens?:string;
}

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

interface ApiResponse {
  results: Item[];
}

const MarketPlace: React.FC<Props> = ({lighting, furniture, decor, linens}) => {
  const [items, setItems] = useState<Item[]>([])
  const [type, setType] = useState<string | null>(null)
  const [filterItem, setFilter] = useState<Item[]>([])

  const {username} = useAuth()


  useEffect(() => {
    if (username) {
      console.log(username)
    }
  }, [username])

  useEffect(() => {
    const getItems = async() => {
      const data: ApiResponse = await getAllItems();
      setItems(data.results);
    };
    getItems();
  }, []);

  useEffect(()=> {
    let typeValue:string = '';
  
    if (lighting) typeValue = 'Lighting';
    if (furniture) typeValue = 'Furniture';
    if (decor) typeValue = 'Decor';
    if (linens) typeValue = 'Linens';
    
    setType(typeValue);

  }, [lighting, decor, furniture, linens])

  useEffect(() => {
    if (type) {
      let filteredArray = items.filter((item) => item.category === type);
      setFilter(filteredArray)
    }else{
      setFilter(items)
    }
  }, [type, items]);

  return (
    <div className='items-container'>

        {filterItem.map((item, index) => (
          <ItemComp key={index} item={item} />
        ))}

      </div>
  );
};

export default MarketPlace;