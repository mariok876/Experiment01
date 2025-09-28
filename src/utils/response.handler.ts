
import { Response } from 'express';

interface SuccessResponse<T> {
  status: string;
  message: string;
  data: T;
  meta?: unknown;
}

export const sendSuccess = <T>(
  res: Response, 
  data: T, 
  message = 'Success', 
  statusCode = 200, 
  meta?: unknown
) => {
  const response: SuccessResponse<T> = {
    status: 'success',
    message,
    data,
  };

  if (meta) {
    response.meta = meta;
  }

  return res.status(statusCode).json(response);
};

export const sendError = (res: Response, message: string, statusCode = 500, details?: unknown) => {
  return res.status(statusCode).json({
    status: 'error',
    message,
    details,
  });
};
