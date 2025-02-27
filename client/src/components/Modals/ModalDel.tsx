import React from "react";
import { FaEye, FaLock, FaUser, FaUserCircle, FaTimes } from "react-icons/fa";

interface ModalProps {
  page: string;
}

const ModalDel: React.FC<ModalProps> = ({ page }) => {
  return (
    <div className="modal-container delete">
      <form>
        <div className="head">
          <h3>Delete prompt</h3>
          <FaTimes className="icon" />
        </div>
        {page === "user" ? (
          <p>Are u sure u wanna delete this user?</p>
        ) : (
          <p>Are u sure u wanna delete this message?</p>
        )}

        <div className="btn-holder">
          <button id="true">Delete</button>
          <button id="false">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ModalDel;
