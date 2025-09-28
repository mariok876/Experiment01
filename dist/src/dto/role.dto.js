"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignRoleToUserSchema = exports.assignPermissionsSchema = exports.updateRoleSchema = exports.createRoleSchema = void 0;
const zod_1 = require("zod");
exports.createRoleSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string().optional(),
});
exports.updateRoleSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
});
exports.assignPermissionsSchema = zod_1.z.object({
    permissionIds: zod_1.z.array(zod_1.z.string()),
});
exports.assignRoleToUserSchema = zod_1.z.object({
    userId: zod_1.z.string(),
    roleId: zod_1.z.string(),
});
