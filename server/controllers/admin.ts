require("dotenv").config();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

import { Response, Request } from "express";
import Admin from "../models/admin";

interface AdminBody {
  id?: string;
  username?: string;
  password?: string;
  cpassword?: string;
  oldPassword?: string;
  newPassword?: string;
  role?: string;
}

const createAdmin = async (req: Request, res: Response): Promise<void> => {
  let { username, password, cpassword }: AdminBody = req.body;

  if (!username || !password || !cpassword) {
    res.status(400).json({ msg: "Please fill in all required fields" });
    return;
  }

  if (password !== cpassword) {
    res.status(400).json({ msg: "Passwords do not match" });
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
    msg: "Admin created successfully", admin, token
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
    admin: adminDb,
    token,
  });
};

const updateAdminCredentials = async (
  req: Request,
  res: Response
): Promise<void> => {
  let { username, password, role }: AdminBody = req.body;
  const { id } = req.params;

  // Check for admin id
  if (!id) {
    res.status(400).json({ msg: "Admin id is required" });
    return;
  }

  // Check that at least username is provided; password is optional
  if (!username && !password && !role) {
    res.status(400).json({ msg: "All fields cannot be empty" });
    return;
  }

  // Convert username to lowercase
  username = username?.toLowerCase();

  const adminDb: any = await Admin.findById(id);
  if (!adminDb) {
    res.status(404).json({ msg: "Admin not found" });
    return;
  }

  // Update the username
  adminDb.username = username || adminDb.username;
  adminDb.role = role || adminDb.role;

  // If a new password is provided and not empty, update the password
  if (password && password.trim().length > 0) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    adminDb.password = hashedPassword;
  }
  // Otherwise, retain the existing password

  await adminDb.save();

  res.status(200).json({
    msg: "Admin credentials updated successfully",
    admin: adminDb as AdminBody,
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
    // Fetch all admins
    const admins = await Admin.find({});
    res.status(200).json({ msg: "Admins fetched successfully", admins });
  } catch (error) {
    res.status(500).json({ msg: "An error occurred", error });
  }
};

const getAdmin = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ msg: "Admin id is required" });
    return;
  }
  try {
    const admin = await Admin.findById(id);
    if (!admin) {
      res.status(404).json({ msg: "Admin not found" });
      return;
    }
    res.status(200).json({ msg: "Admin fetched successfully", admin });
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
  getAdmin, 
};
