import React from "react";

import Nav from "../components/Nav";

import { useGlobalContext } from "../Global";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaRotate } from "react-icons/fa6";

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
        <h1>Shhh!...🤫, u've just found secret room🧐</h1>
        <div className="item-container">
          <div className="move left" onClick={() => move("backward")}>
            <FaChevronLeft />
          </div>
          <div className="items">
            {messages.map(({ message }: { message: string }, i: number) => {
              return (
                <div className={`item ${curr == i && "active"}`} key={i}>
                  <img src="/imgs/aniobi_transparent_oxblood.png" alt="" />
                  <div className="msg">{message}</div>
                </div>
              );
            })}
          </div>

          <div className="move left" onClick={() => move("forward")}>
            &nbsp;
            <FaChevronRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecretRoom;
