"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MessageRouter = express_1.default.Router();
const auth_1 = require("../middlewares/auth");
const messages_1 = require("../controllers/messages");
MessageRouter.get("/", messages_1.getMessages);
MessageRouter.post("/", messages_1.addMessage);
MessageRouter.patch("/:id", auth_1.auth, messages_1.updateMessage);
MessageRouter.delete("/:id", auth_1.auth, messages_1.deleteMessage);
exports.default = MessageRouter;
