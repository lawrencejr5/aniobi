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
exports.deleteComment = exports.updateComment = exports.getComments = exports.createComment = void 0;
const comment_1 = __importDefault(require("../models/comment"));
// Create a new comment
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { comment, author, message } = req.body;
        const newComment = yield comment_1.default.create({ comment, author, message });
        res
            .status(201)
            .json({ msg: "Comment created successfully", comment: newComment });
    }
    catch (error) {
        res.status(500).json({ msg: "Error creating comment", error });
    }
});
exports.createComment = createComment;
// Get all comments
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { author, message } = req.query;
        const queryObj = {};
        if (author && typeof author === "string") {
            queryObj.author = author === "null" ? null : author;
        }
        if (message && typeof message === "string") {
            queryObj.message = message === "null" ? null : message;
        }
        const comments = yield comment_1.default.find(queryObj)
            .populate({
            path: "author",
            select: "username",
        })
            .populate({
            path: "message",
            select: "message",
        })
            .sort({ createdAt: -1 });
        res.status(200).json({ msg: "Comments fetched successfully", comments });
    }
    catch (error) {
        res.status(500).json({ msg: "Error fetching comments", error });
    }
});
exports.getComments = getComments;
// Update a comment by id
const updateComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { comment } = req.body;
        const updatedComment = yield comment_1.default.findByIdAndUpdate(id, { comment }, { new: true });
        if (!updatedComment) {
            res.status(404).json({ msg: "Comment not found" });
            return;
        }
        res
            .status(200)
            .json({ msg: "Comment updated successfully", comment: updatedComment });
    }
    catch (error) {
        res.status(500).json({ msg: "Error updating comment", error });
    }
});
exports.updateComment = updateComment;
// Delete a comment by id
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedComment = yield comment_1.default.findByIdAndDelete(id);
        if (!deletedComment) {
            res.status(404).json({ msg: "Comment not found" });
            return;
        }
        res.status(200).json({ msg: "Comment deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ msg: "Error deleting comment", error });
    }
});
exports.deleteComment = deleteComment;
