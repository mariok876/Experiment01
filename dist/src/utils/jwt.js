"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyToken = exports.generateTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = __importDefault(require("./AppError"));
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key';
const generateTokens = (userId) => {
    const accessToken = jsonwebtoken_1.default.sign({ userId }, JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jsonwebtoken_1.default.sign({ userId }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
};
exports.generateTokens = generateTokens;
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch (error) {
        throw new AppError_1.default('Invalid token', 401);
    }
};
exports.verifyToken = verifyToken;
const verifyRefreshToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, JWT_REFRESH_SECRET);
    }
    catch (error) {
        throw new AppError_1.default('Invalid refresh token', 401);
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
