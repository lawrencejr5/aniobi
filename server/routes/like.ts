import { Router } from "express";
import {
  toggleLike,
  getLikesForMessage,
  getLikedMessagesForUser,
  checkIfUserLikedMessage,
} from "../controllers/like";

import { auth } from "../middlewares/auth";

const LikeRouter = Router();

LikeRouter.post("/:messageId", auth, toggleLike);

LikeRouter.get("/message/:messageId", getLikesForMessage);

LikeRouter.get("/user/:userId", getLikedMessagesForUser);

LikeRouter.get("/check/:messageId", checkIfUserLikedMessage);

export default LikeRouter;
