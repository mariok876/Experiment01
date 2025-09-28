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
exports.assignRole = exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(data.password, 10);
    const user = yield prisma_1.default.user.create({
        data: {
            email: data.email,
            password: hashedPassword,
            roleId: data.roleId,
        },
    });
    return user;
});
exports.createUser = createUser;
const getUsers = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const skip = (page - 1) * limit;
    const [users, total] = yield prisma_1.default.$transaction([
        prisma_1.default.user.findMany({
            skip,
            take: limit,
            include: { role: true },
        }),
        prisma_1.default.user.count(),
    ]);
    return { users, total };
});
exports.getUsers = getUsers;
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: { id },
        include: { role: true },
    });
    return user;
});
exports.getUser = getUser;
const updateUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const updateData = Object.assign({}, data);
    if (data.password) {
        updateData.password = yield bcrypt_1.default.hash(data.password, 10);
    }
    const user = yield prisma_1.default.user.update({
        where: { id },
        data: updateData,
    });
    return user;
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.$transaction([
        prisma_1.default.session.deleteMany({ where: { userId: id } }),
        prisma_1.default.user.delete({ where: { id } }),
    ]);
});
exports.deleteUser = deleteUser;
const assignRole = (userId, roleId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.update({
        where: { id: userId },
        data: { roleId },
        include: { role: true },
    });
    return user;
});
exports.assignRole = assignRole;
