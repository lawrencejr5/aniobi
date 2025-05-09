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
exports.checkIfUserLikedMessage = exports.getLikedMessagesForUser = exports.getLikesForMessage = exports.toggleLike = void 0;
const like_1 = __importDefault(require("../models/like"));
const messages_1 = __importDefault(require("../models/messages"));
// Toggle like/unlike for a message
const toggleLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { messageId } = req.params;
        const { userId } = req.body;
        // Look for existing like for this message/user combination
        const existingLike = yield like_1.default.findOne({
            message: messageId,
            user: userId,
        });
        if (existingLike) {
            // If found, remove the like (unlike)
            yield existingLike.deleteOne();
            res.status(200).json({ message: "Message unliked", liked: false });
        }
        else {
            // Create a new like document
            yield like_1.default.create({ message: messageId, user: userId });
            res.status(200).json({ message: "Message liked", liked: true });
        }
    }
    catch (error) {
        console.error("Error toggling like:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.toggleLike = toggleLike;
// Get all likes for a particular message with populated user username and message title
const getLikesForMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { messageId } = req.params;
        // Use populate if your Like model defines "user" and "message" as references.
        const likes = yield like_1.default.find({ message: messageId })
            .populate("user", "username") // populate username from User model
            .populate("message", "message"); // populate title from Message model
        res.status(200).json({ likes });
    }
    catch (error) {
        console.error("Error fetching likes for message:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getLikesForMessage = getLikesForMessage;
// Get all messages that a specific user has liked
const getLikedMessagesForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        // First, find all Like documents for the user
        const likes = yield like_1.default.find({ user: userId });
        // Extract the message IDs from the likes
        const messageIds = likes.map((like) => like.message);
        // Now, use the Message model to retrieve the full message documents
        const likedMessages = yield messages_1.default.find({ _id: { $in: messageIds } });
        res.status(200).json({ user: userId, likedMessages });
    }
    catch (error) {
        console.error("Error fetching liked messages for user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getLikedMessagesForUser = getLikedMessagesForUser;
const checkIfUserLikedMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { messageId } = req.params;
        const { userId } = req.query;
        const exists = yield like_1.default.findOne({ message: messageId, user: userId });
        if (exists) {
            res.status(200).json({ liked: true });
            return;
        }
        res.status(200).json({ liked: false });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.checkIfUserLikedMessage = checkIfUserLikedMessage;
