import React, { useState } from "react";

import { useSearchParams } from "react-router-dom";
import Nav from "../components/Nav.tsx";
import Notification from "../components/Notification.tsx";
import ChatBox from "../components/ChatBox.tsx";
import { useGlobalContext, ContextAppType } from "../Global.tsx";

const Send = () => {
  const { notification }: any = useGlobalContext();
  const { signedIn } = useGlobalContext() as ContextAppType;

  const [searchParams] = useSearchParams();
  const user = searchParams.get("user");

  return (
    <div className="home-container send-container">
      <Nav page={"send"} />
      <section className="container">
        <div className="share-link-section">
          <div className="user-container">
            <h2>Send an anonymous message to... </h2>
            <img src="/avatars/avatar1.jpg" alt="" />
            <h3>@{user}</h3>
          </div>
        </div>
        <div className="chat-container">
          <ChatBox />
        </div>
      </section>

      <Notification notification={notification} />
    </div>
  );
};

export default Send;
