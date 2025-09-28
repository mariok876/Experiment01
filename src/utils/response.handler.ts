
import { Response } from 'express';

interface SuccessResponse<T> {
  status: string;
  message: string;
  data: T;
  meta?: any;
}

export const sendSuccess = <T>(
  res: Response, 
  data: T, 
  message = 'Success', 
  statusCode = 200, 
  meta?: any
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

export const sendError = (res: Response, message: string, statusCode = 500, details?: any) => {
  return res.status(statusCode).json({
    status: 'error',
    message,
    details,
  });
};
