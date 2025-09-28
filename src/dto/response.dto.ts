
import { z } from 'zod';

export const responseDataSchema = z.object({
  id: z.string(),
  email: z.string(),
  role: z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
  }).optional(),
});

export const userResponseSchema = responseDataSchema;

export const usersResponseSchema = z.array(responseDataSchema);


export const roleResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    permissions: z.array(z.object({
        id: z.string(),
        name: z.string(),
        slug: z.string(),
    })).optional(),
});

export const rolesResponseSchema = z.array(roleResponseSchema);

export const permissionResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
});

export const permissionsResponseSchema = z.array(permissionResponseSchema);

export const authResponseSchema = z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
});

export const refreshTokenResponseSchema = z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
});

export const sessionSchema = z.object({
    id: z.string(),
    userAgent: z.string().nullable(),
    ipAddress: z.string().nullable(),
    lastUsedAt: z.date(),
});

export const sessionsResponseSchema = z.array(sessionSchema);
