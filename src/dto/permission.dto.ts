
import { z } from 'zod';

export const createPermissionSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
});

export const updatePermissionSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
});
