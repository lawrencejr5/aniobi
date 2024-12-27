import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

import { NotificationType } from "../types";

interface Noti {
  notification: NotificationType;
}

const Notification: React.FC<Noti> = ({ notification }) => {
  const { text, theme, status } = notification;
  return (
    <div className="notification-container">
      <div className={`notification text-${theme} ${status ? "down" : "up"}`}>
        {theme === "success" ? <FaCheckCircle /> : <FaTimesCircle />}
        &nbsp;&nbsp;<span>{text}</span>
      </div>
    </div>
  );
};

export default Notification;
