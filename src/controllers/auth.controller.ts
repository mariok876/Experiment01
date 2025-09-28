
import { NextFunction, Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { registerSchema } from '../dto/auth.dto';
import { loginSchema } from '../dto/login.dto';
import { sendSuccess } from '../utils/response.handler';
import { authResponseSchema, refreshTokenResponseSchema, sessionsResponseSchema } from '../dto/response.dto';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    const { accessToken, refreshToken } = await authService.register(validatedData, req.headers['user-agent'], req.ip);
    sendSuccess(res, authResponseSchema.parse({ accessToken, refreshToken }), 'User registered successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const { accessToken, refreshToken } = await authService.login(validatedData, req.headers['user-agent'], req.ip);
    sendSuccess(res, authResponseSchema.parse({ accessToken, refreshToken }), 'Login successful');
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;
    const tokens = await authService.refreshToken(refreshToken);
    sendSuccess(res, refreshTokenResponseSchema.parse(tokens), 'Token refreshed successfully');
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken, allDevices } = req.body;
    await authService.logout(refreshToken, allDevices);
    sendSuccess(res, null, 'Logged out successfully');
  } catch (error) {
    next(error);
  }
};

export const getSessions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.userId;
    const sessions = await authService.getActiveSessions(userId);
    sendSuccess(res, sessionsResponseSchema.parse(sessions), 'Sessions retrieved successfully');
  } catch (error) {
    next(error);
  }
};

export const revokeSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user!.userId;
    await authService.revokeSession(id, userId);
    sendSuccess(res, null, 'Session revoked successfully');
  } catch (error) {
    next(error);
  }
};
