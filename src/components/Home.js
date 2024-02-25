import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";
import Navbar from "./Navbar";
import Handshake from "../images/handshake.png";
import Events from "../images/events.png";
import Statsimage from "../images/statsimage.png";
import Lottie from "lottie-react";
import animationData from "../animation/anim.json";
import animationData1 from "../animation/anim (1).json";

import animationData3 from "../animation/anim (3).json";
import animationData4 from "../animation/anim (4).json";
import animationData5 from "../animation/anim (5).json";
import animationData6 from "../animation/anim (6).json";
import animationData7 from "../animation/anim (7).json";
import animationData8 from "../animation/anim (8).json";
import animationData9 from "../animation/anim (9).json";
import Footer from "./Footer";

function Home({ affiliationCount, incrementAffiliationCount }) {
  useEffect(() => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ:;/><}{";

    const animateMembers = () => {
      let iterations = 0;
      const interval = setInterval(() => {
        const membersCountElement = document.querySelector(".membersCount");
        if (membersCountElement) {
          membersCountElement.innerText = membersCountElement.innerText
            .split("")
            .map((letter, index) => {
              if (index >= 0 && index <= 6) {
                if (iterations < 7) {
                  return letters[Math.floor(Math.random() * 26)];
                } else {
                  return "Members:"[index];
                }
              }
              return letter;
            })
            .join("");

          if (iterations >= 7) {
            clearInterval(interval);
            membersCountElement.innerText = "Members:";
          }
          iterations++;
        }
      }, 80);
    };

    const membersCountElement = document.querySelector(".membersCount");
    if (membersCountElement) {
      membersCountElement.addEventListener("mouseover", animateMembers);
    }

    const intervalId = setInterval(animateMembers, 7000); // Run the animation every 3 seconds

    return () => {
      clearInterval(intervalId);
      if (membersCountElement) {
        membersCountElement.removeEventListener("mouseover", animateMembers);
      }
    };
  }, []);

  return (
    <div>
      <Navbar />
      <div className="homeMainContainer">
        <div className="heroContainer">
          <div className="leftHeroSide">
            <h1 className="text_Hie typewriterText">Hello, Welcome </h1>
            <p className="text_welcome">
              to the UNISA Developer Society, where we nurture student
              brilliance, sharpen their innovative ideas, and equip them with
              job-ready skills. Our mission is to provide a dynamic platform for
              students to shine, learn, and grow, offering unparalleled
              opportunities for personal and professional development.
            </p>
            <div className="joinusButton">
              <Link to="/affiliation" className="joinusButtonButton">
                Join our Community
              </Link>
            </div>
          </div>
          <div className="rightHeroSide">
            <div className="animation1">
              <Lottie animationData={animationData} />
            </div>
          </div>
        </div>
      </div>
      <div className="secondHeroSection">
        <div className="secondHeroSectionwrappersection">
          <div>
            <img src={Statsimage} alt="" className="StatsimageImage" />
          </div>
          <div>
            <p>Community Stats</p>
          </div>
        </div>
        <div className="statsContainer">
          <div className="handshakeContainer handshakeContainer1">
            <div>
              <img src={Handshake} alt="" className="handshakeImage" />
            </div>
            <div className="MembersAffiliationcount">
              <p className="membersCount" data-value="Members: ">
                Members:
              </p>
              <p className="membersCount2">{affiliationCount}</p>
            </div>
          </div>
          {/* secondcontainer */}
          <div className="handshakeContainer">
            <div>
              <img src={Events} alt="" className="eventsImage" />
            </div>
            <div className="upcomingevents">
              <p>Upcoming Events:</p>
              <p className="upcomingevents3">+3</p>
            </div>
          </div>
        </div>
      </div>
      <div className="benefitsTab">
        <div className="benefitsTabRow1">
          <div className="benefitsTabAnim2">
            <div className="benefitsTabAnimation3">
              <Lottie animationData={animationData3} />
            </div>
            <p className="benefitsTabText">
              Join our diverse community to meet kindred spirits, forge
              friendships, and explore shared passions in a vibrant and
              supportive environment.
            </p>
          </div>
          <div className="benefitsTabAnim3">
            <div className="benefitsTabAnimation3">
              <Lottie animationData={animationData1} />
            </div>

            <p className="benefitsTabText">
              Explore Computer Science: Acquire essential skills, dive into
              coding, and unlock endless possibilities in the dynamic world of
              technology and innovation.
            </p>
          </div>
        </div>
        {/* SECONDROW!!!!! */}
        <div className="benefitsTabRow1">
          <div className="benefitsTabAnim2">
            <div className="benefitsTabAnimation3">
              <Lottie animationData={animationData6} />
            </div>
            <p className="benefitsTabText">
              Discover Mentors: Forge meaningful connections, gain valuable
              insights, and foster growth through mentorship in your personal
              and professional journey.
            </p>
          </div>
          <div className="benefitsTabAnim3">
            <div className="benefitsTabAnimation3">
              <Lottie animationData={animationData7} />
            </div>

            <p className="benefitsTabText">
              Access downloadable study materials and supplementary curriculum
              to enhance your learning experience and expand your knowledge
              base.
            </p>
          </div>
        </div>
        {/* !!!thirdrow */}
        <div className="benefitsTabRow1">
          <div className="benefitsTabAnim2">
            <div className="benefitsTabAnimationhackerthon">
              <Lottie animationData={animationData8} />
            </div>
            <p className="benefitsTabText">
              Participate in our collaborative hackathons sponsored by various
              partners, where you can win prizes and gain valuable learning
              experiences.
            </p>
          </div>
          <div className="benefitsTabAnim3">
            <div className="benefitsTabAnimation3">
              <Lottie animationData={animationData4} />
            </div>

            <p className="benefitsTabText">
              Explore a plethora of free online courses available to enhance
              your skills and broaden your knowledge base.
            </p>
          </div>
        </div>
        {/* forthROW!!!!! */}
        <div className="benefitsTabRow1">
          <div className="benefitsTabAnim2">
            <div className="benefitsTabAnimationGamesanimation">
              <Lottie animationData={animationData5} />
            </div>
            <p className="benefitsTabText">
              Engage in competitive online gaming tournaments to showcase your
              skills and compete for exciting prizes.
            </p>
          </div>
          <div className="benefitsTabAnim3">
            <div className="benefitsTabAnimation3 benefitsTabAnimation3last">
              <Lottie animationData={animationData9} />
            </div>

            <p className="benefitsTabText benefitsTabTextlast">
              Stay connected and updated with UNISA and global technology on our
              blog for the latest insights and updates in the tech world.
            </p>
          </div>
        </div>
        {/* !!!thirdrow */}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
