
import { Request, Response } from 'express';
import { createPermissionSchema } from '../dto/permission.dto';
import * as permissionService from '../services/permission.service';

export const updatePermission = async (req: Request, res: Response) => {
    const { id } = req.params;
    const validatedData = createPermissionSchema.parse(req.body);
    const permission = await permissionService.updatePermission(id, validatedData);
    res.status(200).json(permission);
};
