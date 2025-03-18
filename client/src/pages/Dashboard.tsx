import React, { useState } from "react";
import Nav from "../components/Nav";
import { useGlobalContext, ContextAppType } from "../Global";

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
        <div className="container">
          <h2>Share Your Aniobi Link</h2>
          <img src="/avatars/avatar1.jpg" alt="" />
          <h3>@{signedIn?.username}</h3>
          <div className="inp-holder">
            <input type="text" readOnly value={aniobiLink} />
            <button onClick={copyToClipboard}>Copy Link</button>
          </div>
          {copySuccess && <p>{copySuccess}</p>}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
