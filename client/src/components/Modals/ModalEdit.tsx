import React, { useState, useEffect } from "react";
import {
  FaTimes,
  FaUserCircle,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useGlobalContext, ContextAppType } from "../../Global.tsx";

interface ModalEditProps {
  page: string;
  open: boolean;
}

const ModalEdit: React.FC<ModalEditProps> = ({ page, open }) => {
  const {
    updateMessage,
    selectedMessage,
    setModalEditOpen,
    setNotification,
    getMessages,
    updateAdmin,
    selectedAdmin,
    fetchAdminUsers,
  } = useGlobalContext() as ContextAppType;
  const [editedMessage, setEditedMessage] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Preload message into state if available
  useEffect(() => {
    if (selectedMessage && selectedMessage.message) {
      setEditedMessage(selectedMessage.message);
    }
  }, [selectedMessage]);

  useEffect(() => {
    if (selectedAdmin && selectedAdmin.username) {
      setUsername(selectedAdmin?.username);
    }
  }, [selectedAdmin]);

  // Function for updating a message
  const handleMsgUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMessage || !selectedMessage._id) {
      setNotification({
        text: "No message selected",
        status: true,
        theme: "danger",
      });
      return;
    }
    if (editedMessage.trim().length === 0) {
      setNotification({
        text: "Message cannot be empty",
        status: true,
        theme: "danger",
      });
      return;
    }
    try {
      setIsUpdating(true);
      await updateMessage(selectedMessage._id, editedMessage);
      setNotification({
        text: "Message updated successfully",
        status: true,
        theme: "success",
      });
      setModalEditOpen(false);
      getMessages();
    } catch (err) {
      console.log(err);
      setNotification({
        text: "Error updating message",
        status: true,
        theme: "danger",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Function for updating admin details
  const handleAdminUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().length === 0) {
      setNotification({
        text: "Username and password cannot be empty",
        status: true,
        theme: "danger",
      });
      return;
    }
    try {
      setIsUpdating(true);
      // Use selectedAdmin if available; otherwise, pass an empty string.
      await updateAdmin(selectedAdmin?._id || "", { username, password });
      setNotification({
        text: "Admin updated successfully",
        status: true,
        theme: "success",
      });
      setModalEditOpen(false);
      fetchAdminUsers();
    } catch (err) {
      console.log(err);
      setNotification({
        text: "Error updating admin",
        status: true,
        theme: "danger",
      });
    } finally {
      setIsUpdating(false);
      setUsername("");
      setPassword("");
    }
  };

  if (!open) return null;

  return (
    <div className="modal-container">
      {page === "user" ? (
        <form onSubmit={handleAdminUpdate}>
          <div className="head">
            <h3>Update Admin</h3>
            <FaTimes className="icon" onClick={() => setModalEditOpen(false)} />
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
          <button type="submit" disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update Admin"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleMsgUpdate}>
          <div className="head">
            <h3>Edit Message</h3>
            <FaTimes className="icon" onClick={() => setModalEditOpen(false)} />
          </div>
          <div className="inp-holder">
            <input
              type="text"
              value={editedMessage}
              onChange={(e) => setEditedMessage(e.target.value)}
              placeholder="Edit your message here..."
            />
          </div>
          <button
            type="submit"
            disabled={isUpdating}
            style={
              isUpdating
                ? { backgroundColor: "gray", cursor: "not-allowed" }
                : {}
            }
          >
            {isUpdating ? "Updating..." : "Update Message"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ModalEdit;
