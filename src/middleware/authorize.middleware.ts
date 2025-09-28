
import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';

export const authorize = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const userId = req.user.userId;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { role: true },
    });

    if (!user || !roles.includes(user.role.name)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  };
};
