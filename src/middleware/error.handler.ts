
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { JsonWebTokenError } from 'jsonwebtoken';
import { sendError } from '../utils/response.handler';
import AppError from '../utils/AppError';

export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return sendError(res, err.message, err.statusCode);
  }

  if (err instanceof ZodError) {
    return sendError(res, 'Validation error', 400, err.issues);
  }

  if (err instanceof JsonWebTokenError) {
    return sendError(res, 'Invalid token', 401);
  }

  console.error('Unhandled Error:', err);
  sendError(res, 'Something went wrong!', 500);
  next();
};
