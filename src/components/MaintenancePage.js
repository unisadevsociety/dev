// MaintenancePage.js
import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationData10 from "../animation/anim (10).json";
import "../styles/maintenance.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

function MaintenancePage() {
  return (
    <div>
      <Navbar />
      <div className="maintancontainer">
        <div className="maintainAnimation">
          <Lottie animationData={animationData10} />
        </div>
        <h1 className="texttextmaintaine">
          Sorry, this page is under maintenance.
        </h1>
        <div className="goToHemoButtonBorders">
          <Link to="/" className="goToHemoButton">
            Go to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MaintenancePage;
