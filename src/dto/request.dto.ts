
import { z } from 'zod';

export const idParamsSchema = z.object({
  id: z.string(),
});

export const paginationQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
});
