
import { Router } from 'express';
import { productsRouter } from './products.routes';
import { usersRouter } from './users.routes';
import { rolesRouter } from './roles.routes';
import { permissionsRouter } from './permissions.routes';
import { authRouter } from './auth.routes';

const router = Router();

// Mount all the specific routers
router.use('/products', productsRouter);
router.use('/users', usersRouter);
router.use('/roles', rolesRouter);
router.use('/permissions', permissionsRouter);
router.use('/auth', authRouter);

export { router };
