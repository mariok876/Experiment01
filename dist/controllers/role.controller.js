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
exports.assignPermissions = exports.deleteRole = exports.updateRole = exports.getRole = exports.getRoles = exports.createRole = void 0;
const role_dto_1 = require("../dto/role.dto");
const roleService = __importStar(require("../services/role.service"));
const createRole = async (req, res) => {
    const validatedData = role_dto_1.createRoleSchema.parse(req.body);
    const role = await roleService.createRole(validatedData);
    res.status(201).json(role);
};
exports.createRole = createRole;
const getRoles = async (req, res) => {
    const roles = await roleService.getRoles();
    res.status(200).json(roles);
};
exports.getRoles = getRoles;
const getRole = async (req, res) => {
    const { id } = req.params;
    const role = await roleService.getRoleById(id);
    if (role) {
        res.status(200).json(role);
    }
    else {
        res.status(404).json({ message: "Role not found" });
    }
};
exports.getRole = getRole;
const updateRole = async (req, res) => {
    const { id } = req.params;
    const validatedData = role_dto_1.createRoleSchema.parse(req.body);
    const role = await roleService.updateRole(id, validatedData);
    res.status(200).json(role);
};
exports.updateRole = updateRole;
const deleteRole = async (req, res) => {
    const { id } = req.params;
    await roleService.deleteRole(id);
    res.status(204).send();
};
exports.deleteRole = deleteRole;
const assignPermissions = async (req, res) => {
    const { roleId } = req.params;
    const { permissionIds } = role_dto_1.assignPermissionsSchema.parse(req.body);
    const role = await roleService.assignPermissionsToRole(roleId, permissionIds);
    res.status(200).json(role);
};
exports.assignPermissions = assignPermissions;
