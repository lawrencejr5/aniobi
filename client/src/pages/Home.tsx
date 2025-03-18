import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

import Nav from "../components/Nav.tsx";
import Notification from "../components/Notification.tsx";
import ChatBox from "../components/ChatBox.tsx";
import { useGlobalContext } from "../Global.tsx";

import { txts } from "../data/txt";

// @ts-ignore
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../chevron-animation.json";

const Home = () => {
  const { notification }: any = useGlobalContext();

  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % txts.length);
    }, 10000); // Change message every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <Nav page={"home"} />
      <section className="container">
        <div className="banner">
          <p>"{txts[index]}</p>
          <div className="follow">
            <span>
              <a
                href="https://www.instagram.com/_aniobi_/profilecard/"
                target="_blank"
              >
                {" "}
                <FaInstagram />
              </a>
            </span>
            <span>
              <a
                href="https://www.instagram.com/_aniobi_/profilecard/"
                target="_blank"
              >
                {" "}
                <FaTwitter />
              </a>
            </span>
            <span>
              <a
                href="https://www.instagram.com/_aniobi_/profilecard/"
                target="_blank"
              >
                {" "}
                <FaFacebook />
              </a>
            </span>
          </div>
          <button
            className="chevron-btn"
            onClick={() => {
              const nextSection = document.getElementById("next");
              if (nextSection) {
                nextSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <Player
              autoplay
              loop
              src={animationData}
              style={{ height: "150px", width: "150px" }}
            />
          </button>
        </div>
        <ChatBox />
      </section>
      <section className="mission-container" id="next">
        <div className="mission">
          <h2>Our Mission</h2>
          <p>
            We believe that sharing our secrets is an act of courage, not
            weakness. We are here to listen, not judge. Your secrets can't heal
            you but sharing them can. Your story inspires others, share it.
            Heavy hearts find light in shared words. Unspoken words can become
            toxic to your heart.
          </p>
        </div>
        <div className="aim">
          <h2>Our Aim</h2>
          <p>
            We aim to provide a safe space for you to share your secrets
            anonymously. We believe that sharing your secrets can be a form of
            therapy. We are here to listen and support you.
          </p>
        </div>
      </section>
      <Notification notification={notification} />
    </div>
  );
};

export default Home;
