import { Request, Response } from "express";
import Comment from "../models/comment";

// Create a new comment
export const createComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { content, author } = req.body;
    const newComment = await Comment.create({ content, author });
    res
      .status(201)
      .json({ msg: "Comment created successfully", comment: newComment });
  } catch (error) {
    res.status(500).json({ msg: "Error creating comment", error });
  }
};

// Get all comments
export const getComments = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const comments = await Comment.find();
    res.status(200).json({ msg: "Comments fetched successfully", comments });
  } catch (error) {
    res.status(500).json({ msg: "Error fetching comments", error });
  }
};

// Update a comment by id
export const updateComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    );
    if (!updatedComment) {
      res.status(404).json({ msg: "Comment not found" });
      return;
    }
    res
      .status(200)
      .json({ msg: "Comment updated successfully", comment: updatedComment });
  } catch (error) {
    res.status(500).json({ msg: "Error updating comment", error });
  }
};

// Delete a comment by id
export const deleteComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) {
      res.status(404).json({ msg: "Comment not found" });
      return;
    }
    res.status(200).json({ msg: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting comment", error });
  }
};
