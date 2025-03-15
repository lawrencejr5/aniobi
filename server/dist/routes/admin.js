"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const AdminRouter = express.Router();
const auth_1 = require("../middlewares/auth");
const admin_1 = require("../controllers/admin");
AdminRouter.post("/create", admin_1.createAdmin);
AdminRouter.post("/login", admin_1.checkAdmin);
AdminRouter.patch("/:id", auth_1.auth, admin_1.updateAdminCredentials);
AdminRouter.delete("/:id", auth_1.auth, admin_1.deleteAdmin);
AdminRouter.get("/", auth_1.auth, admin_1.getAdmins); // New route to fetch all admins
exports.default = AdminRouter;
