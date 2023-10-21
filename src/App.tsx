import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Header from './components/Header';
import MarketPlace from './pages/MarketPlace'
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Profile from './pages/Profile';
import Details from './pages/Details';
import Footer from './components/Footer';
import Cart from './components/Cart'
import './App.css';



export default function App() {
  return (
    <BrowserRouter>
        <Header/>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/> 
        <Route path='/:username' element={<Profile/>}/>
        <Route path='/cart' element={<Cart />}/>
        <Route path='/mp/' element={<MarketPlace/>}/>
        <Route path='/mp/lighting' element={<MarketPlace lighting={'lighting'}/>}/>
        <Route path='/mp/decor' element={<MarketPlace decor={'decor'}/>}/>
        <Route path='/mp/furniture'element={<MarketPlace furniture={'furniture'}/>} />
        <Route path='/mp/linens' element={<MarketPlace linens={'linens'}/>} />
        <Route path='/items/:itemId' element={<Details/>}/>
      </Routes>
        <Footer/>
    </BrowserRouter>
  );
}