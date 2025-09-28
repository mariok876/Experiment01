
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { sendError } from '../utils/response.handler';

interface TokenPayload {
  userId: string;
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return sendError(res, 'Unauthorized: No token provided', 401);
  }

  try {
    const decoded = verifyToken(token) as TokenPayload;
    req.user = { userId: decoded.userId, permissions: [] };
    next();
  } catch (error) {
    return sendError(res, 'Unauthorized: Invalid token', 401);
  }
};
