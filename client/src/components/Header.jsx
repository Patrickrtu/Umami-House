import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/styles.css';

<<<<<<< HEAD
=======
>>>>>>> 8748efb (Takeout tax & style folder)

function Header() {
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
<<<<<<< HEAD
=======
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
>>>>>>> 8748efb (Takeout tax & style folder)
  );
}

export default Header;
