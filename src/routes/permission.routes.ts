
import { Router } from 'express';
import * as permissionController from '../controllers/permission.controller';
import { authenticate } from '../middleware/auth.middleware';
import { authorize } from '../middleware/authorize.middleware';

const router = Router();

router.put(
    '/:id',
    authenticate,
    authorize(['edit_permission']),
    permissionController.updatePermission
);

export default router;
