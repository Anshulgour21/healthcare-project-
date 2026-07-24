import express from 'express';
import * as ctrl from '../controllers/enrollmentsController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', ctrl.listEnrollments);
router.post('/', authMiddleware, ctrl.createEnrollment);
router.delete('/:id', ctrl.deleteEnrollment);

export default router;
