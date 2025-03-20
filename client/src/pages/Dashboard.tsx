import React, { useState } from "react";
import Nav from "../components/Nav";
import { useGlobalContext, ContextAppType } from "../Global";
import { Link } from "react-router-dom";
import { FaMessage, FaUser } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";
import { LuMessageSquareMore } from "react-icons/lu";

const Dashboard: React.FC = () => {
  const { messages, signedIn } = useGlobalContext() as ContextAppType;
  const [copySuccess, setCopySuccess] = useState("");

  const aniobiLink = `http://localhost:3000/send/?user=${
    signedIn ? signedIn.username || "your-anon-profile" : "your-anon-profile"
  }`;

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
          <Link className="link" to="/messages">
            My Messages
            {/* <div className="line"></div> */}
          </Link>
          <div className="vl"></div>
          <Link className="link" to="/send">
            Other users
            {/* <div className="line"></div> */}
          </Link>
        </nav>
        <div className="container">
          <h2>Share Your Aniobi Link</h2>
          <img src="/avatars/avatar1.jpg" alt="" />
          <h3>@{signedIn?.username}</h3>
          <div className="inp-holder">
            <input type="text" readOnly value={aniobiLink} />
            <button onClick={copyToClipboard}>
              {copySuccess ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
