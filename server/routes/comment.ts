import express from "express";
import {
  createComment,
  getComments,
  updateComment,
  deleteComment,
} from "../controllers/comment";

const CommentRouter = express.Router();

// Route to get all comments or create new comment
CommentRouter.route("/").get(getComments).post(createComment);

// Route to update or delete a comment by id
CommentRouter.route("/:id").patch(updateComment).delete(deleteComment);

export default CommentRouter;
