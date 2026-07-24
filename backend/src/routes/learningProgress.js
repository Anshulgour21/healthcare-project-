import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import * as ctrl from '../controllers/learningProgressController.js';

const router = express.Router();

router.get('/course-progress/:courseId', authMiddleware, ctrl.getCourseProgress);
router.post('/section-progress', authMiddleware, ctrl.saveSectionProgress);
router.post('/mark-section-complete', authMiddleware, ctrl.markSectionComplete);
router.post('/assessment-submit', authMiddleware, ctrl.submitAssessment);
router.get('/assessment-result/:assessmentId', authMiddleware, ctrl.getAssessmentResult);
router.get('/course-completion-status', authMiddleware, ctrl.getCourseCompletionStatus);
router.get('/course-completion-status/:courseId', authMiddleware, ctrl.getCourseCompletionStatus);

export default router;
