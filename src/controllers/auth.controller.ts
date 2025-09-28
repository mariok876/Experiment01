
import { Request, Response } from 'express';
import { prisma } from '../prisma';
import { AppError } from '../errors/AppError';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class AuthController {
    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new AppError('Email and password are required', 400);
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new AppError('Invalid credentials', 401);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new AppError('Invalid credentials', 401);
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'default_secret', {
            expiresIn: '1d',
        });

        const { password: _, ...userWithoutPassword } = user;

        return res.status(200).json({
            user: userWithoutPassword,
            token,
        });
    }

    async getMe(req: Request, res: Response) {
        const userId = req.user.id;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                roles: {
                    include: {
                        role: {
                            include: {
                                permissions: {
                                    include: {
                                        permission: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (!user) {
            throw new AppError('User not found', 404);
        }

        const { password, ...userWithoutPassword } = user;

        const roles = user.roles.map(userRole => userRole.role.name);

        const permissions = new Set<string>();
        user.roles.forEach(userRole => {
            userRole.role.permissions.forEach(rolePermission => {
                permissions.add(rolePermission.permission.name);
            });
        });

        return res.status(200).json({
            user: userWithoutPassword,
            roles: Array.from(roles),
            permissions: Array.from(permissions),
        });
    }
}

export default new AuthController();
