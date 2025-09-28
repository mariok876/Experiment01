
import { z } from 'zod';
import { createUserSchema, updateUserSchema } from '../dto/user.dto';
import bcrypt from 'bcrypt';
import prisma from '../lib/prisma';

export const createUser = async (data: z.infer<typeof createUserSchema>) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
        data: {
            email: data.email,
            password: hashedPassword,
            roleId: data.roleId,
        },
    });
    return user;
};

export const getUsers = async (page: number, limit: number) => {
    const skip = (page - 1) * limit;
    const [users, total] = await prisma.$transaction([
        prisma.user.findMany({
            skip,
            take: limit,
            include: { role: true },
        }),
        prisma.user.count(),
    ]);
    return { users, total };
};

export const getUser = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: { id },
        include: { role: true },
    });
    return user;
};

export const updateUser = async (id: string, data: z.infer<typeof updateUserSchema>) => {
    const updateData: any = { ...data };

    if (data.password) {
        updateData.password = await bcrypt.hash(data.password, 10);
    }

    const user = await prisma.user.update({
        where: { id },
        data: updateData,
    });
    return user;
};

export const deleteUser = async (id: string) => {
    await prisma.$transaction([
        prisma.session.deleteMany({ where: { userId: id } }),
        prisma.user.delete({ where: { id } }),
    ]);
};

export const assignRole = async (userId: string, roleId: string) => {
    const user = await prisma.user.update({
        where: { id: userId },
        data: { roleId },
        include: { role: true },
    });

    return user;
};
