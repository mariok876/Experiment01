
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { registerSchema } from '../dto/auth.dto';
import { loginSchema } from '../dto/login.dto';
import prisma from '../lib/prisma';

const generateTokens = (userId: string) => {
  const accessToken = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET as string, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET as string, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};

export const register = async (data: z.infer<typeof registerSchema>, userAgent?: string, ipAddress?: string) => {
  const userRole = await prisma.role.findUnique({
    where: { name: 'USER' },
  });

  if (!userRole) {
    throw new Error('Default user role not found. Please seed the database.');
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      roleId: userRole.id,
    },
  });

  const { accessToken, refreshToken } = generateTokens(user.id);

  await prisma.session.create({
    data: {
      refreshToken,
      userId: user.id,
      userAgent,
      ipAddress,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return { accessToken, refreshToken };
};

export const login = async (data: z.infer<typeof loginSchema>, userAgent?: string, ipAddress?: string) => {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  const { accessToken, refreshToken } = generateTokens(user.id);

  await prisma.session.create({
    data: {
      refreshToken,
      userId: user.id,
      userAgent,
      ipAddress,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return { accessToken, refreshToken };
};

export const refreshToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string) as { userId: string };
    const session = await prisma.session.findUnique({
      where: { refreshToken: token },
    });

    if (!session || session.expiresAt < new Date()) {
      throw new Error('Invalid or expired refresh token');
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(decoded.userId);

    await prisma.session.update({
      where: { id: session.id },
      data: {
        refreshToken: newRefreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return { accessToken, refreshToken: newRefreshToken };
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};

export const logout = async (refreshToken: string, allDevices: boolean = false) => {
    const session = await prisma.session.findUnique({
        where: { refreshToken },
        include: { user: true },
    });

    if (!session) {
        throw new Error('Invalid refresh token');
    }

    if (allDevices) {
        await prisma.session.deleteMany({ where: { userId: session.userId } });
    } else {
        await prisma.session.delete({ where: { id: session.id } });
    }
};

export const getActiveSessions = async (userId: string) => {
  const sessions = await prisma.session.findMany({
    where: { userId },
  });
  return sessions;
};

export const revokeSession = async (sessionId: string, userId: string) => {
    const session = await prisma.session.findUnique({
        where: { id: sessionId },
    });

    if (!session || session.userId !== userId) {
        throw new Error('Session not found or user not authorized');
    }

    await prisma.session.delete({ where: { id: sessionId } });
};
