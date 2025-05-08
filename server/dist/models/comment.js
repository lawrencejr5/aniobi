"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CommentSchema = new mongoose_1.Schema({
    comment: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Admins",
        required: true,
    },
    message: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Messages",
        required: true,
    }
}, {
    timestamps: true,
});
const CommentModel = (0, mongoose_1.model)("Comments", CommentSchema);
exports.default = CommentModel;
