
import { updatePermissionSchema } from '../dto/permission.dto';
import { z } from 'zod';
import prisma from '../lib/prisma';

export const getPermissions = async (page: number, limit: number) => {
    const skip = (page - 1) * limit;
    const [permissions, total] = await prisma.$transaction([
        prisma.permission.findMany({
            skip,
            take: limit,
        }),
        prisma.permission.count(),
    ]);
    return { permissions, total };
};

export const getPermissionById = async (id: string) => {
    const permission = await prisma.permission.findUnique({
        where: { id },
    });
    return permission;
};

export const updatePermission = async (id: string, data: z.infer<typeof updatePermissionSchema>) => {
    const permission = await prisma.permission.update({
        where: { id },
        data: data,
    });
    return permission;
};
