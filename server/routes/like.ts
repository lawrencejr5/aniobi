import { Router } from "express";
import {
  toggleLike,
  getLikesForMessage,
  getLikedMessagesForUser,
} from "../controllers/like";

const LikeRouter = Router();

LikeRouter.post("/:messageId", toggleLike);

LikeRouter.get("/message/:messageId", getLikesForMessage);

LikeRouter.get("/user/:userId", getLikedMessagesForUser);

export default LikeRouter;
