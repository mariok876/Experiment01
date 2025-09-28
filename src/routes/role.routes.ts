
import { Router } from 'express';
import * as roleController from '../controllers/role.controller';
import { authenticate } from '../middleware/auth.middleware';
import { authorize } from '../middleware/authorize.middleware';

const router = Router();

router.post(
  '/',
  authenticate,
  authorize(['create_role']),
  roleController.createRole
);

router.get(
    '/',
    authenticate,
    authorize(['view_roles']),
    roleController.getRoles
);

router.get(
    '/:id',
    authenticate,
    authorize(['view_roles']),
    roleController.getRole
);

router.put(
    '/:id',
    authenticate,
    authorize(['edit_role']),
    roleController.updateRole
);

router.delete(
    '/:id',
    authenticate,
    authorize(['delete_role']),
    roleController.deleteRole
);

export default router;
