import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { BsHeart, BsHeartFill, BsChatText } from "react-icons/bs";

import Nav from "../components/Nav";

import { useGlobalContext, ContextAppType } from "../Global";
import Footer2 from "../components/Footer2";
import ModalComment from "../components/Modals/ModalComment";

import CommentCount from "../components/CommentCount";

const LikeComponent: React.FC<{ msgId: string }> = ({ msgId }) => {
  const { toggleLikeMessage, checkLiked, signedIn } =
    useGlobalContext() as ContextAppType;

  const [liked, setLiked] = useState<boolean>(false);
  const [animating, setAnimating] = useState<boolean>(false);

  useEffect(() => {
    const checkVal = async () => {
      const val = await checkLiked(msgId);
      setLiked(val as boolean);
    };
    checkVal();
  }, [checkLiked, msgId]);

  const likeMessage = async (): Promise<void> => {
    try {
      if (signedIn?._id) await toggleLikeMessage(signedIn._id, msgId);
      setLiked((prev) => !prev);
      setAnimating(true);
      // Remove the animation class after 500ms (duration of animation)
      setTimeout(() => setAnimating(false), 1000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div onClick={likeMessage}>
      {liked ? (
        <BsHeartFill className={`heart-icon ${animating ? "pop" : ""}`} />
      ) : (
        <BsHeart className={`heart-icon ${animating ? "pop" : ""}`} />
      )}
    </div>
  );
};

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
                      <LikeComponent msgId={msg._id} />
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
