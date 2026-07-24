import express from 'express';
import * as ctrl from '../controllers/topicsController.js';

const router = express.Router({ mergeParams: true });

router.get('/', ctrl.listTopics);
router.post('/', ctrl.createTopic);
router.get('/:topicId', ctrl.getTopic);
router.put('/:topicId', ctrl.updateTopic);
router.delete('/:topicId', ctrl.deleteTopic);

export default router;
