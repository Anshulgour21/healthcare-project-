import Topic from '../models/topic.js';

export async function listTopics(req, res, next) {
  try {
    const { moduleId } = req.params;
    const topics = await Topic.find({ moduleId }).sort({ order: 1 }).lean();
    res.json(topics);
  } catch (err) { next(err); }
}

export async function getTopic(req, res, next) {
  try {
    const topic = await Topic.findById(req.params.topicId).lean();
    if (!topic) return res.status(404).json({ error: 'Not found' });
    res.json(topic);
  } catch (err) { next(err); }
}

export async function createTopic(req, res, next) {
  try {
    const { moduleId } = req.params;
    const payload = { ...req.body, moduleId };
    const doc = await Topic.create(payload);
    res.status(201).json(doc);
  } catch (err) { next(err); }
}

export async function updateTopic(req, res, next) {
  try {
    const doc = await Topic.findByIdAndUpdate(req.params.topicId, req.body, { new: true }).lean();
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json(doc);
  } catch (err) { next(err); }
}

export async function deleteTopic(req, res, next) {
  try {
    await Topic.findByIdAndDelete(req.params.topicId);
    res.status(204).end();
  } catch (err) { next(err); }
}
