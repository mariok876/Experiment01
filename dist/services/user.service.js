"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const createUser = async (data) => {
    const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
    const user = await prisma_1.default.user.create({
        data: {
            email: data.email,
            password: hashedPassword,
            roleId: data.roleId,
        },
    });
    return user;
};
exports.createUser = createUser;
const getUsers = async () => {
    const users = await prisma_1.default.user.findMany({
        include: { role: true },
    });
    return users;
};
exports.getUsers = getUsers;
const getUser = async (id) => {
    const user = await prisma_1.default.user.findUnique({
        where: { id },
        include: { role: true },
    });
    return user;
};
exports.getUser = getUser;
const updateUser = async (id, data) => {
    const updateData = Object.assign({}, data);
    if (data.password) {
        updateData.password = await bcrypt_1.default.hash(data.password, 10);
    }
    const user = await prisma_1.default.user.update({
        where: { id },
        data: updateData,
    });
    return user;
};
exports.updateUser = updateUser;
const deleteUser = async (id) => {
    await prisma_1.default.$transaction([
        prisma_1.default.session.deleteMany({ where: { userId: id } }),
        prisma_1.default.user.delete({ where: { id } }),
    ]);
};
exports.deleteUser = deleteUser;
