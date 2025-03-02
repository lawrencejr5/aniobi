const express = require("express");
const AdminRouter = express.Router();

import { auth } from "../middlewares/auth";
import {
  createAdmin,
  checkAdmin,
  updateAdminCredentials,
  deleteAdmin,
  getAdmins,
} from "../controllers/admin";

AdminRouter.post("/create", createAdmin);
AdminRouter.post("/login", checkAdmin);
AdminRouter.patch("/:id", auth, updateAdminCredentials);
AdminRouter.delete("/:id", auth, deleteAdmin);
AdminRouter.get("/", auth, getAdmins); // New route to fetch all admins

export default AdminRouter;
