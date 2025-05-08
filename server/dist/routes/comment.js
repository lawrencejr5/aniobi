"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const comment_1 = require("../controllers/comment");
const CommentRouter = express_1.default.Router();
// Route to get all comments or create new comment
CommentRouter.route("/").get(comment_1.getComments).post(auth_1.auth, comment_1.createComment);
// Route to update or delete a comment by id
CommentRouter.route("/:id")
    .patch(auth_1.auth, comment_1.updateComment)
    .delete(auth_1.auth, comment_1.deleteComment);
exports.default = CommentRouter;
