import React from "react";

import Nav from "../components/Nav";

import { useGlobalContext } from "../Global";

import { FaPaperPlane, FaTimes, FaSpinner } from "react-icons/fa";
import { FaArrowUpLong, FaRotate } from "react-icons/fa6";

const SecretRoom = () => {
  const [commentOpen, setCommentOpen] = React.useState<boolean>(false);
  const [focused, setFocused] = React.useState<Boolean>(false);
  const [input, setInput] = React.useState<string>("");

  const openComments = () => {
    setCommentOpen((prev) => {
      return !prev;
    });
  };

  const { messages }: any = useGlobalContext();

  return (
    <div className="secret-room-container">
      <Nav page={"secret"} />
    </div>
  );
};

export default SecretRoom;
