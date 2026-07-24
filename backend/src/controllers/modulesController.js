import Module from '../models/module.js';

export async function listModules(req, res, next) {
  try {
    const { courseId } = req.params;
    const modules = await Module.find({ courseId }).sort({ order: 1 }).lean();
    res.json(modules);
  } catch (err) { next(err); }
}

export async function getModule(req, res, next) {
  try {
    const mod = await Module.findById(req.params.moduleId).lean();
    if (!mod) return res.status(404).json({ error: 'Not found' });
    res.json(mod);
  } catch (err) { next(err); }
}

export async function createModule(req, res, next) {
  try {
    const { courseId } = req.params;
    const payload = { ...req.body, courseId };
    const doc = await Module.create(payload);
    res.status(201).json(doc);
  } catch (err) { next(err); }
}

export async function updateModule(req, res, next) {
  try {
    const doc = await Module.findByIdAndUpdate(req.params.moduleId, req.body, { new: true }).lean();
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json(doc);
  } catch (err) { next(err); }
}

export async function deleteModule(req, res, next) {
  try {
    await Module.findByIdAndDelete(req.params.moduleId);
    res.status(204).end();
  } catch (err) { next(err); }
}
