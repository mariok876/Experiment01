"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePermission = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const updatePermission = async (id, data) => {
    const permission = await prisma_1.default.permission.update({
        where: { id },
        data: data,
    });
    return permission;
};
exports.updatePermission = updatePermission;
