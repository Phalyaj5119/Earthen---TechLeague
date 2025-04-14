// frontend/src/pages/AboutUs.js
import React from 'react';
import './AboutUs.css'; // Make sure this path is correct
import img1 from '../images/img1.png'; // Adjust the path if needed
import img2 from '../images/img2.png'; // Adjust the path if needed

export default function AboutUs() {
  return (
    <div className="about-us-container">
      <h1 className="about-us-title">About Us</h1>
      <div className="about-us-content">
        <div className="left-column">
          <div className="about-us-text">
            <p>
              Pottery is a fast-growing small business based in Mumbai.
              Founded in 2022, Pottery was made with a passion to promote
              sustainability and Indian talent.
            </p>
          </div>
          <div className="left-image">
            <img src={img1} alt="Pottery creation" />
          </div>
        </div>
        <div className="right-column">
          <div className="right-image">
            <img src={img2} alt="Pottery collection" />
          </div>
          <div className="right-text">
            <p className="right-image-text">
              Whether you are an aesthetic person or just love
              decorating your home, Pottery is the right place
              for you!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
