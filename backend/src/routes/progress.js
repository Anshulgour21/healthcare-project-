import express from 'express';
import * as ctrl from '../controllers/progressController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/topics', ctrl.listTopicProgress);
router.post('/topics/complete', authMiddleware, ctrl.markTopicComplete);
router.post('/assessments/submit', authMiddleware, ctrl.submitAssessment);
router.get('/:courseId', authMiddleware, ctrl.getCourseProgress);
router.post('/:courseId/topics/:topicId/complete', authMiddleware, ctrl.markTopicComplete);

export default router;
