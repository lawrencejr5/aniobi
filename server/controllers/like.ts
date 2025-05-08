import { Request, Response } from "express";
import Like from "../models/like";
import Message from "../models/messages";

// Toggle like/unlike for a message
export const toggleLike = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { messageId } = req.params;
    const { userId } = req.body;

    // Look for existing like for this message/user combination
    const existingLike = await Like.findOne({
      message: messageId,
      user: userId,
    });

    if (existingLike) {
      // If found, remove the like (unlike)
      await existingLike.deleteOne();
      res.status(200).json({ message: "Message unliked", liked: false });
    } else {
      // Create a new like document
      await Like.create({ message: messageId, user: userId });
      res.status(200).json({ message: "Message liked", liked: true });
    }
  } catch (error: any) {
    console.error("Error toggling like:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all likes for a particular message with populated user username and message title
export const getLikesForMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { messageId } = req.params;
    // Use populate if your Like model defines "user" and "message" as references.
    const likes = await Like.find({ message: messageId })
      .populate("user", "username") // populate username from User model
      .populate("message", "message"); // populate title from Message model

    res.status(200).json({ likes });
  } catch (error: any) {
    console.error("Error fetching likes for message:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all messages that a specific user has liked
export const getLikedMessagesForUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    // First, find all Like documents for the user
    const likes = await Like.find({ user: userId });
    // Extract the message IDs from the likes
    const messageIds = likes.map((like: any) => like.message);
    // Now, use the Message model to retrieve the full message documents
    const likedMessages = await Message.find({ _id: { $in: messageIds } });
    res.status(200).json({ user: userId, likedMessages });
  } catch (error: any) {
    console.error("Error fetching liked messages for user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
