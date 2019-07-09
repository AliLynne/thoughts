import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
     <nav>
      <div className="pink nav-wrapper">
        <a href="/" className="center brand-logo">Ali's Thoughts</a>
        <ul id="nav-mobile" className="left hide-on-med-and-down">
          <li><Link to="new">New Thought</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Header
