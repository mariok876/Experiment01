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
Object.defineProperty(exports, "__esModule", { value: true });
exports.revokeSession = exports.getSessions = exports.logout = exports.refreshToken = exports.login = exports.register = void 0;
const authService = __importStar(require("../services/auth.service"));
const auth_dto_1 = require("../dto/auth.dto");
const login_dto_1 = require("../dto/login.dto");
const response_handler_1 = require("../utils/response.handler");
const response_dto_1 = require("../dto/response.dto");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = auth_dto_1.registerSchema.parse(req.body);
        const { accessToken, refreshToken } = yield authService.register(validatedData, req.headers['user-agent'], req.ip);
        (0, response_handler_1.sendSuccess)(res, response_dto_1.authResponseSchema.parse({ accessToken, refreshToken }), 'User registered successfully', 201);
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = login_dto_1.loginSchema.parse(req.body);
        const { accessToken, refreshToken } = yield authService.login(validatedData, req.headers['user-agent'], req.ip);
        (0, response_handler_1.sendSuccess)(res, response_dto_1.authResponseSchema.parse({ accessToken, refreshToken }), 'Login successful');
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const refreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refreshToken } = req.body;
        const tokens = yield authService.refreshToken(refreshToken);
        (0, response_handler_1.sendSuccess)(res, response_dto_1.refreshTokenResponseSchema.parse(tokens), 'Token refreshed successfully');
    }
    catch (error) {
        next(error);
    }
});
exports.refreshToken = refreshToken;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refreshToken, allDevices } = req.body;
        yield authService.logout(refreshToken, allDevices);
        (0, response_handler_1.sendSuccess)(res, null, 'Logged out successfully');
    }
    catch (error) {
        next(error);
    }
});
exports.logout = logout;
const getSessions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.userId;
        const sessions = yield authService.getActiveSessions(userId);
        (0, response_handler_1.sendSuccess)(res, response_dto_1.sessionsResponseSchema.parse(sessions), 'Sessions retrieved successfully');
    }
    catch (error) {
        next(error);
    }
});
exports.getSessions = getSessions;
const revokeSession = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.user.userId;
        yield authService.revokeSession(id, userId);
        (0, response_handler_1.sendSuccess)(res, null, 'Session revoked successfully');
    }
    catch (error) {
        next(error);
    }
});
exports.revokeSession = revokeSession;
