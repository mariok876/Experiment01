"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const authorize = (permissions) => {
    return async (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            include: { role: { include: { permissions: true } } },
        });
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const userPermissions = user.role.permissions.map((p) => p.name);
        const hasPermission = permissions.every((p) => userPermissions.includes(p));
        if (!hasPermission) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
};
exports.authorize = authorize;
