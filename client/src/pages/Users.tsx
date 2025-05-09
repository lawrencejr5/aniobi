import React from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaPlusCircle, FaRegTrashAlt } from "react-icons/fa";

import Nav from "../components/Nav.tsx";
import Footer from "../components/Footer.tsx";
import Notification from "../components/Notification.tsx";

import ModalCrt from "../components/Modals/ModalCrt.tsx";
import ModalDel from "../components/Modals/ModalDel.tsx";
import ModalEdit from "../components/Modals/ModalEdit.tsx";

import { useGlobalContext } from "../Global.tsx";

import { FiEdit } from "react-icons/fi";

import { LocalStorage } from "../enums.tsx";

import { AdminType } from "../types.tsx";

const Users = () => {
  const {
    notification,
    setModalDelOpen,
    modalDelOpen,
    setModalEditOpen,
    modalEditOpen,
    setModalCrtOpen,
    modalCrtOpen,
    adminUsers,
    setSelectedAdmin,
    signedIn,
  }: any = useGlobalContext();

  const user = signedIn?.username;

  return (
    <main className="admin-main">
      <Nav page={"users"} />
      <h2>
        Welcome Admin {user}😎{" "}
        <Link className="link" to={"/admin/inbox"}>
          Messages
        </Link>
      </h2>

      <div className="table-container">
        <h1>Users</h1>

        <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Username</th>
              <th>Date Created</th>
              <th>Last Modified</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {adminUsers.map((user: AdminType, i: number) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  {user?.username}
                  {user?.role === "super" && "(primary)"}
                </td>
                <td>{user?.createdAt}</td>
                <td>{user?.updatedAt}</td>
                <td
                  id="actns"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <button
                    onClick={() => {
                      setModalEditOpen(true);
                      setSelectedAdmin(user);
                    }}
                  >
                    <FiEdit />
                  </button>
                  {user?.role !== "super" && (
                    <button
                      onClick={() => {
                        setModalDelOpen(true);
                        setSelectedAdmin(user);
                      }}
                    >
                      <FaRegTrashAlt />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <Footer /> */}
      <div className="create-btn" onClick={() => setModalCrtOpen(true)}>
        <FaPlus />
      </div>
      <ModalCrt page="user" open={modalCrtOpen} />
      <ModalDel page="user" open={modalDelOpen} />
      <ModalEdit page="user" open={modalEditOpen} />
      <Notification notification={notification} />
    </main>
  );
};

export default Users;
