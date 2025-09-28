
import { createRoleSchema, updateRoleSchema } from '../dto/role.dto';
import { z } from 'zod';
import prisma from '../lib/prisma';

export const createRole = async (data: z.infer<typeof createRoleSchema>) => {
    const role = await prisma.role.create({
        data: data,
    });
    return role;
};

export const updateRole = async (id: string, data: z.infer<typeof updateRoleSchema>) => {
    const role = await prisma.role.update({
        where: { id },
        data: data,
    });
    return role;
};

export const getRoles = async () => {
    const roles = await prisma.role.findMany();
    return roles;
};

export const getRoleById = async (id: string) => {
    const role = await prisma.role.findUnique({
        where: { id },
    });
    return role;
};

export const deleteRole = async (id: string) => {
    await prisma.role.delete({
        where: { id },
    });
};

export const assignPermissionsToRole = async (roleId: string, permissionIds: string[]) => {
    const role = await prisma.role.update({
        where: { id: roleId },
        data: {
            permissions: {
                set: permissionIds.map((id) => ({ id: id }))
            }
        },
        include: { permissions: true }
    });

    return role;
};
