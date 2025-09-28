"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    name: zod_1.z.string().optional(),
    password: zod_1.z.string().min(8),
    roleId: zod_1.z.string().uuid(),
});
exports.updateUserSchema = zod_1.z.object({
    email: zod_1.z.string().email().optional(),
    name: zod_1.z.string().optional(),
    password: zod_1.z.string().min(8).optional(),
    roleId: zod_1.z.string().uuid().optional(),
});
