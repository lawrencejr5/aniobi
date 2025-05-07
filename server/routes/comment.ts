import express from "express";
import { auth } from "../middlewares/auth";
import {
  createComment,
  getComments,
  updateComment,
  deleteComment,
} from "../controllers/comment";

const CommentRouter = express.Router();

// Route to get all comments or create new comment
CommentRouter.route("/").get(getComments).post(auth, createComment);

// Route to update or delete a comment by id
CommentRouter.route("/:id")
  .patch(auth, updateComment)
  .delete(auth, deleteComment);

export default CommentRouter;
