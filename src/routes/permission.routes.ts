
import { Router } from 'express';
import * as permissionController from '../controllers/permission.controller';
import { authenticate } from '../middleware/auth.middleware';
import { authorize } from '../middleware/authorize.middleware';
import { validate } from '../middleware/validate';
import { updatePermissionSchema } from '../dto/permission.dto';
import { idParamsSchema, paginationQuerySchema } from '../dto/request.dto';

const router = Router();

router.get(
    '/',
    authenticate,
    authorize(['permission:view:all']),
    validate({ query: paginationQuerySchema }),
    permissionController.getPermissions
);

router.get(
    '/:id',
    authenticate,
    authorize(['permission:view']),
    validate({ params: idParamsSchema }),
    permissionController.getPermission
);

router.put(
    '/:id',
    authenticate,
    authorize(['permission:update']),
    validate({ params: idParamsSchema, body: updatePermissionSchema }),
    permissionController.updatePermission
);

export default router;
