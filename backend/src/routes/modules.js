import express from 'express';
import * as ctrl from '../controllers/modulesController.js';

const router = express.Router({ mergeParams: true });

router.get('/', ctrl.listModules);
router.post('/', ctrl.createModule);
router.get('/:moduleId', ctrl.getModule);
router.put('/:moduleId', ctrl.updateModule);
router.delete('/:moduleId', ctrl.deleteModule);

export default router;
