import Assessment from '../models/assessment.js';

export async function getAssessment(req, res, next) {
  try {
    const assessment = await Assessment.findOne({ moduleId: req.params.moduleId }).lean();
    if (!assessment) return res.status(404).json({ error: 'Not found' });
    res.json(assessment);
  } catch (err) { next(err); }
}

export async function createOrUpdateAssessment(req, res, next) {
  try {
    const { moduleId } = req.params;
    const payload = { ...req.body, moduleId };
    const existing = await Assessment.findOne({ moduleId });
    if (existing) {
      Object.assign(existing, payload);
      await existing.save();
      return res.json(existing);
    }
    const doc = await Assessment.create(payload);
    res.status(201).json(doc);
  } catch (err) { next(err); }
}

export async function deleteAssessment(req, res, next) {
  try {
    await Assessment.findOneAndDelete({ moduleId: req.params.moduleId });
    res.status(204).end();
  } catch (err) { next(err); }
}
