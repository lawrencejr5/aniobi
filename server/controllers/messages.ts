import { Request, Response } from "express";
import Message from "../models/messages";

const getMessages = async (req: Request, res: Response) => {
  try {
    const { from, to } = req.query;
    
    const queryObj: { [key: string]: string | null } = {};
    
    if (from && typeof from === "string") {
      queryObj.from = from === "null" ?null : from;
    }
    
    if (to && typeof to === "string") {
      queryObj.to = to === "null" ? null : to;
    }

    const messages = await Message.find(queryObj).sort("-createdAt");
    res.status(200).json({ msg: "success", messages });
  } catch (err) {
    res.status(500).json({ msg: "An error occurred", err });
  }
};

const addMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { msg, from, to } = req.body;
    if (!msg) {
      res.status(400).json({ msg: "Input cannot be empty" });
      return;
    }
    const message = await Message.create({ message: msg, from, to });
    res.status(200).json({ msg: "success", message });
  } catch (err) {
    res.status(500).json({ msg: "An error occurred", err });
  }
};

const updateMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { msg, show } = req.body;
    if (!msg && !show) {
      res.status(400).json({ msg: "Input cannot be empty" });
      return;
    }
    const updated = await Message.findByIdAndUpdate(
      id,
      { message: msg, show },
      { new: true, runValidators: true }
    );
    if (!updated) {
      res.status(404).json({ msg: "Message not found" });
    } else {
      res.status(200).json({ msg: "Message updated successfully", updated });
    }
  } catch (err) {
    res.status(500).json({ msg: "An error occurred", err });
  }
};

const deleteMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ msg: "Invalid message id" });
      return;
    }
    const deleted = await Message.findByIdAndDelete(id);
    if (!deleted) {
      res.status(404).json({ msg: "Message not found" });
    } else {
      res.status(200).json({ msg: `Message with id: ${id} has been deleted successfully` });
    }
  } catch (err) {
    res.status(500).json({ msg: "An error occurred", err });
  }
};

export { getMessages, addMessage, updateMessage, deleteMessage };
