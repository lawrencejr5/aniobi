import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { NotificationType } from "../types";

interface NotificationProps {
  notification: NotificationType | null;
}

const Notification: React.FC<NotificationProps> = ({ notification }) => {
  // If there's no notification at all, render an empty container (or null if you prefer)
  if (!notification) return null;

  // Use class "down" when notification is active; use "up" when deactive.
  const animationClass = notification.status ? "down" : "up";

  return (
    <div className="notification-container">
      <div
        className={`notification text-${notification.theme} ${animationClass}`}
      >
        {notification.theme === "success" ? (
          <FaCheckCircle />
        ) : (
          <FaTimesCircle />
        )}
        &nbsp;&nbsp;<span>{notification.text}</span>
      </div>
    </div>
  );
};

export default Notification;
