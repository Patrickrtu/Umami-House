import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/styles.css";

function Header() {
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`header-container ${isSticky ? "sticky" : ""}`}>
      <nav className="nav">
        <h1 className="logo">Umami House</h1>
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>
          <li>
            <Link to="/menu" className="nav-link">
              Menu
            </Link>
          </li>
          <li>
            <Link to="/reservations" className="nav-link">
              Reservations
            </Link>
          </li>
          <li>
            <Link to="/takeout" className="nav-link">
              Takeout
            </Link>
          </li>
          <li>
            <Link to="/connect" className="nav-link">
              Connect
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
