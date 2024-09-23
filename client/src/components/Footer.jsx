import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #000;
  color: #fff;
  padding: 2rem 0;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const FooterSection = styled.div`
  margin-bottom: 1rem;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const FooterLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  display: block;
  margin-bottom: 0.5rem;
  &:hover {
    text-decoration: underline;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialIcon = styled.a`
  color: #fff;
  font-size: 1.5rem;
  &:hover {
    opacity: 0.8;
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Nobu Washington D.C.</FooterTitle>
          <p>2525 M Street NW</p>
          <p>Washington, D.C. 20037</p>
          <p>Phone: (202) 871-6565</p>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/menu">Menu</FooterLink>
          <FooterLink to="/reservations">Reservations</FooterLink>
          <FooterLink to="/takeout">Takeout</FooterLink>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Connect With Us</FooterTitle>
          <SocialLinks>
            <SocialIcon href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </SocialIcon>
            <SocialIcon href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </SocialIcon>
            <SocialIcon href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </SocialIcon>
          </SocialLinks>
        </FooterSection>
      </FooterContent>
    </FooterContainer>
  );
}

export default Footer;