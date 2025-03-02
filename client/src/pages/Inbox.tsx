import React, { useEffect } from "react";

import { FaRegTrashAlt, FaPlus } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

import Nav from "../components/Nav.tsx";
import Notification from "../components/Notification.tsx";

import ModalCrt from "../components/Modals/ModalCrt.tsx";
import ModalDel from "../components/Modals/ModalDel.tsx";
import ModalEdit from "../components/Modals/ModalEdit.tsx";

import { useGlobalContext } from "../Global.tsx";

import { MessageType } from "../types.tsx";

const Inbox = () => {
  const {
    messages,
    getMessages,
    notification,
    setModalDelOpen,
    modalDelOpen,
    setModalEditOpen,
    modalEditOpen,
    modalCrtOpen,
    setModalCrtOpen,
  }: any = useGlobalContext();

  useEffect(() => {
    getMessages();
  }, [messages]);

  return (
    <main className="admin-main">
      <Nav page={"inbox"} />
      <h2>Welcome Admin Cynthia😎</h2>
      <div className="table-container">
        <h1>Messages</h1>

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
            {messages.map((msg: MessageType, i: number) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td id="id">msg{(msg?._id).slice(0, 16)}</td>
                  <td id="msg">{msg?.message}</td>
                  <td
                    id="actns"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <button onClick={() => setModalEditOpen(true)}>
                      <FiEdit />
                    </button>
                    <button>
                      <MdOutlineFileUpload />
                    </button>
                    <button onClick={() => setModalDelOpen(true)}>
                      <FaRegTrashAlt />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="create-btn" onClick={() => setModalCrtOpen(true)}>
        <FaPlus />
      </div>
      <ModalCrt page="inbox" open={modalCrtOpen} />
      <ModalDel page="inbox" open={modalDelOpen} />
      <ModalEdit page="inbox" open={modalEditOpen} />
      <Notification notification={notification} />
    </main>
  );
};

export default Inbox;
