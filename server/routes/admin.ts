const express = require("express");
const AdminRouter = express.Router();

import { auth } from "../middlewares/auth";
import {
  createAdmin,
  checkAdmin,
  updateAdminCredentials,
  deleteAdmin,
  getAdmins,
  getAdmin
} from "../controllers/admin";

AdminRouter.post("/create", createAdmin);
AdminRouter.post("/login", checkAdmin);
AdminRouter.patch("/:id", auth, updateAdminCredentials);
AdminRouter.delete("/:id", auth, deleteAdmin);
AdminRouter.get("/", auth, getAdmins);  
AdminRouter.get("/:id", auth, getAdmin); 

export default AdminRouter;
