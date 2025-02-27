import React, { useEffect } from "react";

import {
  FaChevronRight,
  FaRegTrashAlt,
  FaPencilAlt,
  FaArrowUp,
} from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

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
              <th>S/N</th>
              <th>Msg-id</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg: any, i: number) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>msg{(msg?._id).slice(0, 16)}</td>
                  <td>{msg?.message}</td>
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      // alignItems: "center",
                    }}
                  >
                    <FaRegTrashAlt />
                    <MdOutlineFileUpload />
                    <FiEdit />
                  </td>
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
