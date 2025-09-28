"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationQuerySchema = exports.idParamsSchema = void 0;
const zod_1 = require("zod");
exports.idParamsSchema = zod_1.z.object({
    id: zod_1.z.string(),
});
exports.paginationQuerySchema = zod_1.z.object({
    page: zod_1.z.string().optional(),
    limit: zod_1.z.string().optional(),
});
