import React, { useState } from "react";
import { FaEye, FaLock, FaUserCircle, FaTimes } from "react-icons/fa";
import { useGlobalContext, ContextAppType } from "../../Global.tsx";

interface ModalCrtProps {
  page: string;
  open: boolean;
}

const ModalCrt: React.FC<ModalCrtProps> = ({ page, open }) => {
  const { writeMessage, setModalCrtOpen, setNotification } =
    useGlobalContext() as ContextAppType;
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim().length === 0) {
      setNotification({
        text: "Message cannot be empty",
        status: true,
        theme: "danger",
      });
      return;
    }
    try {
      await writeMessage(message);
      setNotification({
        text: "Message created successfully",
        status: true,
        theme: "success",
      });
      setMessage("");
      setModalCrtOpen(false);
    } catch (err) {
      console.log(err);
      // Optionally handle errors here
    }
  };

  if (!open) return null;

  return (
    <div className="modal-container">
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
        <form onSubmit={handleSubmit}>
          <div className="head">
            <h3>Create New Message</h3>
            <FaTimes className="icon" onClick={() => setModalCrtOpen(false)} />
          </div>
          <div className="inp-holder">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
            />
          </div>
          <button type="submit">Send Message</button>
        </form>
      )}
    </div>
  );
};

export default ModalCrt;
