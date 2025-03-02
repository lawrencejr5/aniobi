import React from "react";

import { FaEye, FaLock, FaUser, FaUserCircle, FaTimes } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

import { useGlobalContext } from "../..//Global";

interface ModalProps {
  page: string;
  open: boolean;
}

const ModalEdit: React.FC<ModalProps> = ({ page, open }) => {
  const { setModalEditOpen }: any = useGlobalContext();

  return (
    <div className={`modal-container ${!open && "hide"}`}>
      {page === "user" ? (
        <form>
          <div className="head">
            <h3>Edit User Details</h3>
            <FaTimes className="icon" onClick={() => setModalEditOpen(false)} />
          </div>
          <div className="inp-holder">
            <FaUserCircle className="icon" />
            <input type="text" placeholder="Admin username" />
          </div>
          <div className="inp-holder">
            <FaLock className="icon" />
            <input type="password" placeholder="Admin password" />
            <FaEye className="icon" />
          </div>
          <button>Save changes</button>
        </form>
      ) : (
        <form>
          <div className="head">
            <h3>Edit Message</h3>
            <FaTimes className="icon" onClick={() => setModalEditOpen(false)} />
          </div>
          <div className="inp-holder">
            <FaMessage className="icon" />
            <input type="text" placeholder="Message..." />
          </div>
          <button>Save changes</button>
        </form>
      )}
    </div>
  );
};

export default ModalEdit;
