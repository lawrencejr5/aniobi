import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <main className="about-container">
      <Nav page={"about"} />
      <div className="container">
        <div className="item-container">
          <div className="text">
            <h1>Mission...</h1>
            <p>
              To provide a save anonymous platform for people to share their
              thoughts, feelings and experiences without fear of judgement and
              to facilitate authentic connections and conversations.
            </p>
          </div>
          <img className="float" src="/illustrations/18-Architect.svg" alt="" />
        </div>
        <div className="item-container">
          <img
            className="float"
            src="/illustrations/06-Ambulance-Driver.svg"
            alt=""
          />
          <div className="text">
            <h1>Goal...</h1>
            <p>
              To become a global community where people from on all backgrounds
              can connect, share and support each other, fostering empathy,
              understanding and positive social change.
            </p>
          </div>
        </div>
      </div>
      <footer className="footer-component">
        @Lawjun 2025 &nbsp;.&nbsp;
        <Link to={"/"} className="link">
          Terms and Conditions
        </Link>
      </footer>
    </main>
  );
};

export default About;
