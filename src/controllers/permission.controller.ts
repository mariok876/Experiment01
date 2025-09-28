
import { NextFunction, Request, Response } from 'express';
import { createPermissionSchema } from '../dto/permission.dto';
import * as permissionService from '../services/permission.service';
import { sendError, sendSuccess } from '../utils/response.handler';
import { permissionResponseSchema, permissionsResponseSchema } from '../dto/response.dto';

export const getPermissions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const { permissions, total } = await permissionService.getPermissions(page, limit);
        sendSuccess(res, permissionsResponseSchema.parse(permissions), 'Permissions retrieved successfully', 200, {
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
        });
    } catch (error) {
        next(error);
    }
};

export const getPermission = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const permission = await permissionService.getPermissionById(id);
        if (permission) {
            sendSuccess(res, permissionResponseSchema.parse(permission), 'Permission retrieved successfully');
        } else {
            sendError(res, 'Permission not found', 404);
        }
    } catch (error) {
        next(error);
    }
};

export const updatePermission = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const validatedData = createPermissionSchema.parse(req.body);
        const permission = await permissionService.updatePermission(id, validatedData);
        sendSuccess(res, permissionResponseSchema.parse(permission), 'Permission updated successfully');
    } catch (error) {
        next(error);
    }
};
