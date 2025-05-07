import React, { useEffect, useState } from "react";
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
  const {
    formatTime,
    commentModalOpen,
    setCommentModalOpen,
    selectedMessage,
    setSelectedMessage,
    setMessageComments,
    getMessageComments,
    messageComments,
    makeComment,
    commentLoading,
    signedIn,
  } = useGlobalContext() as ContextAppType;

  useEffect(() => {
    if (selectedMessage?._id) getMessageComments(selectedMessage._id);
  }, [selectedMessage, commentModalOpen]);

  const [commentInp, setCommentInp] = React.useState<string>("");

  const comment = async () => {
    try {
      const author = signedIn?._id;
      const message = selectedMessage?._id;
      if (author && message && commentInp.trim()) {
        await makeComment(message, commentInp, author);
        setCommentInp("");
        getMessageComments(message);
      } else {
        console.error("Missing required data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`modal-container comment ${open ? "" : "hide"}`}>
      <div className="modal">
        <div className="msg-sec">
          <div className="header">
            <small>@anonymous</small>
            <small>{formatTime(selectedMessage?.createdAt)}</small>
          </div>
          <div>
            <Typewriter
              text={selectedMessage ? selectedMessage.message : "----"}
              speed={10}
            />{" "}
          </div>
        </div>
        <div className="comment-sec">
          <div className="header">
            <h2>Comments...</h2>
            <FaTimes
              onClick={() => {
                setCommentModalOpen(false);
                setSelectedMessage(null);
                setMessageComments(null);
              }}
            />
          </div>
          <div className="comments">
            {commentLoading ? (
              <small style={{ marginTop: "1rem", display: "table" }}>
                Fetching comments...
              </small>
            ) : messageComments?.length === 0 ? (
              <div
                className="empty"
                style={{
                  width: "100%",
                  display: "grid",
                  placeItems: "center",
                  marginTop: "2rem",
                }}
              >
                <img
                  src="/illustrations/148-No-Result-Found.svg"
                  width={"200px"}
                  height={"200px"}
                  alt=""
                />
                <p style={{ textAlign: "center" }}>No comments yet...</p>
              </div>
            ) : (
              messageComments?.map((comment) => {
                return (
                  <div className="comment" key={comment._id}>
                    <img src="/avatars/avatar3.avif" alt="" />
                    <div className="content">
                      <div className="head">
                        <span>@{comment?.author?.username}</span>
                        &nbsp;<span>.</span>&nbsp;
                        <small>{formatTime(comment?.createdAt)}</small>
                      </div>
                      <p>{comment.comment}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className="inp-holder">
            <img src="/avatars/avatar3.avif" alt="" />
            <input
              type="text"
              placeholder="Add a comment"
              value={commentInp}
              onChange={(e) => setCommentInp(e.target.value)}
            />
            <button onClick={comment}>
              <IoMdSend />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalComment;
