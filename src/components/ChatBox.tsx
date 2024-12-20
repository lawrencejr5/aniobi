import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const ChatBox = () => {
  const [focused, setFocused] = useState(false);
  const [input, setInput] = useState("");

  return (
    <div className={`chat-box ${!input ? "fixed-height" : ""}`}>
      <div className="header">
        <img src="/imgs/aniobi_transparent_amber.png" alt="" />
      </div>
      <div className="chat">{input && <p>{input}</p>}</div>
      <div className="footer">
        <div className={`inp-holder ${focused ? "wide" : ""}`}>
          <img src="/imgs/user/download.png" alt="" />
          <div className="input">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
