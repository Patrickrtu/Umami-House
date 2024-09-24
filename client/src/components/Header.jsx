import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  position: absolute;
  top: 0;
  width: 100%;
  background-color: transparent;
  color: #fff;
  padding: 1rem 2rem;
  z-index: 1000;
  transition: background-color 0.3s ease;

  &.sticky {
    position: fixed;
    background-color: #000;
  }
`;


const Nav = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 2rem;
`;

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 1.5rem; // Reduced gap to prevent clipping
  margin: 0;
  padding: 0;
  flex: 1;
  justify-content: center;

  @media (max-width: 768px) {
    display: none;
  }
`;



const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 500;

  &:hover {
    border-bottom: 2px solid #fff;
  }
`;

const NavLinkItem = styled.li`
  margin: 0;
  padding: 0;
`;

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
    <HeaderContainer className={isSticky ? 'sticky' : ''}>
      <Nav>
        <Logo>Nobu</Logo>
        <NavLinks>
          <NavLinkItem><NavLink to="/">Home</NavLink></NavLinkItem>
          <NavLinkItem><NavLink to="/menu">Menu</NavLink></NavLinkItem>
          <NavLinkItem><NavLink to="/reservations">Reservations</NavLink></NavLinkItem>
          <NavLinkItem><NavLink to="/takeout">Takeout</NavLink></NavLinkItem>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
}

export default Header;