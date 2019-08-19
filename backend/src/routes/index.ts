/**
 * Mainfile for all route files.
 */

import { Router } from 'express';
import routes from './basketRoutes';

const router = Router();

router.use('/api', routes);

export default router;
