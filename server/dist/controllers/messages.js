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
exports.deleteMessage = exports.updateMessage = exports.addMessage = exports.getMessages = void 0;
const messages_1 = __importDefault(require("../models/messages"));
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { from, to } = req.query;
        const queryObj = {};
        if (from && typeof from === "string") {
            queryObj.from = from === "null" ? null : from;
        }
        if (to && typeof to === "string") {
            queryObj.to = to === "null" ? null : to;
        }
        const messages = yield messages_1.default.find(queryObj).sort("-createdAt");
        res.status(200).json({ msg: "success", messages });
    }
    catch (err) {
        res.status(500).json({ msg: "An error occurred", err });
    }
});
exports.getMessages = getMessages;
const addMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { msg, from, to } = req.body;
        if (!msg) {
            res.status(400).json({ msg: "Input cannot be empty" });
            return;
        }
        const message = yield messages_1.default.create({ message: msg, from, to });
        res.status(200).json({ msg: "success", message });
    }
    catch (err) {
        res.status(500).json({ msg: "An error occurred", err });
    }
});
exports.addMessage = addMessage;
const updateMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { msg, show } = req.body;
        if (!msg && !show) {
            res.status(400).json({ msg: "Input cannot be empty" });
            return;
        }
        const updated = yield messages_1.default.findByIdAndUpdate(id, { message: msg, show }, { new: true, runValidators: true });
        if (!updated) {
            res.status(404).json({ msg: "Message not found" });
        }
        else {
            res.status(200).json({ msg: "Message updated successfully", updated });
        }
    }
    catch (err) {
        res.status(500).json({ msg: "An error occurred", err });
    }
});
exports.updateMessage = updateMessage;
const deleteMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ msg: "Invalid message id" });
            return;
        }
        const deleted = yield messages_1.default.findByIdAndDelete(id);
        if (!deleted) {
            res.status(404).json({ msg: "Message not found" });
        }
        else {
            res.status(200).json({ msg: `Message with id: ${id} has been deleted successfully` });
        }
    }
    catch (err) {
        res.status(500).json({ msg: "An error occurred", err });
    }
});
exports.deleteMessage = deleteMessage;
