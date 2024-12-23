import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

import { useGlobalContext } from "../Global.tsx";

const ChatBox = () => {
  const { writeMessage }: any = useGlobalContext();

  const [focused, setFocused] = useState<Boolean>(false);
  const [input, setInput] = useState<string>("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await writeMessage(input);
    setInput("");
  };

  return (
    <div className={`chat-box ${!input ? "fixed-height" : ""}`}>
      <div className="header">
        <img src="/imgs/aniobi_transparent_amber.png" alt="" />
      </div>
      <div className="chat">{input && <p>{input}</p>}</div>
      <div className="footer">
        <div className={`inp-holder ${focused ? "wide" : ""}`}>
          <img src="/imgs/aniobi_icon1.jpg" alt="" />
          <form className="input" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="type here..."
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button>
              <FaPaperPlane />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
