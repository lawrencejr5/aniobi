import React, { useState, useEffect } from "react";

import { BsHeart, BsHeartFill, BsChatText } from "react-icons/bs";
import { useGlobalContext, ContextAppType } from "../Global";

const CommentCount: React.FC<{ messageId: string }> = ({ messageId }) => {
  const { getCommentCount, messageComments } =
    useGlobalContext() as ContextAppType;
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const fetchCount = async () => {
      const cnt = await getCommentCount(messageId);
      setCount(cnt);
    };
    fetchCount();
  }, [messageComments]);

  return (
    <div>
      {count ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "2px",
            marginRight: ".5rem",
          }}
        >
          <BsChatText className="comment-icon" />
          <span style={{ marginLeft: ".3rem", fontSize: "15px" }}>{count}</span>
        </div>
      ) : (
        <div
          style={{
            marginRight: "1rem",
          }}
        >
          <BsChatText className="comment-icon" />
        </div>
      )}
    </div>
  );
};

export default CommentCount;
