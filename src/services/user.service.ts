
import { z } from 'zod';
import { createUserSchema, updateUserSchema, loginUserSchema } from '../dto/user.dto';
import bcrypt from 'bcrypt';
import prisma from '../lib/prisma';
import AppError from '../utils/AppError';

const selectUser = {
    id: true,
    email: true,
    roleId: true,
    createdAt: true,
    updatedAt: true,
};

export const createUser = async (data: z.infer<typeof createUserSchema>) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
        data: {
            email: data.email,
            password: hashedPassword,
            roleId: data.roleId,
        },
        select: selectUser,
    });
    return user;
};

export const loginUser = async (data: z.infer<typeof loginUserSchema>) => {
    const user = await prisma.user.findUnique({
        where: { email: data.email },
    });

    if (!user) {
        throw new AppError('Invalid credentials', 401);
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
        throw new AppError('Invalid credentials', 401);
    }

    return user;
};

export const getUsers = async (page: number, limit: number) => {
    const skip = (page - 1) * limit;
    const [users, total] = await prisma.$transaction([
        prisma.user.findMany({
            skip,
            take: limit,
            select: selectUser,
        }),
        prisma.user.count(),
    ]);
    return { users, total };
};

export const getUser = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: { id },
        select: selectUser,
    });
    return user;
};

export const updateUser = async (id: string, data: z.infer<typeof updateUserSchema>) => {
    const updateData: Partial<z.infer<typeof updateUserSchema>> & { password?: string } = { ...data };

    if (data.password) {
        updateData.password = await bcrypt.hash(data.password, 10);
    }

    const user = await prisma.user.update({
        where: { id },
        data: updateData,
        select: selectUser,
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
        select: selectUser,
    });

    return user;
};
