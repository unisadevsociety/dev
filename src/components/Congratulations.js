import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Lottie from "lottie-react";
import animationData2 from "../animation/anim (2).json";
import "../styles/congrats.css";

const Congratulations = () => {
  return (
    <div>
      <Navbar />
      <div className="congratswrapper">
        <div className="congratsAnimation3">
          <Lottie animationData={animationData2} />
        </div>
        <div className="congratstext">
          <h2>Congratulations!</h2>
          <p>Welcome on board! Thank you for joining us.</p>
          {/* Add a Link to the home page */}
          <div className="goToHemoButtonBorders">
            <Link to="/" className="goToHemoButton">
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Congratulations;
