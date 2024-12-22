import { Request, Response } from "express";

import Message from "../models/messages";

const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find();
    res.status(200).json({ msg: "success", messages });
  } catch (err) {
    res.status(500).json({ msg: "an error occured", err });
  }
};

const addMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { msg } = req.body;

    if (!msg) {
      res.status(500).json({ msg: "Input cannot empty" });
      return;
    }

    const message = await Message.create({ message: msg });

    res.status(200).json({ msg: "success", message });
  } catch (err) {
    res.status(500).json({ msg: "an error occured", err });
  }
};

export { getMessages, addMessage };
