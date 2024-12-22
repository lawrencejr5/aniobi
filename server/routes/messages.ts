import express from "express";
const MessageRouter = express.Router();

import { addMessage, getMessages } from "../controllers/messages";

MessageRouter.get("/", getMessages);
MessageRouter.post("/", addMessage);

export default MessageRouter;
