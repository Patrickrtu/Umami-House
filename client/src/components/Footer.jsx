import React from 'react';
import { Link } from 'react-router-dom';
import '../css/styles.css';

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <section className="footer-section">
          <h3 className="footer-title">Umami House</h3>
          <p>2525 S Blvd</p>
          <p>San Francisco, CA 94109</p>
          <p>Phone: (415) 555-9786</p>
        </section>
        <section className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <Link to="/" className="footer-link">Home</Link>
          <Link to="/menu" className="footer-link">Menu</Link>
          <Link to="/reservations" className="footer-link">Reservations</Link>
          <Link to="/takeout" className="footer-link">Takeout</Link>
          <Link to="/about" className="footer-link">About Us</Link>
        </section>
        <section className="footer-section">
          <Link to="/connect" className="footer-title footer-link">Connect With Us</Link>
        </section>
      </div>
    </footer>
  );
}

export default Footer;