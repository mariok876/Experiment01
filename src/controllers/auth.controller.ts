
import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { registerSchema } from '../dto/auth.dto';
import { loginSchema } from '../dto/login.dto';

export const register = async (req: Request, res: Response) => {
  const validatedData = registerSchema.parse(req.body);
  const { accessToken, refreshToken } = await authService.register(validatedData, req.headers['user-agent'], req.ip);
  res.status(201).json({ accessToken, refreshToken });
};

export const login = async (req: Request, res: Response) => {
  const validatedData = loginSchema.parse(req.body);
  const { accessToken, refreshToken } = await authService.login(validatedData, req.headers['user-agent'], req.ip);
  res.status(200).json({ accessToken, refreshToken });
};

export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token is required' });
  }
  const tokens = await authService.refreshToken(refreshToken);
  res.status(200).json(tokens);
};

export const logout = async (req: Request, res: Response) => {
  const { refreshToken, allDevices } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token is required' });
  }
  await authService.logout(refreshToken, allDevices);
  res.status(200).json({ message: 'Logged out successfully' });
};

export const getSessions = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const userId = req.user.userId;
  const sessions = await authService.getActiveSessions(userId);
  res.status(200).json(sessions);
};

export const revokeSession = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const userId = req.user.userId;
    await authService.revokeSession(id, userId);
    res.status(200).json({ message: 'Session revoked successfully' });
};
