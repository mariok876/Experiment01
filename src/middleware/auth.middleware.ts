
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_ACCESS_SECRET as string, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user as { userId: string };
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
