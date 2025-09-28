"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.assignRoleSchema = exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    roleId: zod_1.z.string(),
});
exports.updateUserSchema = zod_1.z.object({
    email: zod_1.z.string().email().optional(),
    password: zod_1.z.string().min(6).optional(),
    roleId: zod_1.z.string().optional(),
});
exports.assignRoleSchema = zod_1.z.object({
    roleId: zod_1.z.string(),
});
exports.loginUserSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
