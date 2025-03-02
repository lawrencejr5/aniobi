import React from "react";
import { FaPlus, FaPlusCircle, FaRegTrashAlt } from "react-icons/fa";
import Nav from "../components/Nav.tsx";
import Notification from "../components/Notification.tsx";

import ModalCrt from "../components/Modals/ModalCrt.tsx";
import ModalDel from "../components/Modals/ModalDel.tsx";
import ModalEdit from "../components/Modals/ModalEdit.tsx";

import { useGlobalContext } from "../Global.tsx";

import { users } from "../data/users.tsx";
import { FiEdit } from "react-icons/fi";

const Users = () => {
  const {
    notification,
    setModalDelOpen,
    modalDelOpen,
    setModalEditOpen,
    modalEditOpen,
    setModalCrtOpen,
    modalCrtOpen,
  }: any = useGlobalContext();

  return (
    <main className="admin-main">
      <Nav page={"users"} />
      <h2>Welcome Admin Cynthia😎</h2>

      <div className="table-container">
        <h1>Users</h1>

        <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Username</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{user?.username}</td>
                <td>{user?.role}</td>
                <td
                  id="actns"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <button onClick={() => setModalEditOpen(true)}>
                    <FiEdit />
                  </button>
                  <button onClick={() => setModalDelOpen(true)}>
                    <FaRegTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
