import React from 'react';
import styled from 'styled-components';
import video from '../assets/nobu_la-540p.mp4';

const HomeContainer = styled.div`
  max-width: 100%;
  margin: 0;
  padding: 0;
`;

const HeroSection = styled.section`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-align: center;
  overflow: hidden;
  margin: 0;
  padding: 0;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
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
        <VideoBackground src={video} autoPlay loop muted></VideoBackground>
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