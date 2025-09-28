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
const roleController = __importStar(require("../controllers/role.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const authorize_middleware_1 = require("../middleware/authorize.middleware");
const validate_1 = require("../middleware/validate");
const role_dto_1 = require("../dto/role.dto");
const request_dto_1 = require("../dto/request.dto");
const zod_1 = require("zod");
const router = (0, express_1.Router)();
router.post('/', auth_middleware_1.authenticate, (0, authorize_middleware_1.authorize)(['role:create']), (0, validate_1.validate)({ body: role_dto_1.createRoleSchema }), roleController.createRole);
router.get('/', auth_middleware_1.authenticate, (0, authorize_middleware_1.authorize)(['role:view:all']), (0, validate_1.validate)({ query: request_dto_1.paginationQuerySchema }), roleController.getRoles);
router.get('/:id', auth_middleware_1.authenticate, (0, authorize_middleware_1.authorize)(['role:view']), (0, validate_1.validate)({ params: request_dto_1.idParamsSchema }), roleController.getRole);
router.put('/:id', auth_middleware_1.authenticate, (0, authorize_middleware_1.authorize)(['role:update']), (0, validate_1.validate)({ params: request_dto_1.idParamsSchema, body: role_dto_1.updateRoleSchema }), roleController.updateRole);
router.delete('/:id', auth_middleware_1.authenticate, (0, authorize_middleware_1.authorize)(['role:delete']), (0, validate_1.validate)({ params: request_dto_1.idParamsSchema }), roleController.deleteRole);
router.post('/assign-role', auth_middleware_1.authenticate, (0, authorize_middleware_1.authorize)(['role:assign']), (0, validate_1.validate)({ body: role_dto_1.assignRoleToUserSchema }), roleController.assignRoleToUser);
router.post('/:roleId/assign-permissions', auth_middleware_1.authenticate, (0, authorize_middleware_1.authorize)(['role:assign-permissions']), (0, validate_1.validate)({ params: zod_1.z.object({ roleId: zod_1.z.string() }), body: role_dto_1.assignPermissionsSchema }), roleController.assignPermissions);
exports.default = router;
