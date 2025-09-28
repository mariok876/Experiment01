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
exports.assignPermissions = exports.deleteRole = exports.updateRole = exports.getRole = exports.getRoles = exports.createRole = void 0;
const role_dto_1 = require("../dto/role.dto");
const roleService = __importStar(require("../services/role.service"));
const createRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedData = role_dto_1.createRoleSchema.parse(req.body);
    const role = yield roleService.createRole(validatedData);
    res.status(201).json(role);
});
exports.createRole = createRole;
const getRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield roleService.getRoles();
    res.status(200).json(roles);
});
exports.getRoles = getRoles;
const getRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const role = yield roleService.getRoleById(id);
    if (role) {
        res.status(200).json(role);
    }
    else {
        res.status(404).json({ message: "Role not found" });
    }
});
exports.getRole = getRole;
const updateRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const validatedData = role_dto_1.createRoleSchema.parse(req.body);
    const role = yield roleService.updateRole(id, validatedData);
    res.status(200).json(role);
});
exports.updateRole = updateRole;
const deleteRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield roleService.deleteRole(id);
    res.status(204).send();
});
exports.deleteRole = deleteRole;
const assignPermissions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { roleId } = req.params;
    const { permissionIds } = role_dto_1.assignPermissionsSchema.parse(req.body);
    const role = yield roleService.assignPermissionsToRole(roleId, permissionIds);
    res.status(200).json(role);
});
exports.assignPermissions = assignPermissions;
