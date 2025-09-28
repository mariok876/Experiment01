
import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { authenticate } from '../middlewares/authenticate';

const authRouter = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticate user and get a token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Authentication successful
 *       401:
 *         description: Invalid credentials
 */
authRouter.post('/login', AuthController.login);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current user info, roles, and permissions
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User information, roles, and permissions retrieved successfully
 *       401:
 *         description: Unauthorized
 */
authRouter.get('/me', authenticate, AuthController.getMe);

export { authRouter };
