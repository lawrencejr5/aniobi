"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MessageSchema = new mongoose_1.default.Schema({
    message: {
        type: String,
        required: true,
    },
    show: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
const MessageModel = mongoose_1.default.model("Messages", MessageSchema);
exports.default = MessageModel;
