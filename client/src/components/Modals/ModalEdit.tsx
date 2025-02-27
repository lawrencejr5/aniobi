import React from "react";

import { FaEye, FaLock, FaUser, FaUserCircle, FaTimes } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

interface ModalProps {
  page: string;
}

const ModalEdit: React.FC<ModalProps> = ({ page }) => {
  return (
    <div className="modal-container">
      {page === "user" ? (
        <form>
          <div className="head">
            <h3>Edit User Details</h3>
            <FaTimes className="icon" />
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
            <FaTimes className="icon" />
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
