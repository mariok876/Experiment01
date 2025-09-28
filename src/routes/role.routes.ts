
import { Router } from 'express';
import * as roleController from '../controllers/role.controller';
import { authenticate } from '../middleware/auth.middleware';
import { authorize } from '../middleware/authorize.middleware';
import { validate } from '../middleware/validate';
import { createRoleSchema, updateRoleSchema, assignPermissionsSchema, assignRoleToUserSchema } from '../dto/role.dto';
import { idParamsSchema, paginationQuerySchema } from '../dto/request.dto';
import { z } from 'zod';

const router = Router();

router.post(
  '/',
  authenticate,
  authorize(['role:create']),
  validate({ body: createRoleSchema }),
  roleController.createRole
);

router.get(
    '/',
    authenticate,
    authorize(['role:view:all']),
    validate({ query: paginationQuerySchema }),
    roleController.getRoles
);

router.get(
    '/:id',
    authenticate,
    authorize(['role:view']),
    validate({ params: idParamsSchema }),
    roleController.getRole
);

router.put(
    '/:id',
    authenticate,
    authorize(['role:update']),
    validate({ params: idParamsSchema, body: updateRoleSchema }),
    roleController.updateRole
);

router.delete(
    '/:id',
    authenticate,
    authorize(['role:delete']),
    validate({ params: idParamsSchema }),
    roleController.deleteRole
);

router.post(
    '/assign-role',
    authenticate,
    authorize(['role:assign']),
    validate({ body: assignRoleToUserSchema }),
    roleController.assignRoleToUser
);

router.post(
    '/:roleId/assign-permissions',
    authenticate,
    authorize(['role:assign-permissions']),
    validate({ params: z.object({ roleId: z.string() }), body: assignPermissionsSchema }),
    roleController.assignPermissions
);

export default router;
