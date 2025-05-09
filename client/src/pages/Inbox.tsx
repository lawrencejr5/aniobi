import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { FaRegTrashAlt, FaPlus, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import { FiEdit, FiCopy, FiCheckCircle } from "react-icons/fi";

import Nav from "../components/Nav.tsx";
import Footer from "../components/Footer.tsx";
import Notification from "../components/Notification.tsx";

import ModalCrt from "../components/Modals/ModalCrt.tsx";
import ModalDel from "../components/Modals/ModalDel.tsx";
import ModalEdit from "../components/Modals/ModalEdit.tsx";

import { useGlobalContext, ContextAppType } from "../Global.tsx";

import { LocalStorage } from "../enums.tsx";

import { MessageType, AdminType } from "../types.tsx";

const Inbox = () => {
  const {
    allMessages,
    getAllMessages,
    updateShowMessage,
    notification,
    setModalDelOpen,
    modalDelOpen,
    setModalEditOpen,
    modalEditOpen,
    modalCrtOpen,
    setModalCrtOpen,
    setSelectedMessage,
    setNotification,
    signedIn,
    logout,
    formatTime,
  } = useGlobalContext() as ContextAppType;

  const admin: AdminType = LocalStorage?.admin
    ? JSON.parse(LocalStorage.admin)
    : {};
  const user = signedIn?.username;

  useEffect(() => {
    getAllMessages();
  }, [allMessages]);

  // Function to copy text to clipboard and show notification.
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setNotification({
        text: "Message copied to clipboard",
        status: true,
        theme: "success",
      });
    });
  };

  // Function to show message
  const handleShowMessage = async (id: string, type: string) => {
    try {
      await updateShowMessage(id, type);
      if (type === "false") {
        setNotification({
          text: "This message is now hidden",
          status: true,
          theme: "success",
        });
      } else {
        setNotification({
          text: "This message is now visible",
          status: true,
          theme: "success",
        });
      }
    } catch (err) {
      console.log(err);
      setNotification({
        text: "Error showing message",
        status: true,
        theme: "danger",
      });
    }
  };

  return (
    <main className="admin-main">
      <Nav page={"inbox"} />
      <h2>
        Welcome Admin {user}😎{" "}
        <Link className="link" to={"/admin/users"}>
          Users
        </Link>
      </h2>
      <div className="table-container">
        <h1>Messages sent to Aniobi</h1>
        <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>User</th>
              <th>Message</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allMessages?.map((msg: MessageType, i: number) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td id="id">usr{(msg?._id).slice(0, 16)}</td>
                  <td id="msg">{msg?.message}</td>
                  <td id="msg">{formatTime(msg?.createdAt)}</td>
                  <td
                    id="actns"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {msg?.show ? (
                      <button
                        onClick={() => {
                          handleShowMessage(msg?._id, "false");
                        }}
                      >
                        <FaEye />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          handleShowMessage(msg?._id, "true");
                        }}
                      >
                        <FaEyeSlash />
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setSelectedMessage(msg);
                        setModalEditOpen(true);
                      }}
                    >
                      <FiEdit />
                    </button>

                    <button
                      onClick={() => {
                        setSelectedMessage(msg);
                        setModalDelOpen(true);
                      }}
                    >
                      <FaRegTrashAlt />
                    </button>
                    <button onClick={() => handleCopy(msg?.message)}>
                      <FiCopy />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Footer />
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
