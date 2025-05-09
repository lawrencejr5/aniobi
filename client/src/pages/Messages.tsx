import React, { useEffect } from "react";

import { BsChatText, BsHeart } from "react-icons/bs";

import Nav from "../components/Nav";

import { useGlobalContext, ContextAppType } from "../Global";
import Footer2 from "../components/Footer2";
import ModalComment from "../components/Modals/ModalComment";
import MsgNav from "../components/MsgNav";

import CommentCount from "../components/CommentCount";
import LikeComponent from "../components/LikeComponent";

import Notification from "../components/Notification";

const Messages = () => {
  const {
    messages,
    getMessages,
    signedIn,
    commentModalOpen,
    setCommentModalOpen,
    setSelectedMessage,
    messageLoading,
    setNotification,
    notification,
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
          {signedIn?._id && <MsgNav />}

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
                      {signedIn?._id ? (
                        <LikeComponent msgId={msg._id} />
                      ) : (
                        <BsHeart
                          onClick={() => {
                            setNotification({
                              theme: "success",
                              text: "Signin to like this message",
                              status: true,
                            });
                          }}
                        />
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      <ModalComment open={commentModalOpen} msg={null} />
      <Notification notification={notification} />
      <Footer2 />
    </main>
  );
};

export default Messages;
