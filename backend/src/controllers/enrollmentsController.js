import Enrollment from '../models/enrollment.js';

export async function listEnrollments(req, res, next) {
  try {
    const { userId } = req.query;
    const q = {};
    if (userId) q.userId = userId;
    const items = await Enrollment.find(q).sort({ enrolledAt: -1 }).lean();
    res.json(items);
  } catch (err) { next(err); }
}

export async function createEnrollment(req, res, next) {
  try {
    const payload = {
      ...req.body,
      userId: req.user?.id || req.body.userId,
    };
    if (!payload.userId || !payload.courseId) {
      return res.status(400).json({ error: 'Missing userId or courseId' });
    }
    const doc = await Enrollment.create(payload);
    res.status(201).json(doc);
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ error: 'Already enrolled' });
    next(err);
  }
}

export async function deleteEnrollment(req, res, next) {
  try {
    await Enrollment.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) { next(err); }
}
