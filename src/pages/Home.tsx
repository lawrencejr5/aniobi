import React from "react";

import Nav from "../components/Nav.tsx";
import ChatBox from "../components/ChatBox.tsx";
import { FaInstagram } from "react-icons/fa";

const Home = () => {
  return (
    <div className="home-container">
      <Nav />
      <section className="container">
        <div className="banner">
          <p>Message aniobi anonymously</p>
          <div className="follow">
            <span>
              <FaInstagram />
              &nbsp;&nbsp;
              <a href="https://instagram.com/_aniobi">Follow us on instagram</a>
            </span>
          </div>
        </div>
        <ChatBox />
      </section>
    </div>
  );
};

export default Home;
