import React, { useState } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import Lottie from "lottie-react";
import animationData from "../animation/anim (1).json";

import Navbar from "./Navbar"; // Import the Navbar component
import Footer from "./Footer";

function Affiliation({ onRegister }) {
  const [name, setName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [stream, setStream] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = () => {
    // Validate name
    if (!name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }

    // Validate stream
    if (!stream) {
      setErrorMessage("Please select a stream.");
      return;
    }

    // Validate student email
    if (!studentEmail.endsWith("@mylife.unisa.ac.za")) {
      setErrorMessage("Please enter a valid UNISA student email.");
      return;
    }

    // Check if the email already exists
    const usersRef = firebase.database().ref("users");
    usersRef
      .orderByChild("studentEmail")
      .equalTo(studentEmail)
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          setErrorMessage("This email is already registered.");
        } else {
          // Reset error message
          setErrorMessage("");

          // Create user object
          const user = { name, studentEmail, stream };

          // Handle saving user data
          onRegister(user);
        }
      });
  };

  return (
    <div>
      <Navbar /> {/* Add the Navbar component */}
      <div className="container">
        <div className="row align-items-center justify-content-center">
          {/* Align items and justify content center */}
          <div className="col-lg-6">
            <div className="d-lg-none">
              {/* Hide for LG and up */}
              <Lottie animationData={animationData} />
            </div>
            <div id="home">
              <h1 className="text-white">Affiliation Page</h1>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <br />
              <input
                type="email"
                className="form-control"
                placeholder="Student Email"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
              />
              <br />
              <label htmlFor="stream" className="text-black font-weight-bold">
                Choose your stream
              </label>
              <select
                id="stream"
                className="form-select"
                value={stream}
                onChange={(e) => setStream(e.target.value)}
              >
                <option value="">Select Stream</option>
                <option value="CCS">CCS</option>
                <option value="CIS">CIS</option>
                <option value="MCS">MCS</option>
                <option value="MIS">MIS</option>
                <option value="MAS">MAS</option>
                <option value="COM">COM</option>
                <option value="Other">Other</option>
              </select>
              <br />
              {errorMessage && (
                <span className="text-danger">{errorMessage}</span>
              )}
              <br />
              <div className="text-center">
                {/* Center the button */}
                <Link to="/congratulations" className="btn btn-primary btn-lg">
                  Register
                </Link>{" "}
                {/* Add btn-lg for larger size */}
              </div>
              <br />
            </div>
          </div>
          <div className="col-lg-6 d-none d-lg-block">
            {/* Hide for LG and below */}
            <Lottie animationData={animationData} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Affiliation;
