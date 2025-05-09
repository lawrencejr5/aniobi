import React from "react";
import { BsChatText } from "react-icons/bs";

import Nav from "../components/Nav";

import { useGlobalContext, ContextAppType } from "../Global";

import Footer2 from "../components/Footer2";
import CommentCount from "../components/CommentCount";
import ModalComment from "../components/Modals/ModalComment";
import MsgNav from "../components/MsgNav";
import LikeComponent from "../components/LikeComponent";

const SentMessages = () => {
  const {
    signedIn,
    userSentMessages,
    messages,
    getUserSentMessages,
    messageLoading,
    commentModalOpen,
    setCommentModalOpen,
    setSelectedMessage,
  } = useGlobalContext() as ContextAppType;

  React.useEffect(() => {
    if (signedIn?._id) {
      getUserSentMessages(signedIn._id);
    }
  }, [signedIn, messages]);

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
          <h1>Sent Messages...</h1>
          {signedIn?._id && <MsgNav />}

          <div className="msg-card-container">
            {messageLoading ? (
              <p className="msg-loading-text">
                Fetching ur messages, please wait...
              </p>
            ) : userSentMessages.length > 0 ? (
              userSentMessages?.map((msg) => {
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
            ) : (
              <div className="empty">
                <img src="/illustrations/148-No-Result-Found.svg" alt="" />
                <p>You haven't sent any meassages yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <ModalComment open={commentModalOpen} msg={null} />

      <Footer2 />
    </main>
  );
};

export default SentMessages;
