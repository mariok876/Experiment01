"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignRoleSchema = void 0;
const zod_1 = require("zod");
exports.assignRoleSchema = zod_1.z.object({
    userId: zod_1.z.string(),
    roleId: zod_1.z.string(),
});
