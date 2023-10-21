import React from 'react'
import { NavLink } from "react-router-dom";


function Navbar() {
  return (
    <div>
      <div className='navbar-container'>
        <nav className="navbar-container">
          <div className='navbar-button'><NavLink to="/mp/lighting">LIGHTING</NavLink></div>
          <div className='navbar-button'><NavLink to="/mp/furniture">FURNITURE</NavLink></div>
          <div className='navbar-button'><NavLink to="/mp/decor">DECOR</NavLink></div>
          <div className='navbar-button'><NavLink to="/mp/linens">LINENS</NavLink></div>
        </nav>
    </div>
    </div>
  )
}

export default Navbar