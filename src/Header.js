import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
     <nav>
      <div className="pink nav-wrapper">
        <a href="/" className="center brand-logo">Thoughts</a>
        <ul id="nav-mobile" className="left">
          <li><Link to="new">New</Link></li>
          <li><Link to="drafts">Drafts</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Header
