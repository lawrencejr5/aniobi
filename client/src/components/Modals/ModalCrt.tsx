import React from "react";

import { FaEye, FaLock, FaUser, FaUserCircle, FaTimes } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

interface ModalProps {
  page: string;
}

const ModalCrt: React.FC<ModalProps> = ({ page }) => {
  return (
    <div className="modal-container">
      {page === "user" ? (
        <form>
          <div className="head">
            <h3>Create new user</h3>
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
          <button>Create</button>
        </form>
      ) : (
        <form>
          <div className="head">
            <h3>Create new message</h3>
            <FaTimes className="icon" />
          </div>
          <div className="inp-holder">
            <FaMessage className="icon" />
            <input type="text" placeholder="Message..." />
          </div>

          <button>Create</button>
        </form>
      )}
    </div>
  );
};

export default ModalCrt;
