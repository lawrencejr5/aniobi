import express from "express";
const MessageRouter = express.Router();

import { auth } from "../middlewares/auth";
import {
  addMessage,
  getMessages,
  updateMessage,
  deleteMessage,
} from "../controllers/messages";

MessageRouter.get("/", getMessages);
MessageRouter.post("/", addMessage);
MessageRouter.patch("/:id", auth, updateMessage);
MessageRouter.delete("/:id", auth, deleteMessage);

export default MessageRouter;
