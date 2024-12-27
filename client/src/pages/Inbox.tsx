import React, { useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";

import Nav from "../components/Nav.tsx";
import InBox from "../components/Inbox.tsx";
import Notification from "../components/Notification.tsx";

import { useGlobalContext } from "../Global.tsx";

import { MessageType } from "../types.tsx";

const Inbox = () => {
  const { messages, getMessages, notification }: any = useGlobalContext();
  useEffect(() => {
    getMessages();
  }, [messages]);
  return (
    <main className="inbox-main">
      <Nav />
      <h2>
        Admin &nbsp;
        <FaChevronRight />
        &nbsp; Messages
      </h2>
      <div className="inbox-container">
        {messages.map((msg: MessageType, i: number) => {
          return (
            <InBox
              key={i}
              id={msg._id}
              message={msg.message}
              createdAt={msg.createdAt}
            />
          );
        })}
      </div>
      <Notification notification={notification} />
    </main>
  );
};

export default Inbox;
