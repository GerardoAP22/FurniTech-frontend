import React, { useEffect, useState } from 'react'
import { getAllItems } from '../api/routes';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import ItemComp from '../components/ItemComp';
import {useAuth} from '../context/AuthContext'
import { useParams } from "react-router-dom";

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

export default function LandingPage() {
  const [displayItems, setDisplayItems] = useState([])

  useEffect(() => {
    const getFeatureItems = async () => {
      try {
        const data = await getAllItems();

        if(!data||!Array.isArray(data.results)){
          return;
        }

        const featureItems = data.results.length > 10 ? data.results.slice(-10) : data;
        setDisplayItems(featureItems);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };
    getFeatureItems();
  }, []);

  return (
    <div>
      LandingPage
      {displayItems.map((item, index) => {
    return (
        <ItemComp
            key={index} 
            item={item}
        />
    );
})}
    </div>
  )
}
