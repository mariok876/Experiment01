
import jwt from 'jsonwebtoken';
import AppError from './AppError';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key';

export const generateTokens = (userId: string) => {
  const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new AppError('Invalid token', 401);
  }
};

export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET);
  } catch (error) {
    throw new AppError('Invalid refresh token', 401);
  }
};
