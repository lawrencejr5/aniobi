import express from "express";
const MessageRouter = express.Router();

import { auth } from "../middlewares/auth";

import { addMessage, getMessages } from "../controllers/messages";

MessageRouter.get("/", auth, getMessages);
MessageRouter.post("/", addMessage);

export default MessageRouter;
