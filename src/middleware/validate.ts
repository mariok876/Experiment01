
import { Request, Response, NextFunction } from 'express';
import { z, ZodObject } from 'zod';
import { sendError } from '../utils/response.handler';
import { ParsedQs } from 'qs';
import { ParamsDictionary } from 'express-serve-static-core';

export const validate = (schema: {
  body?: ZodObject<any>;
  query?: ZodObject<any>;
  params?: ZodObject<any>;
}) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema.body) {
        req.body = await schema.body.parseAsync(req.body);
      }
      if (schema.query) {
        req.query = await schema.query.parseAsync(req.query) as ParsedQs;
      }
      if (schema.params) {
        req.params = await schema.params.parseAsync(req.params) as ParamsDictionary;
      }
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return sendError(res, 'Validation failed', 400, error.issues);
      }
      next(error);
    }
  };
};
