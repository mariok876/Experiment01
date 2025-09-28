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
exports.updatePermission = exports.getPermission = exports.getPermissions = void 0;
const permission_dto_1 = require("../dto/permission.dto");
const permissionService = __importStar(require("../services/permission.service"));
const response_handler_1 = require("../utils/response.handler");
const response_dto_1 = require("../dto/response.dto");
const getPermissions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const { permissions, total } = yield permissionService.getPermissions(page, limit);
        (0, response_handler_1.sendSuccess)(res, response_dto_1.permissionsResponseSchema.parse(permissions), 'Permissions retrieved successfully', 200, {
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getPermissions = getPermissions;
const getPermission = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const permission = yield permissionService.getPermissionById(id);
        if (permission) {
            (0, response_handler_1.sendSuccess)(res, response_dto_1.permissionResponseSchema.parse(permission), 'Permission retrieved successfully');
        }
        else {
            (0, response_handler_1.sendError)(res, 'Permission not found', 404);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getPermission = getPermission;
const updatePermission = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const validatedData = permission_dto_1.createPermissionSchema.parse(req.body);
        const permission = yield permissionService.updatePermission(id, validatedData);
        (0, response_handler_1.sendSuccess)(res, response_dto_1.permissionResponseSchema.parse(permission), 'Permission updated successfully');
    }
    catch (error) {
        next(error);
    }
});
exports.updatePermission = updatePermission;
