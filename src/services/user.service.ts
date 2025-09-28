
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

export const getUsers = async () => {
    const users = await prisma.user.findMany({
        include: { role: true },
    });
    return users;
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
