import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const HeroSection = styled.section`
  background-image: url('https://example.com/hero-image.jpg');
  background-size: cover;
  background-position: center;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-align: center;
`;

const HeroContent = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

function Home() {
  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <Title>Welcome to Nobu Washington D.C.</Title>
          <p>Experience world-class Japanese cuisine in the heart of the capital.</p>
        </HeroContent>
      </HeroSection>
      {/* Add more sections here */}
    </HomeContainer>
  );
}

export default Home;