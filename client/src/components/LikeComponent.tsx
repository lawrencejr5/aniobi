import React, { useState, useEffect } from "react";

import { BsHeart, BsHeartFill } from "react-icons/bs";

import { useGlobalContext, ContextAppType } from "../Global";

const LikeComponent: React.FC<{ msgId: string }> = ({ msgId }) => {
  const { toggleLikeMessage, checkLiked, signedIn } =
    useGlobalContext() as ContextAppType;

  const [liked, setLiked] = useState<boolean>(false);
  const [animating, setAnimating] = useState<boolean>(false);

  useEffect(() => {
    const checkVal = async () => {
      const val = await checkLiked(msgId);
      setLiked(val as boolean);
    };
    checkVal();
  }, [checkLiked, msgId]);

  const likeMessage = async (): Promise<void> => {
    try {
      setLiked((prev) => !prev);
      // Like pop animation
      setAnimating(true);
      setTimeout(() => setAnimating(false), 1000);
      if (signedIn?._id) await toggleLikeMessage(signedIn._id, msgId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div onClick={likeMessage}>
      {liked ? (
        <BsHeartFill className={`heart-icon ${animating ? "pop" : ""}`} />
      ) : (
        <BsHeart className={`heart-icon ${animating ? "pop" : ""}`} />
      )}
    </div>
  );
};

export default LikeComponent;
