import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { BsHeart, BsHeartFill, BsChatText } from "react-icons/bs";

import Nav from "../components/Nav";

import { useGlobalContext, ContextAppType } from "../Global";
import Footer2 from "../components/Footer2";
import ModalComment from "../components/Modals/ModalComment";

import CommentCount from "../components/CommentCount";

const Messages = () => {
  const {
    messages,
    getMessages,
    signedIn,
    commentModalOpen,
    setCommentModalOpen,
    setSelectedMessage,
    messageLoading,
  } = useGlobalContext() as ContextAppType;

  useEffect(() => {
    getMessages();
  }, []);

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
            {messageLoading ? (
              <p className="msg-loading-text">
                Fetching messages, please wait...
              </p>
            ) : (
              messages?.map((msg) => {
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
                        {msg?._id ? (
                          <CommentCount messageId={msg._id} />
                        ) : (
                          <BsChatText className="comment-icon" />
                        )}
                      </small>
                      &nbsp; &nbsp;
                      <div>
                        <BsHeart className="heart-icon" />
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      <ModalComment open={commentModalOpen} msg={null} />
      <Footer2 />
    </main>
  );
};

export default Messages;
