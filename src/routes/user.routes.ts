
import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { authenticate } from '../middleware/auth.middleware';
import { authorize } from '../middleware/authorize.middleware';
import { validate } from '../middleware/validate';
import { createUserSchema, updateUserSchema, assignRoleSchema } from '../dto/user.dto';
import { idParamsSchema, paginationQuerySchema } from '../dto/request.dto';

const router = Router();

router.post(
  '/',
  authenticate,
  authorize(['user:create']),
  validate({ body: createUserSchema }),
  userController.createUser
);
router.get(
    '/', 
    authenticate, 
    authorize(['user:view:all']), 
    validate({ query: paginationQuerySchema }),
    userController.getUsers);
router.get(
    '/:id', 
    authenticate, 
    authorize(['user:view']), 
    validate({ params: idParamsSchema }),
    userController.getUser);
router.put(
  '/:id',
  authenticate,
  authorize(['user:update']),
  validate({ params: idParamsSchema, body: updateUserSchema }),
  userController.updateUser
);
router.delete(
  '/:id',
  authenticate,
  authorize(['user:delete']),
  validate({ params: idParamsSchema }),
  userController.deleteUser
);

router.post(
    '/:id/assign-role',
    authenticate,
    authorize(['user:assign-role']),
    validate({ params: idParamsSchema, body: assignRoleSchema }),
    userController.assignRole
);

export default router;
