import express from 'express';
import * as ctrl from '../controllers/coursesController.js';

const router = express.Router();

router.get('/', ctrl.listCourses);
router.get('/stats', ctrl.getCourseStats);
router.get('/:id', ctrl.getCourse);
router.post('/', ctrl.createCourse);
router.put('/:id', ctrl.updateCourse);
router.delete('/:id', ctrl.deleteCourse);

export default router;
