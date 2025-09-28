"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.revokeSession = exports.getActiveSessions = exports.logout = exports.refreshToken = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const userService = __importStar(require("./user.service"));
const generateTokens = (userId) => {
    const accessToken = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
    const refreshToken = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
};
const register = (data, userAgent, ipAddress) => __awaiter(void 0, void 0, void 0, function* () {
    const userRole = yield prisma_1.default.role.findUnique({
        where: { name: 'USER' },
    });
    if (!userRole) {
        throw new AppError_1.default('Default user role not found. Please seed the database.', 500);
    }
    const user = yield userService.createUser(Object.assign(Object.assign({}, data), { roleId: userRole.id }));
    const { accessToken, refreshToken } = generateTokens(user.id);
    yield prisma_1.default.session.create({
        data: {
            refreshToken,
            userId: user.id,
            userAgent,
            ipAddress,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
    });
    return { accessToken, refreshToken };
});
exports.register = register;
const login = (data, userAgent, ipAddress) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userService.loginUser(data);
    const { accessToken, refreshToken } = generateTokens(user.id);
    yield prisma_1.default.session.create({
        data: {
            refreshToken,
            userId: user.id,
            userAgent,
            ipAddress,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
    });
    return { accessToken, refreshToken };
});
exports.login = login;
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_SECRET);
        const session = yield prisma_1.default.session.findUnique({
            where: { refreshToken: token },
        });
        if (!session || session.expiresAt < new Date()) {
            throw new AppError_1.default('Invalid or expired refresh token', 401);
        }
        const { accessToken, refreshToken: newRefreshToken } = generateTokens(decoded.userId);
        yield prisma_1.default.session.update({
            where: { id: session.id },
            data: {
                refreshToken: newRefreshToken,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
        });
        return { accessToken, refreshToken: newRefreshToken };
    }
    catch (error) {
        if (error instanceof AppError_1.default) {
            throw error;
        }
        throw new AppError_1.default('Invalid refresh token', 401);
    }
});
exports.refreshToken = refreshToken;
const logout = (refreshToken_1, ...args_1) => __awaiter(void 0, [refreshToken_1, ...args_1], void 0, function* (refreshToken, allDevices = false) {
    const session = yield prisma_1.default.session.findUnique({
        where: { refreshToken },
        include: { user: true },
    });
    if (!session) {
        throw new AppError_1.default('Invalid refresh token', 400);
    }
    if (allDevices) {
        yield prisma_1.default.session.deleteMany({ where: { userId: session.userId } });
    }
    else {
        yield prisma_1.default.session.delete({ where: { id: session.id } });
    }
});
exports.logout = logout;
const getActiveSessions = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const sessions = yield prisma_1.default.session.findMany({
        where: { userId },
    });
    return sessions;
});
exports.getActiveSessions = getActiveSessions;
const revokeSession = (sessionId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield prisma_1.default.session.findUnique({
        where: { id: sessionId },
    });
    if (!session || session.userId !== userId) {
        throw new AppError_1.default('Session not found or user not authorized', 404);
    }
    yield prisma_1.default.session.delete({ where: { id: sessionId } });
});
exports.revokeSession = revokeSession;
