import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { useGlobalContext } from "../Global.tsx";

const ChatBox = () => {
  const { writeMessage, setNotification }: any = useGlobalContext();

  const [focused, setFocused] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotification({
      text: "Sending...",
      status: true,
      theme: "success",
    });
    setInput("");
    await writeMessage(input);
  };

  return (
    <div className={`chat-box ${!input ? "fixed-height" : ""}`}>
      <div className="header">
        <img src="/imgs/aniobi_transparent_oxblood.png" alt="" />
        {input.length > 0 && (
          <span className="char-count">{input.length}/200</span>
        )}
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
              maxLength={200}
            />
            <button>
              <IoMdSend />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
