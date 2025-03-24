import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

import Nav from "../components/Nav.tsx";
import Notification from "../components/Notification.tsx";
import ChatBox from "../components/ChatBox.tsx";
import Typewriter from "../components/Typewriter";
import { useGlobalContext } from "../Global.tsx";

import { txts } from "../data/txt";
import Footer2 from "../components/Footer2.tsx";

const Home = () => {
  const { notification, signedIn }: any = useGlobalContext();

  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % txts.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <Nav page={"home"} />
      <section className="container">
        <div className="banner">
          <Typewriter text={`~${txts[index]}`} speed={20} />
          <div className="follow">
            <span>
              <a href="https://www.instagram.com/_aniobi_/" target="_blank">
                {" "}
                <FaInstagram />
              </a>
            </span>
            <span>
              <a href="https://www.facebook.com/_aniobi_/" target="_blank">
                {" "}
                <FaTwitter />
              </a>
            </span>
            <span>
              <a href="https://www.x.com/_aniobi_/" target="_blank">
                {" "}
                <FaFacebook />
              </a>
            </span>
          </div>
        </div>
        <ChatBox from={signedIn?._id ? signedIn?._id : null} to={null} />
      </section>
      <Footer2 />
      <Notification notification={notification} />
    </div>
  );
};

export default Home;
