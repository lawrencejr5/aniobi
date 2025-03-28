import React from "react";

import { MessageType } from "@/src/types";

import Typewriter from "../Typewriter";

import { FaTimes } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";

import { useGlobalContext, ContextAppType } from "../../Global.tsx";

interface ModelCommentProps {
  open: boolean;
  msg: MessageType | null;
}

const ModalComment: React.FC<ModelCommentProps> = ({ open, msg }) => {
  const { setCommentModalOpen, selectedMessage } =
    useGlobalContext() as ContextAppType;

  return (
    <div className={`modal-container comment ${open ? "" : "hide"}`}>
      <div className="modal">
        <div className="msg-sec">
          <div className="header">
            <small>@anonymous</small>
            <small>1hr ago</small>
          </div>
          <p>
            <Typewriter
              text={selectedMessage ? selectedMessage?.message : "----"}
              speed={10}
            />{" "}
          </p>
        </div>
        <div className="comment-sec">
          <div className="header">
            <h2>Comments...</h2>
            <FaTimes onClick={() => setCommentModalOpen(false)} />
          </div>
          <div className="comments">
            <div className="comment">
              <img src="/avatars/avatar3.avif" alt="" />
              <div className="content">
                <div className="head">
                  <span>@anonymous</span>
                  &nbsp;<span>.</span>&nbsp;
                  <small>just now</small>
                </div>
                <p>I love aniobi too</p>
              </div>
            </div>
          </div>

          <div className="inp-holder">
            <img src="/avatars/avatar3.avif" alt="" />
            <input type="text" placeholder="Add a comment" />
            <button>
              <IoMdSend />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalComment;
