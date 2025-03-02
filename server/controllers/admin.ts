require("dotenv").config();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

import { Response, Request } from "express";
import Admin from "../models/admin";

interface AdminBody {
  id?: string;
  username?: string;
  password?: string;
  oldPassword?: string;
  newPassword?: string;
}

const createAdmin = async (req: Request, res: Response): Promise<void> => {
  let { username, password }: AdminBody = req.body;

  if (!username || !password) {
    res.status(400).json({ msg: "Please input username and password" });
    return;
  }

  // Convert username to lowercase for consistency
  username = username.toLowerCase();

  // Check if the admin already exists
  const existingAdmin = await Admin.findOne({ username });
  if (existingAdmin) {
    res.status(409).json({ msg: "Admin with this username already exists" });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new Admin instance and save it
  const admin = new Admin({ username, password: hashedPassword });
  await admin.save();

  // Generate token for the new admin
  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  // Return response without password
  res.status(201).json({
    msg: "Admin created successfully",
    admin: { _id: admin._id, username: admin.username },
    token,
  });
};

const checkAdmin = async (req: Request, res: Response): Promise<void> => {
  let { username, password }: AdminBody = req.body;
  if (!username || !password) {
    res.status(400).json({ msg: "Please input username and password" });
    return;
  }

  // Convert username to lowercase for consistency irrespective of what the user inputs
  username = username.toLowerCase();

  const adminDb = await Admin.findOne({ username });
  if (!adminDb) {
    res.status(404).json({ msg: "Admin not found" });
    return;
  }

  const isMatch = await bcrypt.compare(password, adminDb.password);
  if (!isMatch) {
    res.status(401).json({ msg: "Wrong password" });
    return;
  }

  const token = jwt.sign({ id: adminDb._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  res.status(200).json({
    msg: "Login successful",
    admin: { _id: adminDb._id, username: adminDb.username },
    token,
  });
};

const updateAdminCredentials = async (
  req: Request,
  res: Response
): Promise<void> => {
  let { username, password }: AdminBody = req.body;
  const { id } = req.params;

  // Check separately for admin id
  if (!id) {
    res.status(400).json({ msg: "Admin id is required" });
    return;
  }

  // Then check that both username and password are provided
  if (!username || !password) {
    res
      .status(400)
      .json({ msg: "Please provide a new username and new password" });
    return;
  }

  // Convert username to lowercase
  username = username.toLowerCase();

  const adminDb = await Admin.findById(id);
  if (!adminDb) {
    res.status(404).json({ msg: "Admin not found" });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Update the admin credentials without checking the old password
  adminDb.username = username;
  adminDb.password = hashedPassword;
  await adminDb.save();

  // Generate token after update and send response without password
  const token = jwt.sign({ id: adminDb._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  res.status(200).json({
    msg: "Admin credentials updated successfully",
    admin: { _id: adminDb._id, username: adminDb.username },
    token,
  });
};

const deleteAdmin = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ msg: "Admin id is required" });
    return;
  }

  const deletedAdmin = await Admin.findByIdAndDelete(id);
  if (!deletedAdmin) {
    res.status(404).json({ msg: "Admin not found" });
    return;
  }

  res.status(200).json({ msg: "Admin deleted successfully" });
};

const getAdmins = async (req: Request, res: Response): Promise<void> => {
  try {
    // Fetch all admins, only returning _id and username.
    const admins = await Admin.find({}, "_id username");
    res.status(200).json({ msg: "Admins fetched successfully", admins });
  } catch (error) {
    res.status(500).json({ msg: "An error occurred", error });
  }
};

export {
  createAdmin,
  checkAdmin,
  updateAdminCredentials,
  deleteAdmin,
  getAdmins,
};
