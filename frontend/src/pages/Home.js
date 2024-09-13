// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/IMG1.jpg';
import backgroundImageMobile from '../assets/IMG3.png';
import './Home.css'; // Make sure to create and link a CSS file

export default function Home() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/newpage');
  };

  return (
    <div className="home-container">
      <img
        src={backgroundImage}
        alt="Background"
        className="background-image-desktop"
      />
      <img
        src={backgroundImageMobile}
        alt="Mobile Background"
        className="background-image-mobile"
      />
      <div className="content-desktop">
        <div className="content-center">
          <h1 className="title">
            <div className="title-content">
              <span className="title-line">Looking for the</span>
              <span className="title-line">Perfect Car Rental?</span>
            </div>
          </h1>
          <div className="button-container">
            <button
              className="start-button"
              onClick={handleButtonClick}
            >
              Start Here
            </button>
          </div>
        </div>
        <div className="footer-text">
          <p className="footer-line">Explore a wide range of vehicles tailored to your needs, with</p>
          <p className="footer-line">flexible rental options and unbeatable rates.</p>
        </div>
      </div>
    
      </div>
   
  );
}
