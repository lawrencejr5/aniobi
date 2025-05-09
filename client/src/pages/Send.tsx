import React, { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";
import Nav from "../components/Nav.tsx";
import Notification from "../components/Notification.tsx";
import ChatBox from "../components/ChatBox.tsx";
import Footer2 from "../components/Footer2.tsx";

import { useGlobalContext, ContextAppType } from "../Global.tsx";

const Send = () => {
  const { notification, getUser, user }: any = useGlobalContext();
  const { signedIn } = useGlobalContext() as ContextAppType;

  const [searchParams] = useSearchParams();
  const userId = searchParams.get("user");

  useEffect(() => {
    if (userId) getUser(userId);
  }, []);

  return (
    <div className="home-container send-container">
      <Nav page={"send"} />
      <section className="container">
        <div className="share-link-section">
          <div className="user-container">
            <h2>Send an anonymous message to... </h2>
            <img src="/avatars/avatar3.avif" alt="" />
            <h3>@{user?.username}</h3>
          </div>
        </div>
        <div className="chat-container">
          <ChatBox from={signedIn?._id} to={user?._id} />
        </div>
      </section>
      <Footer2 />
      <Notification notification={notification} />
    </div>
  );
};

export default Send;
