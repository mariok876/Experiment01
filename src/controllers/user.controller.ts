
import { Request, Response } from 'express';
import * as userService from '../services/user.service';
import { createUserSchema, updateUserSchema } from '../dto/user.dto';

export const createUser = async (req: Request, res: Response) => {
    const validatedData = createUserSchema.parse(req.body);
    const user = await userService.createUser(validatedData);
    res.status(201).json(user);
};

export const getUsers = async (req: Request, res: Response) => {
    const users = await userService.getUsers();
    res.status(200).json(users);
};

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await userService.getUser(id);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: "User not found" });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const validatedData = updateUserSchema.parse(req.body);
    const user = await userService.updateUser(id, validatedData);
    res.status(200).json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    await userService.deleteUser(id);
    res.status(204).send();
};
