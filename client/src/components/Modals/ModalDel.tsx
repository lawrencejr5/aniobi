import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { ContextAppType, useGlobalContext } from "../../Global.tsx";

interface ModalDelProps {
  page: string;
  open: boolean;
}

const ModalDel: React.FC<ModalDelProps> = ({ page, open }) => {
  const {
    deleteMessage,
    selectedMessage,
    setModalDelOpen,
    setNotification,
    getMessages,
    deleteAdmin,
    selectedAdmin,
    fetchAdminUsers,
  } = useGlobalContext() as ContextAppType;

  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleMsgDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMessage || !selectedMessage._id) {
      setNotification({
        text: "No message selected",
        status: true,
        theme: "danger",
      });
      return;
    }
    try {
      setIsDeleting(true);
      await deleteMessage(selectedMessage._id);
      setNotification({
        text: `Message deleted`,
        status: true,
        theme: "success",
      });
      setModalDelOpen(false);
      getMessages();
    } catch (err) {
      console.log(err);
      setNotification({
        text: "Error deleting message",
        status: true,
        theme: "danger",
      });
    } finally {
      setIsDeleting(false);
    }
  };
  const handleAdminDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAdmin || !selectedAdmin._id) {
      setNotification({
        text: "No user selected",
        status: true,
        theme: "danger",
      });
      return;
    }
    try {
      setIsDeleting(true);
      await deleteAdmin(selectedAdmin._id);
      setNotification({
        text: `Admin User deleted`,
        status: true,
        theme: "success",
      });
      setModalDelOpen(false);
      fetchAdminUsers();
    } catch (err) {
      console.log(err);
      setNotification({
        text: "Error deleting message",
        status: true,
        theme: "danger",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="modal-container delete">
      {page === "user" ? (
        <form onSubmit={handleAdminDelete}>
          <div className="head">
            <h3>Delete User</h3>
            <FaTimes className="icon" onClick={() => setModalDelOpen(false)} />
          </div>
          <p>Are u sure u wanna delete this user?</p>
          <div className="btn-holder">
            <button id="true" type="submit" disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
            <button
              id="false"
              type="button"
              onClick={() => setModalDelOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleMsgDelete}>
          <div className="head">
            <h3>Delete Message</h3>
            <FaTimes className="icon" onClick={() => setModalDelOpen(false)} />
          </div>
          <p>Are u sure u wanna delete this message?</p>
          <div className="btn-holder">
            <button id="true" type="submit" disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
            <button
              id="false"
              type="button"
              onClick={() => setModalDelOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ModalDel;
