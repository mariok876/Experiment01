
import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  password: z.string().min(8),
});

export const loginUserSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});
