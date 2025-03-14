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
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jwt = require("jsonwebtoken");
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Authorization = req.headers.authorization;
        if (!Authorization || !Authorization.startsWith("Bearer ")) {
            res.status(401).json({ msg: "User not authenticated" });
            return;
        }
        next();
    }
    catch (err) {
        console.log(err);
    }
});
exports.auth = auth;
