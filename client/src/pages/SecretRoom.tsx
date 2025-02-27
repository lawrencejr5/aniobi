import React from "react";

import Nav from "../components/Nav";

import { useGlobalContext } from "../Global";

import { FaRotate, FaCaretRight, FaCaretLeft } from "react-icons/fa6";
import { BsHeart, BsHeartFill } from "react-icons/bs";

const SecretRoom = () => {
  const { messages, getMessages }: any = useGlobalContext();

  const [curr, setCurr] = React.useState<number>(0);

  const move = (position: string) => {
    if (position === "forward") {
      setCurr((prev) => {
        if (prev == messages?.length - 1) return 0;
        return prev + 1;
      });
    } else if (position === "backward") {
      setCurr((prev) => {
        if (prev == 0) return messages?.length - 1;
        return prev - 1;
      });
    }
  };

  const reload = (): void => {
    getMessages();
    setCurr(0);
  };

  React.useEffect(() => {
    getMessages();
  }, []);

  return (
    <div className="secret-room-container">
      <Nav page={"secret"} />
      <div className="reload" onClick={reload}>
        <FaRotate />
      </div>
      <div className="body">
        <h1>Shhh!...🤫, U've just found secret room🧐</h1>
        <div className="item-container">
          <div className="move left" onClick={() => move("backward")}>
            <FaCaretLeft />
          </div>
          <div className="items">
            {messages.map(
              (
                { message, _id }: { message: string; _id: string },
                i: number
              ) => {
                return (
                  <div
                    className={`item ${
                      curr == i && i % 2 == 0
                        ? "even-active"
                        : curr == i && i % 2 == 1
                        ? "odd-active"
                        : ""
                    }`}
                    key={i}
                  >
                    <img src="/imgs/aniobi_transparent_oxblood.png" alt="" />
                    <div className="msg">{message}</div>
                    <BsHeart className="heart" />
                  </div>
                );
              }
            )}
          </div>

          <div className="move left" onClick={() => move("forward")}>
            <FaCaretRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecretRoom;
