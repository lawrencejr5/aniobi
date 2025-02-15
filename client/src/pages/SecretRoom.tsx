import React from "react";

import Nav from "../components/Nav";

import { useGlobalContext } from "../Global";

import { FaPaperPlane, FaTimes } from "react-icons/fa";

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
      <div className="item-box-container">
        {messages.map(
          (message: { message: string; _id: string }, i: number) => {
            return (
              <div
                className={`${
                  commentOpen ? "item-box" : "item-box close-comment"
                }`}
                key={i}
              >
                <div className="item">
                  <div className="header">
                    <img
                      src="/imgs/aniobi_icon1.jpg"
                      height={"20px"}
                      width={"20px"}
                      alt=""
                    />
                    <span>msg-{message._id}</span>
                  </div>
                  <div className="msg">{message.message}</div>
                  <span className="comments" onClick={openComments}>
                    49 comment(s)
                  </span>
                </div>
                <div className="comments-container">
                  <div className="header">
                    <h2>Comments</h2>
                    <FaTimes />
                  </div>
                  <div className="comments">
                    <span className="comment">Made up story</span>
                    <span className="comment">Big lie</span>
                    <span className="comment">That's what you think</span>
                    <span className="comment">😪</span>
                    <span className="comment">😂😂😂😂</span>
                    <span className="comment">
                      The irony of this story is that I am the writer
                    </span>
                    <span className="comment">Stay strong my dear</span>
                    <span className="comment">
                      Beans and Garri no go bad ooh
                    </span>
                  </div>
                  <div className="comment-form-container">
                    <div className={`comment-form ${focused ? "wide" : ""}`}>
                      <img src="/imgs/aniobi_icon1.jpg" alt="" />
                      <form action="">
                        <input
                          type="text"
                          placeholder="comment..."
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
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default SecretRoom;
