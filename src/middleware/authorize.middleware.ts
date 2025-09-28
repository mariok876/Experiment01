
import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response.handler';

export const authorize = (requiredPermissions: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userPermissions = req.user?.permissions || [];
    const hasPermission = requiredPermissions.every(p => userPermissions.includes(p));

    if (!hasPermission) {
      return sendError(res, 'Forbidden: You do not have the required permissions', 403);
    }

    next();
  };
};
