import React, { FC } from "react";

interface InboxProps {
  id: string;
  message: string;
  createdAt: string;
}

const Inbox: FC<InboxProps> = ({ message, id, createdAt }) => {
  return (
    <div className="inbox">
      <small>
        {`~user${id.slice(0, 12)}`} . {createdAt.split("T")[0]}
      </small>
      <p>{message}</p>
      <div className="btn-holder">
        <button>copy to clipboard</button>
      </div>
    </div>
  );
};

export default Inbox;
