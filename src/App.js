// app.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Affiliation from "./components/Affiliation";
import Congratulations from "./components/Congratulations";
import MaintenancePage from "./components/MaintenancePage";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "./App.css";

// Initialize Firebase (replace this with your Firebase config)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.database();

function App() {
  const [affiliationCount, setAffiliationCount] = useState(0);

  useEffect(() => {
    const countRef = db.ref("counters/affiliation");
    countRef.on("value", (snapshot) => {
      const count = snapshot.val();
      setAffiliationCount(count);
    });

    return () => countRef.off("value");
  }, []);

  const handleRegistration = (user) => {
    const usersRef = db.ref("users");
    usersRef.push(user);

    // Update affiliation count in Firebase
    return db
      .ref("counters/affiliation")
      .set(affiliationCount + 1)
      .then(() => {
        // No need to navigate here since it's handled in Affiliation component
        window.location.href = "https://unisadevsociety.github.io/redirect/";
      })
      .catch((error) => {
        console.error("Error updating count:", error);
      });
  };

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div>
        <Routes>
          <Route
            exact
            path="/"
            element={<Home affiliationCount={affiliationCount} />}
          />
          <Route
            exact
            path="/affiliation"
            element={<Affiliation onRegister={handleRegistration} />}
          />
          {/* <Route exact path="/congratulations" element={<Congratulations />} /> */}
          <Route exact path="/maintenancePage" element={<MaintenancePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
