import Course from '../models/course.js';
import Module from '../models/module.js';
import Topic from '../models/topic.js';
import Enrollment from '../models/enrollment.js';

function serialize(doc) {
  if (!doc) return doc;
  return {
    ...doc,
    id: String(doc._id),
    createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : undefined,
    thumbnailUrl: doc.thumbnailUrl || null,
  };
}

async function enrichCourse(course) {
  const [totalModules, totalEnrollments] = await Promise.all([
    Module.countDocuments({ courseId: course._id }),
    Enrollment.countDocuments({ courseId: course._id }),
  ]);

  return {
    ...serialize(course),
    totalModules,
    totalEnrollments,
  };
}

async function getModulesWithTopics(courseId) {
  const modules = await Module.find({ courseId }).sort({ order: 1 }).lean();
  return Promise.all(
    modules.map(async (mod) => {
      const topics = await Topic.find({ moduleId: mod._id }).sort({ order: 1 }).lean();
      return {
        ...serialize(mod),
        totalTopics: topics.length,
        topics: topics.map(serialize),
      };
    }),
  );
}

export async function listCourses(req, res, next) {
  try {
    const query = {};
    if (req.query.category) query.category = req.query.category;
    if (req.query.search) query.title = { $regex: req.query.search, $options: 'i' };

    const rows = await Course.find(query).sort({ createdAt: -1 }).lean();
    const courses = await Promise.all(rows.map(enrichCourse));
    res.json(courses);
  } catch (err) { next(err); }
}

export async function getCourse(req, res, next) {
  try {
    const course = await Course.findById(req.params.id).lean();
    if (!course) return res.status(404).json({ error: 'Not found' });
    const [enriched, modules] = await Promise.all([
      enrichCourse(course),
      getModulesWithTopics(course._id),
    ]);
    res.json({ ...enriched, modules });
  } catch (err) { next(err); }
}

export async function getCourseStats(req, res, next) {
  try {
    const [totalCourses, totalEnrollments, categoryCountsRaw, topCoursesRaw] = await Promise.all([
      Course.countDocuments(),
      Enrollment.countDocuments(),
      Course.aggregate([{ $group: { _id: '$category', count: { $sum: 1 } } }]),
      Enrollment.aggregate([
        { $group: { _id: '$courseId', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
      ]),
    ]);

    const topCourseIds = topCoursesRaw.map((item) => item._id);
    const topRows = topCourseIds.length
      ? await Course.find({ _id: { $in: topCourseIds } }).lean()
      : [];
    const topCourses = await Promise.all(topRows.map(enrichCourse));

    res.json({
      totalCourses,
      totalEnrollments,
      categoryCounts: categoryCountsRaw.map((item) => ({ category: item._id, count: item.count })),
      topCourses,
    });
  } catch (err) { next(err); }
}

export async function createCourse(req, res, next) {
  try {
    const doc = await Course.create(req.body);
    res.status(201).json(doc);
  } catch (err) { next(err); }
}

export async function updateCourse(req, res, next) {
  try {
    const doc = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean();
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json(doc);
  } catch (err) { next(err); }
}

export async function deleteCourse(req, res, next) {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) { next(err); }
}
