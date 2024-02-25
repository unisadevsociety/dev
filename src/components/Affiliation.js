import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import animationData from "../animation/anim (1).json";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Affiliation({ onRegister }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [stream, setStream] = useState("");
  const [registered, setRegistered] = useState("yes");
  const [startedDegreeIn, setStartedDegreeIn] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchRegisteredMembers();
    fetchModifiedMemberCount();
  }, []);

  const fetchRegisteredMembers = () => {
    const usersRef = firebase.database().ref("users");
    usersRef.once("value", (snapshot) => {
      const count = snapshot.numChildren();
      console.log("Total Registered Members:", count);
    });
  };

  const fetchModifiedMemberCount = () => {
    const usersRef = firebase.database().ref("users");
    usersRef.once("value", (snapshot) => {
      const currentTime = new Date().getFullYear();
      snapshot.forEach((childSnapshot) => {
        const startedYear = childSnapshot.val().startedDegreeIn;
        if (currentTime - startedYear > 3) {
          // User has been registered for more than 3 years without re-registering
          // Perform necessary operations
          // Here you can remove the user or update their registration status
        }
      });
    });
  };

  const handleRegister = () => {
    if (!name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }

    if (!surname.trim()) {
      setErrorMessage("Please enter your surname.");
      return;
    }

    if (!stream) {
      setErrorMessage("Please select a stream.");
      return;
    }

    if (!studentEmail.endsWith("@mylife.unisa.ac.za")) {
      setErrorMessage("Please enter a valid UNISA student email.");
      return;
    }

    const user = {
      name,
      surname,
      studentEmail,
      stream,
      registered,
      startedDegreeIn,
    };

    onRegister(user)
      .then(() => {
        window.location.href = "/dev/congratulations";
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });
  };

  const handleRegisteredChange = (event) => {
    setRegistered(event.target.value);
  };

  const handleStartedDegreeInChange = (event) => {
    setStartedDegreeIn(event.target.value);
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
                <option value="Other">Other</option>
              </select>
              <br />
              <label
                htmlFor="startedDegreeIn"
                className="text-black font-weight-bold"
              >
                Started degree in
              </label>
              <select
                id="startedDegreeIn"
                className="form-select"
                value={startedDegreeIn}
                onChange={handleStartedDegreeInChange}
              >
                <option value="">Select Year</option>
                {Array.from(
                  { length: 25 },
                  (_, i) => new Date().getFullYear() - i
                ).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
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
                <button
                  className="btn btn-primary btn-lg"
                  onClick={handleRegister}
                  disabled={registered === "no" || errorMessage}
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
