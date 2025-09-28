"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const authorize = (roles) => {
    return async (req, res, next) => {
        // @ts-ignore
        const userId = req.user.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const user = await prisma_1.default.user.findUnique({
            where: { id: userId },
            include: { role: true },
        });
        if (!user || !roles.includes(user.role.name)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
};
exports.authorize = authorize;
