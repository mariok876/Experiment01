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
exports.assignRoleToUser = exports.assignPermissionsToRole = exports.deleteRole = exports.getRoleById = exports.getRoles = exports.updateRole = exports.createRole = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const createRole = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const role = yield prisma_1.default.role.create({
        data: data,
    });
    return role;
});
exports.createRole = createRole;
const updateRole = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const role = yield prisma_1.default.role.update({
        where: { id },
        data: data,
    });
    return role;
});
exports.updateRole = updateRole;
const getRoles = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const skip = (page - 1) * limit;
    const [roles, total] = yield prisma_1.default.$transaction([
        prisma_1.default.role.findMany({
            skip,
            take: limit,
            include: { permissions: true },
        }),
        prisma_1.default.role.count(),
    ]);
    return { roles, total };
});
exports.getRoles = getRoles;
const getRoleById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const role = yield prisma_1.default.role.findUnique({
        where: { id },
        include: { permissions: true },
    });
    return role;
});
exports.getRoleById = getRoleById;
const deleteRole = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.role.delete({
        where: { id },
    });
});
exports.deleteRole = deleteRole;
const assignPermissionsToRole = (roleId, permissionIds) => __awaiter(void 0, void 0, void 0, function* () {
    const role = yield prisma_1.default.role.update({
        where: { id: roleId },
        data: {
            permissions: {
                set: permissionIds.map((id) => ({ id: id }))
            }
        },
        include: { permissions: true }
    });
    return role;
});
exports.assignPermissionsToRole = assignPermissionsToRole;
const assignRoleToUser = (userId, roleId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.update({
        where: { id: userId },
        data: {
            role: { connect: { id: roleId } }
        },
        include: { role: true }
    });
    return user;
});
exports.assignRoleToUser = assignRoleToUser;
