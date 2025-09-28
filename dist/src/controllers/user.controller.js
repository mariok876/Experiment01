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
exports.assignRole = exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = exports.createUser = void 0;
const userService = __importStar(require("../services/user.service"));
const user_dto_1 = require("../dto/user.dto");
const response_handler_1 = require("../utils/response.handler");
const response_dto_1 = require("../dto/response.dto");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = user_dto_1.createUserSchema.parse(req.body);
        const user = yield userService.createUser(validatedData);
        (0, response_handler_1.sendSuccess)(res, response_dto_1.userResponseSchema.parse(user), 'User created successfully', 201);
    }
    catch (error) {
        next(error);
    }
});
exports.createUser = createUser;
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const { users, total } = yield userService.getUsers(page, limit);
        (0, response_handler_1.sendSuccess)(res, response_dto_1.usersResponseSchema.parse(users), 'Users retrieved successfully', 200, {
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            totalItems: total
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getUsers = getUsers;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield userService.getUser(id);
        if (user) {
            (0, response_handler_1.sendSuccess)(res, response_dto_1.userResponseSchema.parse(user), 'User retrieved successfully');
        }
        else {
            (0, response_handler_1.sendError)(res, 'User not found', 404);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getUser = getUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const validatedData = user_dto_1.updateUserSchema.parse(req.body);
        const user = yield userService.updateUser(id, validatedData);
        (0, response_handler_1.sendSuccess)(res, response_dto_1.userResponseSchema.parse(user), 'User updated successfully');
    }
    catch (error) {
        next(error);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield userService.deleteUser(id);
        (0, response_handler_1.sendSuccess)(res, null, 'User deleted successfully', 204);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUser = deleteUser;
const assignRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { roleId } = user_dto_1.assignRoleSchema.parse(req.body);
        const user = yield userService.assignRole(id, roleId);
        (0, response_handler_1.sendSuccess)(res, response_dto_1.userResponseSchema.parse(user), 'Role assigned successfully');
    }
    catch (error) {
        next(error);
    }
});
exports.assignRole = assignRole;
