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
exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = exports.createUser = void 0;
const userService = __importStar(require("../services/user.service"));
const user_dto_1 = require("../dto/user.dto");
const createUser = async (req, res) => {
    const validatedData = user_dto_1.createUserSchema.parse(req.body);
    const user = await userService.createUser(validatedData);
    res.status(201).json(user);
};
exports.createUser = createUser;
const getUsers = async (req, res) => {
    const users = await userService.getUsers();
    res.status(200).json(users);
};
exports.getUsers = getUsers;
const getUser = async (req, res) => {
    const { id } = req.params;
    const user = await userService.getUser(id);
    if (user) {
        res.status(200).json(user);
    }
    else {
        res.status(404).json({ message: "User not found" });
    }
};
exports.getUser = getUser;
const updateUser = async (req, res) => {
    const { id } = req.params;
    const validatedData = user_dto_1.updateUserSchema.parse(req.body);
    const user = await userService.updateUser(id, validatedData);
    res.status(200).json(user);
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    const { id } = req.params;
    await userService.deleteUser(id);
    res.status(204).send();
};
exports.deleteUser = deleteUser;
