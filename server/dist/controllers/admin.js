"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdmins = exports.deleteAdmin = exports.updateAdminCredentials = exports.checkAdmin = exports.createAdmin = void 0;
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const admin_1 = __importDefault(require("../models/admin"));
const createAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { username, password, cpassword } = req.body;
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
    const existingAdmin = yield admin_1.default.findOne({ username });
    if (existingAdmin) {
        res.status(409).json({ msg: "Admin with this username already exists" });
        return;
    }
    const salt = yield bcrypt.genSalt(10);
    const hashedPassword = yield bcrypt.hash(password, salt);
    // Create a new Admin instance and save it
    const admin = new admin_1.default({ username, password: hashedPassword });
    yield admin.save();
    // Generate token for the new admin
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
    // Return response without password
    res.status(201).json({
        msg: "Admin created successfully", admin, token
    });
});
exports.createAdmin = createAdmin;
const checkAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ msg: "Please input username and password" });
        return;
    }
    // Convert username to lowercase for consistency irrespective of what the user inputs
    username = username.toLowerCase();
    const adminDb = yield admin_1.default.findOne({ username });
    if (!adminDb) {
        res.status(404).json({ msg: "Admin not found" });
        return;
    }
    const isMatch = yield bcrypt.compare(password, adminDb.password);
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
});
exports.checkAdmin = checkAdmin;
const updateAdminCredentials = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { username, password, role } = req.body;
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
    username = username === null || username === void 0 ? void 0 : username.toLowerCase();
    const adminDb = yield admin_1.default.findById(id);
    if (!adminDb) {
        res.status(404).json({ msg: "Admin not found" });
        return;
    }
    // Update the username
    adminDb.username = username || adminDb.username;
    adminDb.role = role || adminDb.role;
    // If a new password is provided and not empty, update the password
    if (password && password.trim().length > 0) {
        const salt = yield bcrypt.genSalt(10);
        const hashedPassword = yield bcrypt.hash(password, salt);
        adminDb.password = hashedPassword;
    }
    // Otherwise, retain the existing password
    yield adminDb.save();
    res.status(200).json({
        msg: "Admin credentials updated successfully",
        admin: adminDb,
    });
});
exports.updateAdminCredentials = updateAdminCredentials;
const deleteAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ msg: "Admin id is required" });
        return;
    }
    const deletedAdmin = yield admin_1.default.findByIdAndDelete(id);
    if (!deletedAdmin) {
        res.status(404).json({ msg: "Admin not found" });
        return;
    }
    res.status(200).json({ msg: "Admin deleted successfully" });
});
exports.deleteAdmin = deleteAdmin;
const getAdmins = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all admins
        const admins = yield admin_1.default.find({});
        res.status(200).json({ msg: "Admins fetched successfully", admins });
    }
    catch (error) {
        res.status(500).json({ msg: "An error occurred", error });
    }
});
exports.getAdmins = getAdmins;
