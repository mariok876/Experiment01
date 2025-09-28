"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignPermissionsToRole = exports.deleteRole = exports.getRoleById = exports.getRoles = exports.updateRole = exports.createRole = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const createRole = async (data) => {
    const role = await prisma_1.default.role.create({
        data: data,
    });
    return role;
};
exports.createRole = createRole;
const updateRole = async (id, data) => {
    const role = await prisma_1.default.role.update({
        where: { id },
        data: data,
    });
    return role;
};
exports.updateRole = updateRole;
const getRoles = async () => {
    const roles = await prisma_1.default.role.findMany();
    return roles;
};
exports.getRoles = getRoles;
const getRoleById = async (id) => {
    const role = await prisma_1.default.role.findUnique({
        where: { id },
    });
    return role;
};
exports.getRoleById = getRoleById;
const deleteRole = async (id) => {
    await prisma_1.default.role.delete({
        where: { id },
    });
};
exports.deleteRole = deleteRole;
const assignPermissionsToRole = async (roleId, permissionIds) => {
    const role = await prisma_1.default.role.update({
        where: { id: roleId },
        data: {
            permissions: {
                set: permissionIds.map((id) => ({ id: id }))
            }
        },
        include: { permissions: true }
    });
    return role;
};
exports.assignPermissionsToRole = assignPermissionsToRole;
