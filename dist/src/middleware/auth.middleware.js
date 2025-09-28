"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jwt_1 = require("../utils/jwt");
const response_handler_1 = require("../utils/response.handler");
const authenticate = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return (0, response_handler_1.sendError)(res, 'Unauthorized: No token provided', 401);
    }
    try {
        const decoded = (0, jwt_1.verifyToken)(token);
        req.user = { userId: decoded.userId, permissions: [] };
        next();
    }
    catch (error) {
        return (0, response_handler_1.sendError)(res, 'Unauthorized: Invalid token', 401);
    }
};
exports.authenticate = authenticate;
