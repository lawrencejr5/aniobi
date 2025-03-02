import React from "react";
import { FaTimes } from "react-icons/fa";

import { useGlobalContext } from "../../Global";

interface ModalProps {
  page: string;
  open: boolean;
}

const ModalDel: React.FC<ModalProps> = ({ page, open }) => {
  const { setModalDelOpen }: any = useGlobalContext();

  return (
    <div className={`modal-container delete ${!open && "hide"}`}>
      <form>
        <div className="head">
          <h3>Delete prompt</h3>
          <FaTimes className="icon" onClick={() => setModalDelOpen(false)} />
        </div>
        {page === "user" ? (
          <p>Are u sure u wanna delete this user?</p>
        ) : (
          <p>Are u sure u wanna delete this message?</p>
        )}

        <div className="btn-holder">
          <button id="true">Delete</button>
          <button
            id="false"
            type="button"
            onClick={() => setModalDelOpen(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalDel;
