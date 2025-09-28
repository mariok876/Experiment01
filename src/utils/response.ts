
import { Response } from 'express';

export const successResponse = (res: Response, data: any, statusCode = 200) => {
  return res.status(statusCode).json({ success: true, data });
};

export const errorResponse = (res: Response, message: string, statusCode = 500) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(statusCode).json({ success: false, message: 'Something went wrong' });
  }

  return res.status(statusCode).json({ success: false, message });
};
