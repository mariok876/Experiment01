"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionsResponseSchema = exports.sessionSchema = exports.refreshTokenResponseSchema = exports.authResponseSchema = exports.permissionsResponseSchema = exports.permissionResponseSchema = exports.rolesResponseSchema = exports.roleResponseSchema = exports.usersResponseSchema = exports.userResponseSchema = exports.responseDataSchema = void 0;
const zod_1 = require("zod");
exports.responseDataSchema = zod_1.z.object({
    id: zod_1.z.string(),
    email: zod_1.z.string(),
    role: zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
        slug: zod_1.z.string(),
    }).optional(),
});
exports.userResponseSchema = exports.responseDataSchema;
exports.usersResponseSchema = zod_1.z.array(exports.responseDataSchema);
exports.roleResponseSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    slug: zod_1.z.string(),
    permissions: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
        slug: zod_1.z.string(),
    })).optional(),
});
exports.rolesResponseSchema = zod_1.z.array(exports.roleResponseSchema);
exports.permissionResponseSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    slug: zod_1.z.string(),
});
exports.permissionsResponseSchema = zod_1.z.array(exports.permissionResponseSchema);
exports.authResponseSchema = zod_1.z.object({
    accessToken: zod_1.z.string(),
    refreshToken: zod_1.z.string(),
});
exports.refreshTokenResponseSchema = zod_1.z.object({
    accessToken: zod_1.z.string(),
    refreshToken: zod_1.z.string(),
});
exports.sessionSchema = zod_1.z.object({
    id: zod_1.z.string(),
    userAgent: zod_1.z.string().nullable(),
    ipAddress: zod_1.z.string().nullable(),
    lastUsedAt: zod_1.z.date(),
});
exports.sessionsResponseSchema = zod_1.z.array(exports.sessionSchema);
