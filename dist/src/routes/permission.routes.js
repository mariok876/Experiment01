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
const express_1 = require("express");
const permissionController = __importStar(require("../controllers/permission.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const authorize_middleware_1 = require("../middleware/authorize.middleware");
const validate_1 = require("../middleware/validate");
const permission_dto_1 = require("../dto/permission.dto");
const request_dto_1 = require("../dto/request.dto");
const router = (0, express_1.Router)();
router.get('/', auth_middleware_1.authenticate, (0, authorize_middleware_1.authorize)(['permission:view:all']), (0, validate_1.validate)({ query: request_dto_1.paginationQuerySchema }), permissionController.getPermissions);
router.get('/:id', auth_middleware_1.authenticate, (0, authorize_middleware_1.authorize)(['permission:view']), (0, validate_1.validate)({ params: request_dto_1.idParamsSchema }), permissionController.getPermission);
router.put('/:id', auth_middleware_1.authenticate, (0, authorize_middleware_1.authorize)(['permission:update']), (0, validate_1.validate)({ params: request_dto_1.idParamsSchema, body: permission_dto_1.updatePermissionSchema }), permissionController.updatePermission);
exports.default = router;
