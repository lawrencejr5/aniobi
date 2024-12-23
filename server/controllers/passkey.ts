const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

import { Response, Request } from "express";

import Passkey from "../models/passkey";

interface BodyTypes {
  id: string;
  key: string;
  oldKey: string;
  newKey: string;
}

const createPasskey = async (req: Request, res: Response): Promise<void> => {
  const { key }: BodyTypes = req.body;

  if (!key) {
    res.status(500).json({ msg: "Please input passkey" });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPasskey = await bcrypt.hash(key, salt);

  const passkey = await Passkey.create({ passkey: hashedPasskey });
  res.status(200).json({ msg: "success", passkey });
};

const checkPasskey = async (req: Request, res: Response): Promise<void> => {
  const { key }: BodyTypes = req.body;
  if (!key) {
    res.status(500).json({ msg: "Please input passkey" });
    return;
  }

  const passkeyDb = await Passkey.findOne({});
  const comparePasskey = await bcrypt.compare(key, passkeyDb?.passkey);

  if (!comparePasskey) {
    res.status(500).json({ msg: "Wrong passkey!" });
    return;
  }

  const token = jwt.sign({ id: passkeyDb?._id }, "bankai", { expiresIn: "1d" });

  res.status(200).json({ id: passkeyDb?._id, token });
};

const updatePasskey = async (req: Request, res: Response): Promise<void> => {
  const { id, oldKey, newKey }: BodyTypes = req.body;
  if (!oldKey || !newKey || !id) {
    res.status(500).json({ msg: "Something went wrong" });
    return;
  }

  const passkeyDb = await Passkey.findOne({});

  const confirmOldKey = await bcrypt.compare(oldKey, passkeyDb?.passkey);
  if (!confirmOldKey) {
    res.status(500).json({ msg: "Old paskey is wrong" });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPasskey = await bcrypt.hash(newKey, salt);
  const updated = await Passkey.findByIdAndUpdate(
    id,
    { passkey: hashedPasskey },
    { new: true, runValidators: true }
  );

  res.status(200).json({ msg: "passkey updated successfully", updated });
};

export { createPasskey, checkPasskey, updatePasskey };
