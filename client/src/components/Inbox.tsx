import React, { FC } from "react";

import { useGlobalContext } from "../Global";

interface InboxProps {
  id: string;
  message: string;
  createdAt: string;
}

const Inbox: FC<InboxProps> = ({ message, id, createdAt }) => {
  const { setNotification }: any = useGlobalContext();

  const copyToClipboard = async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      setNotification({
        text: "copied",
        status: true,
        theme: "success",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="inbox">
      <small>
        {`~user${id.slice(0, 12)}`} . {createdAt.split("T")[0]}
      </small>
      <p>{message}</p>
      <div className="btn-holder">
        <button onClick={() => copyToClipboard(message)}>
          copy to clipboard
        </button>
      </div>
    </div>
  );
};

export default Inbox;
