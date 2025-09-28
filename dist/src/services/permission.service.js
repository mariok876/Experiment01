"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePermission = exports.getPermissionById = exports.getPermissions = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const getPermissions = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const skip = (page - 1) * limit;
    const [permissions, total] = yield prisma_1.default.$transaction([
        prisma_1.default.permission.findMany({
            skip,
            take: limit,
        }),
        prisma_1.default.permission.count(),
    ]);
    return { permissions, total };
});
exports.getPermissions = getPermissions;
const getPermissionById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const permission = yield prisma_1.default.permission.findUnique({
        where: { id },
    });
    return permission;
});
exports.getPermissionById = getPermissionById;
const updatePermission = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const permission = yield prisma_1.default.permission.update({
        where: { id },
        data: data,
    });
    return permission;
});
exports.updatePermission = updatePermission;
