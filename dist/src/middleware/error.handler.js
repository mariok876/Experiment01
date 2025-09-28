"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const jsonwebtoken_1 = require("jsonwebtoken");
const response_handler_1 = require("../utils/response.handler");
const AppError_1 = __importDefault(require("../utils/AppError"));
const errorHandler = (err, req, res, next) => {
    if (err instanceof AppError_1.default) {
        return (0, response_handler_1.sendError)(res, err.message, err.statusCode);
    }
    if (err instanceof zod_1.ZodError) {
        return (0, response_handler_1.sendError)(res, 'Validation error', 400, err.issues);
    }
    if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
        return (0, response_handler_1.sendError)(res, 'Invalid token', 401);
    }
    console.error('Unhandled Error:', err);
    (0, response_handler_1.sendError)(res, 'Something went wrong!', 500);
    next();
};
exports.errorHandler = errorHandler;
