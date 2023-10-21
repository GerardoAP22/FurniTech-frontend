import React from 'react'
import { NavLink } from 'react-router-dom'

function Footer() {
  return (
    <div className="footer-container">
        <h5>Meet the Team!</h5>
        <div className="footer-links">
          <h4>Front-End</h4>
          <a href="https://www.linkedin.com/in/devops-jasmine/">Jasmine</a>
          <a href="https://www.linkedin.com/in/gerardo-arriaza-pantaleon1/">Gerardo</a>
          <h4>Back-End</h4>
        </div>
    </div>
  )
}

export default Footer