import React from "react";
import { Link } from "react-router-dom";

import { BsHeart, BsHeartFill } from "react-icons/bs";

import Nav from "../components/Nav";

import { useGlobalContext, ContextAppType } from "../Global";
import Footer2 from "../components/Footer2";
import ModalComment from "../components/Modals/ModalComment";

const Messages = () => {
  const {
    messages,
    signedIn,
    commentModalOpen,
    setCommentModalOpen,
    setSelectedMessage,
  } = useGlobalContext() as ContextAppType;

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
          {signedIn?._id ? (
            <div className="msg-nav">
              <Link className="link active" to={"/messages"}>
                For you
              </Link>
              <Link className="link" to={`/messages/${signedIn?._id}`}>
                Personal
              </Link>
            </div>
          ) : (
            <div className="msg-nav"></div>
          )}

          <div className="msg-card-container">
            {messages?.map((msg) => {
              return (
                <div key={msg._id} className="msg-card">
                  <small>@anonymous</small>
                  <p>{msg.message}</p>
                  <div className="actions">
                    <small
                      onClick={() => {
                        setCommentModalOpen(true);
                        setSelectedMessage(msg);
                      }}
                    >
                      0 comment(s)
                    </small>
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
      <ModalComment open={commentModalOpen} msg={null} />
      <Footer2 />
    </main>
  );
};

export default Messages;
