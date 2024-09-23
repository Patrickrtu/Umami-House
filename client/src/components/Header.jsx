import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #000;
  color: #fff;
  padding: 1rem;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 2rem;
`;

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

function Header() {
  return (
    <HeaderContainer>
      <Nav>
        <Logo>Nobu</Logo>
        <NavLinks>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/menu">Menu</NavLink></li>
          <li><NavLink to="/reservations">Reservations</NavLink></li>
          <li><NavLink to="/takeout">Takeout</NavLink></li>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
}

export default Header;