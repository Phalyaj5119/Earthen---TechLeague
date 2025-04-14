import React, { useState } from 'react';
import LoginSignupPopup from '../components/LoginSignupPopup';
import AboutUs from './AboutUs';
import Carousel from './Carousel';
import CategoryPage from './CategoryPage';
import Navbar from '../components/Navbar';
import './LandingPage.css';


export default function LandingPage() {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      <Navbar />

      <div className="landing-page">
        <section className="hero-section">
          <h1>Welcome to the Best Home Decor</h1>
          <button className="join-us-btn" onClick={togglePopup}>
            Join Us
            <span className="arrow-circle">→</span>
          </button>
        </section>

        {showPopup && <LoginSignupPopup closePopup={togglePopup} />}

        <div className="content-section">
          <AboutUs />
          <Carousel />
          <CategoryPage />
        </div>
      </div>
    </>
  );
}
