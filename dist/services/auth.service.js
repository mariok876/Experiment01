"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.revokeSession = exports.getActiveSessions = exports.logout = exports.refreshToken = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const generateTokens = (userId) => {
    const accessToken = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
    const refreshToken = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
};
const register = async (data, userAgent, ipAddress) => {
    const userRole = await prisma_1.default.role.findUnique({
        where: { name: 'USER' },
    });
    if (!userRole) {
        throw new Error('Default user role not found. Please seed the database.');
    }
    const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
    const user = await prisma_1.default.user.create({
        data: {
            email: data.email,
            password: hashedPassword,
            roleId: userRole.id,
        },
    });
    const { accessToken, refreshToken } = generateTokens(user.id);
    await prisma_1.default.session.create({
        data: {
            refreshToken,
            userId: user.id,
            userAgent,
            ipAddress,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
    });
    return { accessToken, refreshToken };
};
exports.register = register;
const login = async (data, userAgent, ipAddress) => {
    const user = await prisma_1.default.user.findUnique({
        where: { email: data.email },
    });
    if (!user) {
        throw new Error('Invalid email or password');
    }
    const isPasswordValid = await bcrypt_1.default.compare(data.password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }
    const { accessToken, refreshToken } = generateTokens(user.id);
    await prisma_1.default.session.create({
        data: {
            refreshToken,
            userId: user.id,
            userAgent,
            ipAddress,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
    });
    return { accessToken, refreshToken };
};
exports.login = login;
const refreshToken = async (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_SECRET);
        const session = await prisma_1.default.session.findUnique({
            where: { refreshToken: token },
        });
        if (!session || session.expiresAt < new Date()) {
            throw new Error('Invalid or expired refresh token');
        }
        const { accessToken, refreshToken: newRefreshToken } = generateTokens(decoded.userId);
        await prisma_1.default.session.update({
            where: { id: session.id },
            data: {
                refreshToken: newRefreshToken,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
        });
        return { accessToken, refreshToken: newRefreshToken };
    }
    catch (error) {
        throw new Error('Invalid refresh token');
    }
};
exports.refreshToken = refreshToken;
const logout = async (refreshToken, allDevices = false) => {
    const session = await prisma_1.default.session.findUnique({
        where: { refreshToken },
        include: { user: true },
    });
    if (!session) {
        throw new Error('Invalid refresh token');
    }
    if (allDevices) {
        await prisma_1.default.session.deleteMany({ where: { userId: session.userId } });
    }
    else {
        await prisma_1.default.session.delete({ where: { id: session.id } });
    }
};
exports.logout = logout;
const getActiveSessions = async (userId) => {
    const sessions = await prisma_1.default.session.findMany({
        where: { userId },
    });
    return sessions;
};
exports.getActiveSessions = getActiveSessions;
const revokeSession = async (sessionId, userId) => {
    const session = await prisma_1.default.session.findUnique({
        where: { id: sessionId },
    });
    if (!session || session.userId !== userId) {
        throw new Error('Session not found or user not authorized');
    }
    await prisma_1.default.session.delete({ where: { id: sessionId } });
};
exports.revokeSession = revokeSession;
