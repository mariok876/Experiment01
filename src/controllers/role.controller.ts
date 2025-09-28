
import { Request, Response } from 'express';
import { createRoleSchema, assignPermissionsSchema } from '../dto/role.dto';
import * as roleService from '../services/role.service';

export const createRole = async (req: Request, res: Response) => {
    const validatedData = createRoleSchema.parse(req.body);
    const role = await roleService.createRole(validatedData);
    res.status(201).json(role);
};

export const getRoles = async (req: Request, res: Response) => {
    const roles = await roleService.getRoles();
    res.status(200).json(roles);
};

export const getRole = async (req: Request, res: Response) => {
    const { id } = req.params;
    const role = await roleService.getRoleById(id);
    if (role) {
        res.status(200).json(role);
    } else {
        res.status(404).json({ message: "Role not found" });
    }
};

export const updateRole = async (req: Request, res: Response) => {
    const { id } = req.params;
    const validatedData = createRoleSchema.parse(req.body);
    const role = await roleService.updateRole(id, validatedData);
    res.status(200).json(role);
};

export const deleteRole = async (req: Request, res: Response) => {
    const { id } = req.params;
    await roleService.deleteRole(id);
    res.status(204).send();
};

export const assignPermissions = async (req: Request, res: Response) => {
    const { roleId } = req.params;
    const { permissionIds } = assignPermissionsSchema.parse(req.body);

    const role = await roleService.assignPermissionsToRole(roleId, permissionIds);

    res.status(200).json(role);
};
