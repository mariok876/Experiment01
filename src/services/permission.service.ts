
import { updatePermissionSchema } from '../dto/permission.dto';
import { z } from 'zod';
import prisma from '../lib/prisma';

export const updatePermission = async (id: string, data: z.infer<typeof updatePermissionSchema>) => {
    const permission = await prisma.permission.update({
        where: { id },
        data: data,
    });
    return permission;
};
