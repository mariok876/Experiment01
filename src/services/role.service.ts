
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

export const getRoles = async (page: number, limit: number) => {
    const skip = (page - 1) * limit;
    const [roles, total] = await prisma.$transaction([
        prisma.role.findMany({
            skip,
            take: limit,
            include: { permissions: true },
        }),
        prisma.role.count(),
    ]);
    return { roles, total };
};

export const getRoleById = async (id: string) => {
    const role = await prisma.role.findUnique({
        where: { id },
        include: { permissions: true },
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

export const assignRoleToUser = async (userId: string, roleId: string) => {
    const user = await prisma.user.update({
        where: { id: userId },
        data: {
            role: { connect: { id: roleId } }
        },
        include: { role: true }
    });

    return user;
};
