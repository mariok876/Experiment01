
import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { authenticate } from '../middleware/auth.middleware';
import { authorize } from '../middleware/authorize.middleware';

const router = Router();

router.post(
  '/',
  authenticate,
  authorize(['ADMIN']),
  userController.createUser
);
router.get('/', authenticate, authorize(['ADMIN']),
userController.getUsers);
router.get('/:id', authenticate, authorize(['ADMIN']),
userController.getUser);
router.put(
  '/:id',
  authenticate,
  authorize(['ADMIN']),
  userController.updateUser
);
router.delete(
  '/:id',
  authenticate,
  authorize(['ADMIN']),
  userController.deleteUser
);

export default router;
