import React, { useState } from "react";
import Nav from "../components/Nav";
import { useGlobalContext, ContextAppType } from "../Global";
import { Link } from "react-router-dom";
import { FaMessage, FaUser } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";
import { LuMessageSquareMore } from "react-icons/lu";
import { FaPowerOff } from "react-icons/fa";
import Footer2 from "../components/Footer2";

const Dashboard: React.FC = () => {
  const { messages, signedIn, logout } = useGlobalContext() as ContextAppType;
  const [copySuccess, setCopySuccess] = useState("");

  const aniobiLink = `http://localhost:3000/send/?user=${
    signedIn ? signedIn._id || "your-anon-profile" : "your-anon-profile"
  }`;
  // const aniobiLink = `https://test-aniobi.web.app/send/?user=${
  //   signedIn ? signedIn._id || "your-anon-profile" : "your-anon-profile"
  // }`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(aniobiLink);
      setCopySuccess("Link copied!");
      setTimeout(() => setCopySuccess(""), 2000);
    } catch (err) {
      setCopySuccess("Failed to copy!");
    }
  };

  return (
    <div className="dashboard-container">
      <Nav page="dashboard" />
      <section className="share-link-section">
        <nav>
          <Link className="link" to={`/messages/received/${signedIn?._id}`}>
            My Messages
          </Link>
          <div onClick={logout} className="link">
            Logout &nbsp;
            <FaPowerOff />
          </div>
        </nav>
        <div className="container">
          <h2>Share Your Aniobi Link</h2>
          <img src="/avatars/avatar3.avif" alt="" />
          <h3>@{signedIn?.username}</h3>
          <div className="inp-holder">
            <input type="text" readOnly value={aniobiLink} />
            <button onClick={copyToClipboard}>
              {copySuccess ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      </section>
      <Footer2 />
    </div>
  );
};

export default Dashboard;
