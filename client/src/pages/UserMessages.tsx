import React from "react";
import { Link } from "react-router-dom";
import { BsHeart } from "react-icons/bs";

import Nav from "../components/Nav";

import { useGlobalContext, ContextAppType } from "../Global";
import Footer2 from "../components/Footer2";

const UserMessages = () => {
  const { signedIn, userMessages, getUserMessages } =
    useGlobalContext() as ContextAppType;

  React.useEffect(() => {
    if (signedIn?._id) {
      getUserMessages(signedIn._id);
    }
  }, [signedIn, getUserMessages]);

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
          <h1>My Messages...</h1>
          <div className="msg-nav">
            <Link className="link" to={"/messages"}>
              For you
            </Link>
            <Link className="link active" to={`/messages/${signedIn?._id}`}>
              Personal
            </Link>
          </div>
          <div className="msg-card-container">
            {userMessages && userMessages.length > 0 ? (
              userMessages.map((msg) => (
                <div key={msg._id} className="msg-card">
                  <small>@anonymous</small>
                  <p>{msg.message}</p>
                  <div className="actions">
                    <small>0 comment(s)</small>
                    &nbsp; &nbsp;
                    <div>
                      <BsHeart className="heart-icon" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty">
                <img src="/illustrations/148-No-Result-Found.svg" alt="" />
                <p>
                  You don't have any messages yet,{" "}
                  <Link className="link" to={"/dashboard"}>
                    copy link
                  </Link>{" "}
                  to get messages...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer2 />
    </main>
  );
};

export default UserMessages;
