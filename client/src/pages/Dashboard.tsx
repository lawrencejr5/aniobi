import React, { useState } from "react";
import Nav from "../components/Nav";
import { useGlobalContext, ContextAppType } from "../Global";

const Dashboard: React.FC = () => {
  const { messages, signedIn } = useGlobalContext() as ContextAppType;
  const [copySuccess, setCopySuccess] = useState("");

  // Replace logic as needed.
  const aniobiLink = `https://aniobi.com/${
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
        <h2>Share Your Aniobi Link</h2>
        <div className="link-container">
          <input type="text" readOnly value={aniobiLink} />
          <button onClick={copyToClipboard}>Copy Link</button>
        </div>
        {copySuccess && <p>{copySuccess}</p>}
      </section>
      <section className="messages-section">
        <h2>Your Anonymous Messages</h2>
        {messages && messages.length > 0 ? (
          <ul>
            {messages.map((msg, index) => (
              <li key={index}>{"msg.text"}</li>
            ))}
          </ul>
        ) : (
          <p>No messages yet.</p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
