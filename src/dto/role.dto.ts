
import { z } from 'zod';

export const createRoleSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export const updateRoleSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
});

export const assignPermissionsSchema = z.object({
    permissionIds: z.array(z.string()),
});

export const assignRoleToUserSchema = z.object({
    userId: z.string(),
    roleId: z.string(),
});
