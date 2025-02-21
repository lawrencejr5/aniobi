import React from "react";

import Nav from "../components/Nav";

import { useGlobalContext } from "../Global";

import {
  FaPaperPlane,
  FaTimes,
  FaSpinner,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
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

      <div className="reload">
        <FaRotate />
      </div>
      <div className="item-container">
        <div className="move left">
          <FaChevronLeft />
        </div>
        {/* {messages.map(({ message }: { message: string }) => {
          return (
            <div className="item">
              <img src="/imgs/aniobi_transparent_oxblood.png" alt="" />
              <div className="msg">{message}</div>
            </div>
          );
        })} */}
        <div className="items">
          <div className="item">
            <img src="/imgs/aniobi_transparent_oxblood.png" alt="" />
            <div className="msg">
              I don’t believe in spirits of any kind that includes gods I don’t
              believe in spirits of any kind that includes gods
            </div>
          </div>
          <div className="item">
            <img src="/imgs/aniobi_transparent_oxblood.png" alt="" />
            <div className="msg">
              I don’t believe in spirits of any kind that includes gods I don’t
              believe in spirits of any kind that includes gods
            </div>
          </div>
          <div className="item active">
            <img src="/imgs/aniobi_transparent_oxblood.png" alt="" />
            <div className="msg">
              I don’t believe in spirits of any kind that includes gods I don’t
              believe in spirits of any kind that includes gods
            </div>
          </div>
          <div className="item">
            <img src="/imgs/aniobi_transparent_oxblood.png" alt="" />
            <div className="msg">
              I don’t believe in spirits of any kind that includes gods I don’t
              believe in spirits of any kind that includes gods
            </div>
          </div>
        </div>

        <div className="move left">
          <FaChevronRight />
        </div>
      </div>
    </div>
  );
};

export default SecretRoom;
