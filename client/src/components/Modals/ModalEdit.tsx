import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
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
  } = useGlobalContext() as ContextAppType;
  const [editedMessage, setEditedMessage] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  useEffect(() => {
    if (selectedMessage && selectedMessage.message) {
      setEditedMessage(selectedMessage.message);
    }
  }, [selectedMessage]);

  const handleUpdate = async (e: React.FormEvent) => {
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

  if (!open) return null;

  return (
    <div className="modal-container">
      <form onSubmit={handleUpdate}>
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
            isUpdating ? { backgroundColor: "gray", cursor: "not-allowed" } : {}
          }
        >
          {isUpdating ? "Updating..." : "Update Message"}
        </button>
      </form>
    </div>
  );
};

export default ModalEdit;
