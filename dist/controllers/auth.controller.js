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
Object.defineProperty(exports, "__esModule", { value: true });
exports.revokeSession = exports.getSessions = exports.logout = exports.refreshToken = exports.login = exports.register = void 0;
const authService = __importStar(require("../services/auth.service"));
const auth_dto_1 = require("../dto/auth.dto");
const login_dto_1 = require("../dto/login.dto");
const register = async (req, res) => {
    const validatedData = auth_dto_1.registerSchema.parse(req.body);
    const { accessToken, refreshToken } = await authService.register(validatedData, req.headers['user-agent'], req.ip);
    res.status(201).json({ accessToken, refreshToken });
};
exports.register = register;
const login = async (req, res) => {
    const validatedData = login_dto_1.loginSchema.parse(req.body);
    const { accessToken, refreshToken } = await authService.login(validatedData, req.headers['user-agent'], req.ip);
    res.status(200).json({ accessToken, refreshToken });
};
exports.login = login;
const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' });
    }
    const tokens = await authService.refreshToken(refreshToken);
    res.status(200).json(tokens);
};
exports.refreshToken = refreshToken;
const logout = async (req, res) => {
    const { refreshToken, allDevices } = req.body;
    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' });
    }
    await authService.logout(refreshToken, allDevices);
    res.status(200).json({ message: 'Logged out successfully' });
};
exports.logout = logout;
const getSessions = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const userId = req.user.userId;
    const sessions = await authService.getActiveSessions(userId);
    res.status(200).json(sessions);
};
exports.getSessions = getSessions;
const revokeSession = async (req, res) => {
    const { id } = req.params;
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const userId = req.user.userId;
    await authService.revokeSession(id, userId);
    res.status(200).json({ message: 'Session revoked successfully' });
};
exports.revokeSession = revokeSession;
