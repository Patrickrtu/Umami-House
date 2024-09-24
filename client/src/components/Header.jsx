import React from 'react';
import { Link } from 'react-router-dom';
import '../css/styles.css';


function Header() {
  return (
    <header className="header-container">
      <nav className="nav">
        <h1 className="logo">Umami House</h1>
        <ul className="nav-links">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/menu" className="nav-link">Menu</Link></li>
          <li><Link to="/reservations" className="nav-link">Reservations</Link></li>
          <li><Link to="/takeout" className="nav-link">Takeout</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;