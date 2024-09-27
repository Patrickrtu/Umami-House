import React from 'react';
import '../css/styles.css';
import video from '../assets/nobu_la-540p.mp4'

function Home() {
  return (
    <div className="home-container">
      <section className="hero-section">
        <video className="video-background" src={video} autoPlay loop muted></video>
        <div className="hero-content">
          <h1 className="title">Welcome to Umami House California</h1>
          <p>Experience world-class Japanese cuisine in the heart of the capital.</p>
        </div>
      </section>
      {/* Add more sections here */}
    </div>
  );
}

export default Home;