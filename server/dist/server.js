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
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const conn_1 = __importDefault(require("./config/conn"));
// Middlewares
const notFound_1 = __importDefault(require("./middlewares/notFound"));
const cors = require("cors");
// Routes
const messages_1 = __importDefault(require("./routes/messages"));
const admin_1 = __importDefault(require("./routes/admin"));
const comment_1 = __importDefault(require("./routes/comment"));
const like_1 = __importDefault(require("./routes/like"));
app.use(express_1.default.json());
app.use(cors());
app.use("/api/v1/messages", messages_1.default);
app.use("/api/v1/admin", admin_1.default);
app.use("/api/v1/comment", comment_1.default);
app.use("/api/v1/like", like_1.default);
app.use(notFound_1.default);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const port = process.env.PORT || "5001";
    const url = process.env.MONGO_URI;
    try {
        yield (0, conn_1.default)(url);
        app.listen(port, () => {
            console.log(`app listenting on  port ${port}`);
        });
    }
    catch (err) {
        console.log(err);
    }
});
startServer();
