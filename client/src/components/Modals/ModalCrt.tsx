import React from "react";

import { FaEye, FaLock, FaUserCircle, FaTimes } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

import { useGlobalContext } from "../../Global";

interface ModalProps {
  page: string;
  open: boolean;
}

const ModalCrt: React.FC<ModalProps> = ({ page, open }) => {
  const { setModalCrtOpen }: any = useGlobalContext();
  return (
    <div className={`modal-container ${!open && "hide"}`}>
      {page === "user" ? (
        <form>
          <div className="head">
            <h3>Create new user</h3>
            <FaTimes className="icon" onClick={() => setModalCrtOpen(false)} />
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
            <FaTimes className="icon" onClick={() => setModalCrtOpen(false)} />
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
