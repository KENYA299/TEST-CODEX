import { Router } from 'express';
import { getSession, loginAdmin } from '../controllers/authController.js';
import { requireAdminAuth } from '../middleware/authMiddleware.js';

const authRouter = Router();

authRouter.post('/login', loginAdmin);
authRouter.get('/session', requireAdminAuth, getSession);

export default authRouter;
