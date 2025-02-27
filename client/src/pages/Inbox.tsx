import React, { useEffect } from "react";
import { FaChevronRight, FaTrash, FaPencilAlt, FaArrowUp } from "react-icons/fa";

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
    <main className="admin-main">
      <Nav page={"inbox"} />
      <h2>Welcome Admin Cynthia😎</h2>
      <h1>Messages</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Msg-id</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg: any, i: number) => {
              return (
                <tr key={i}>
                  <td style={{"fontSize": "12px"}}>msg-{(msg?._id).slice(0, 16)}</td>
                  <td>{msg?.message}</td>
                  <td style={{"display": "flex", "justifyContent": "space-between"}}><FaTrash/><FaPencilAlt/><FaArrowUp/></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Notification notification={notification} />
    </main>
  );
};

export default Inbox;
