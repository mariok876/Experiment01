
import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  roleId: z.string(),
});

export const updateUserSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  roleId: z.string().optional(),
});

export const assignRoleSchema = z.object({
  roleId: z.string(),
});

export const loginUserSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});
