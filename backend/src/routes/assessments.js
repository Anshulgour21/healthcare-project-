import express from 'express';
import * as ctrl from '../controllers/assessmentsController.js';

const router = express.Router({ mergeParams: true });

router.get('/', ctrl.getAssessment);
router.post('/', ctrl.createOrUpdateAssessment);
router.put('/', ctrl.createOrUpdateAssessment);
router.delete('/', ctrl.deleteAssessment);

export default router;
