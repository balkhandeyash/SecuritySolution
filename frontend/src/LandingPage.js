// LandingPage.jsx

import React from "react";
import "./LandingPage.css"; // Import the associated CSS file
import p1 from "./p1.jpg";
import p2 from "./p2.jpg";
const LandingPage = () => {
  return (
    <div className="landing-body">
      <main>
        <section className="hero-section">
          <h1>Welcome to Security Solution</h1>
          <p>
            Explore a realm of security innovation and collaboration with our
            exceptional team of developers.
          </p>
        </section>

        <section className="developers-section">
          <h2>Meet the Security Experts</h2>

          <div className="developers-container">
            <div className="developer">
              <img src={p1} alt="Security Expert 1" />
              <p>Yash Rajesh Balkhande</p>
            </div>

            <div className="developer">
              <img src={p2} alt="Security Expert 2" />
              <p>Gayatri Satish Bhamburkar</p>
            </div>

            <div className="developer">
              <img src={p1} alt="Security Expert 1" />
              <p>Yash Rajesh Balkhande</p>
            </div>

            <div className="developer">
              <img src={p2} alt="Security Expert 2" />
              <p>Gayatri Satish Bhamburkar</p>
            </div>

            {/* Add more security experts as needed */}
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
