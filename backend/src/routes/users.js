import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import * as ctrl from '../controllers/usersController.js';

const router = express.Router();

router.get('/me/dashboard', authMiddleware, ctrl.getDashboard);

export default router;
