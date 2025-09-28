"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const response_handler_1 = require("../utils/response.handler");
const authorize = (requiredPermissions) => {
    return (req, res, next) => {
        var _a;
        const userPermissions = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.permissions) || [];
        const hasPermission = requiredPermissions.every(p => userPermissions.includes(p));
        if (!hasPermission) {
            return (0, response_handler_1.sendError)(res, 'Forbidden: You do not have the required permissions', 403);
        }
        next();
    };
};
exports.authorize = authorize;
