
import { NextFunction, Request, Response } from 'express';
import * as userService from '../services/user.service';
import { assignRoleSchema, createUserSchema, updateUserSchema } from '../dto/user.dto';
import { sendError, sendSuccess } from '../utils/response.handler';
import { userResponseSchema, usersResponseSchema } from '../dto/response.dto';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = createUserSchema.parse(req.body);
        const user = await userService.createUser(validatedData);
        sendSuccess(res, userResponseSchema.parse(user), 'User created successfully', 201);
    } catch (error) {
        next(error);
    }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const { users, total } = await userService.getUsers(page, limit);
        sendSuccess(res, usersResponseSchema.parse(users), 'Users retrieved successfully', 200, { 
            page, 
            limit, 
            totalPages: Math.ceil(total / limit), 
            totalItems: total 
        });
    } catch (error) {
        next(error);
    }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user = await userService.getUser(id);
        if (user) {
            sendSuccess(res, userResponseSchema.parse(user), 'User retrieved successfully');
        } else {
            sendError(res, 'User not found', 404);
        }
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const validatedData = updateUserSchema.parse(req.body);
        const user = await userService.updateUser(id, validatedData);
        sendSuccess(res, userResponseSchema.parse(user), 'User updated successfully');
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await userService.deleteUser(id);
        sendSuccess(res, null, 'User deleted successfully', 204);
    } catch (error) {
        next(error);
    }
};

export const assignRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { roleId } = assignRoleSchema.parse(req.body);
        const user = await userService.assignRole(id, roleId);
        sendSuccess(res, userResponseSchema.parse(user), 'Role assigned successfully');
    } catch (error) {
        next(error);
    }
};
