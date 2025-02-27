import React, { useEffect } from "react";

import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

import Nav from "../components/Nav.tsx";
import InBox from "../components/Inbox.tsx";
import Notification from "../components/Notification.tsx";

import ModalCrt from "../components/Modals/ModalCrt.tsx";
import ModalDel from "../components/Modals/ModalDel.tsx";
import ModalEdit from "../components/Modals/ModalEdit.tsx";

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
                      alignItems: "center",
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
      {/* <ModalCrt page="inbox" /> */}
      {/* <ModalDel page="inbox" /> */}
      {/* <ModalEdit page="inbox" /> */}
      <Notification notification={notification} />
    </main>
  );
};

export default Inbox;
