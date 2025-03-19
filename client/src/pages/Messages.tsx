import React from "react";
import { Link } from "react-router-dom";

import { BsHeart, BsHeartFill } from "react-icons/bs";

import Nav from "../components/Nav";

import { useGlobalContext, ContextAppType } from "../Global";

const Messages = () => {
  const { messages } = useGlobalContext() as ContextAppType;

  return (
    <main className="messages-container">
      <Nav page={"send"} />

      <div className="container">
        <img
          className="img float"
          src="/illustrations/32-Millenials.svg"
          alt=""
        />

        <div className="all-message-container">
          <h1>Messages...</h1>
          <div className="msg-card-container">
            {messages?.map((msg) => {
              return (
                <div key={msg._id} className="msg-card">
                  <small>@anonymous</small>
                  <p>{msg.message}</p>
                  <div className="actions">
                    <small>45 comment(s)</small>
                    &nbsp; &nbsp;
                    <div>
                      <BsHeart className="heart-icon" />
                    </div>
                  </div>
                </div>
              );
            })}
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

export default Messages;
