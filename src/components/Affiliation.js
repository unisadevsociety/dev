import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import Lottie from "lottie-react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import animationData from "../animation/anim (1).json";

import Navbar from "./Navbar"; // Import the Navbar component
import Footer from "./Footer";

function Affiliation({ onRegister }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [stream, setStream] = useState("");
  const [registered, setRegistered] = useState("yes"); // Default to "yes"
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = () => {
    // Validate name
    if (!name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }

    // Validate surname
    if (!surname.trim()) {
      setErrorMessage("Please enter your surname.");
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
          const user = { name, surname, studentEmail, stream, registered };

          // Push user data to the database and handle registration
          onRegister(user)
            .then(() => {
              // Navigate to /dev/congratulations
              window.location.href =
                "https://unisadevsociety.github.io/redirect/";
            })
            .catch((error) => {
              console.error("Error registering user:", error);
            });
        }
      });
  };

  // Function to handle radio button change
  const handleRegisteredChange = (event) => {
    setRegistered(event.target.value);
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-lg-6">
            <div className="d-lg-none">
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
                type="text"
                className="form-control"
                placeholder="Surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
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
                <option value="INF">INF</option>
                <option value="AMC">AMC</option>
                <option value="MAP">MAP</option>
                <option value="Other">Other</option>
              </select>
              <br />
              <div>
                <label>
                  Are you currently registered in this academic period?
                </label>
                <div>
                  <input
                    type="radio"
                    id="yes"
                    name="registered"
                    value="yes"
                    checked={registered === "yes"}
                    onChange={handleRegisteredChange}
                  />
                  <label htmlFor="yes">Yes</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="no"
                    name="registered"
                    value="no"
                    checked={registered === "no"}
                    onChange={handleRegisteredChange}
                  />
                  <label htmlFor="no">No</label>
                </div>
              </div>
              <br />
              {errorMessage && (
                <span className="text-danger">{errorMessage}</span>
              )}
              <br />
              <div className="text-center">
                {/* Disable button if not registered */}
                <button
                  className="btn btn-primary btn-lg"
                  onClick={handleRegister}
                  disabled={registered === "no"}
                  style={{ backgroundColor: registered === "no" ? "grey" : "" }}
                >
                  Register
                </button>
              </div>
              <br />
            </div>
          </div>
          <div className="col-lg-6 d-none d-lg-block">
            <Lottie animationData={animationData} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Affiliation;
