import React, { useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaLock,
  FaUserCircle,
  FaTimes,
} from "react-icons/fa";
import { useGlobalContext, ContextAppType } from "../../Global.tsx";

interface ModalCrtProps {
  page: string;
  open: boolean;
}

const ModalCrt: React.FC<ModalCrtProps> = ({ page, open }) => {
  const { writeMessage, setModalCrtOpen, setNotification, createAdmin } =
    useGlobalContext() as ContextAppType;
  const [message, setMessage] = useState<string>("");
  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleMsgSubmit = async (e: React.FormEvent) => {
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
      await writeMessage(message, from, to);
      setNotification({
        text: "Message created successfully",
        status: true,
        theme: "success",
      });
      setMessage("");
      setModalCrtOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAdmin({ username, password });
      setNotification({
        text: "New Admin created successfully",
        status: true,
        theme: "success",
      });
      setUsername("");
      setPassword("");
      setModalCrtOpen(false);
    } catch (err: any) {
      console.log(err);
      setNotification({
        text: err?.response?.data?.msg || "Error creating new admin",
        status: true,
        theme: "success",
      });
    }
  };

  if (!open) return null;

  return (
    <div className="modal-container">
      {page === "user" ? (
        <form onSubmit={handleAdminSubmit}>
          <div className="head">
            <h3>Create new user</h3>
            <FaTimes className="icon" onClick={() => setModalCrtOpen(false)} />
          </div>
          <div className="inp-holder">
            <FaUserCircle className="icon" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Admin username"
            />
          </div>
          <div className="inp-holder">
            <FaLock className="icon" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
            />
            {showPassword ? (
              <FaEyeSlash
                className="icon"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FaEye className="icon" onClick={() => setShowPassword(true)} />
            )}
          </div>
          <button>Create</button>
        </form>
      ) : (
        <form onSubmit={handleMsgSubmit}>
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
