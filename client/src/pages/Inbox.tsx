import React, { useEffect } from "react";
import Nav from "../components/Nav.tsx";
import InBox from "../components/Inbox.tsx";
import { FaChevronRight } from "react-icons/fa";

import { useGlobalContext } from "../Global.tsx";

interface Message {
  _id: string;
  message: string;
  createdAt: string;
}

const Inbox = () => {
  const { messages, getMessages }: any = useGlobalContext();
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
        {messages.map((msg: Message, i: number) => {
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
    </main>
  );
};

export default Inbox;
