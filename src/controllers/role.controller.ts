
import { NextFunction, Request, Response } from 'express';
import { createRoleSchema, assignPermissionsSchema, assignRoleToUserSchema } from '../dto/role.dto';
import * as roleService from '../services/role.service';
import { sendError, sendSuccess } from '../utils/response.handler';
import { roleResponseSchema, rolesResponseSchema } from '../dto/response.dto';

export const createRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const role = await roleService.createRole(req.body);
        sendSuccess(res, roleResponseSchema.parse(role), 'Role created successfully', 201);
    } catch (error) {
        next(error);
    }
};

export const getRoles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const { roles, total } = await roleService.getRoles(page, limit);
        sendSuccess(res, rolesResponseSchema.parse(roles), 'Roles retrieved successfully', 200, {
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
        });
    } catch (error) {
        next(error);
    }
};

export const getRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const role = await roleService.getRoleById(id);
        if (role) {
            sendSuccess(res, roleResponseSchema.parse(role), 'Role retrieved successfully');
        } else {
            sendError(res, 'Role not found', 404);
        }
    } catch (error) {
        next(error);
    }
};

export const updateRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const role = await roleService.updateRole(id, req.body);
        sendSuccess(res, roleResponseSchema.parse(role), 'Role updated successfully');
    } catch (error) {
        next(error);
    }
};

export const deleteRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await roleService.deleteRole(id);
        sendSuccess(res, null, 'Role deleted successfully', 204);
    } catch (error) {
        next(error);
    }
};

export const assignPermissions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { roleId } = req.params;
        const { permissionIds } = req.body;
        const role = await roleService.assignPermissionsToRole(roleId, permissionIds);
        sendSuccess(res, roleResponseSchema.parse(role), 'Permissions assigned successfully');
    } catch (error) {
        next(error);
    }
};

export const assignRoleToUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, roleId } = req.body;
        const user = await roleService.assignRoleToUser(userId, roleId);
        sendSuccess(res, user, 'Role assigned successfully');
    } catch (error) {
        next(error);
    }
};
