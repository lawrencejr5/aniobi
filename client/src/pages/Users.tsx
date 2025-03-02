import React from "react";
import {
  FaChevronRight,
  FaRegTrashAlt,
  FaPencilAlt,
  FaArrowUp,
} from "react-icons/fa";
import Nav from "../components/Nav.tsx";
import Notification from "../components/Notification.tsx";

import ModalCrt from "../components/Modals/ModalCrt.tsx";
import ModalDel from "../components/Modals/ModalDel.tsx";
import ModalEdit from "../components/Modals/ModalEdit.tsx";

import { useGlobalContext } from "../Global.tsx";

import { users } from "../data/users.tsx";
import { FiEdit } from "react-icons/fi";

const Users = () => {
  const { notification }: any = useGlobalContext();

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
              {/* <th>Date Joined</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{user.username}</td>
                {/* <td>{user.dateJoined}</td> */}
                <td
                  id="actns"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <FiEdit />
                  <FaRegTrashAlt />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <ModalCrt page="user" /> */}
      {/* <ModalDel page="user" /> */}
      {/* <ModalEdit page="user" /> */}
      <Notification notification={notification} />
    </main>
  );
};

export default Users;
