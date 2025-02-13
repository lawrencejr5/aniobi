import React from "react";
import { FaInstagram } from "react-icons/fa";

import Nav from "../components/Nav.tsx";
import Notification from "../components/Notification.tsx";
import ChatBox from "../components/ChatBox.tsx";
import { useGlobalContext } from "../Global.tsx";

const Home = () => {
  const { notification }: any = useGlobalContext();
  return (
    <div className="home-container">
      <Nav page={"home"} />
      <section className="container">
        <div className="banner">
          <p>Message aniobi anonymously</p>
          <div className="follow">
            <span>
              <FaInstagram />
              &nbsp;&nbsp;
              <a
                href="https://www.instagram.com/_aniobi_/profilecard/"
                target="_blank"
              >
                Follow us on instagram
              </a>
            </span>
          </div>
        </div>
        <ChatBox />
      </section>
      <Notification notification={notification} />
    </div>
  );
};

export default Home;
