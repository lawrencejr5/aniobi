import React from "react";

import Nav from "../components/Nav";

import { useGlobalContext } from "../Global";

const SecretRoom = () => {
  const { messages }: any = useGlobalContext();

  return (
    <div className="secret-room-container">
      <Nav page={"secret"} />
      <div className="item-box-container">
        {messages.map((message: any) => {
          return <div className="item-box">{message.message}</div>;
        })}
      </div>
    </div>
  );
};

export default SecretRoom;
