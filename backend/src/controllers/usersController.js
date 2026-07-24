import Course from '../models/course.js';
import Enrollment from '../models/enrollment.js';
import Module from '../models/module.js';
import Topic from '../models/topic.js';
import { TopicProgress } from '../models/progress.js';

async function courseWithTotals(course) {
  const [totalModules, totalEnrollments] = await Promise.all([
    Module.countDocuments({ courseId: course._id }),
    Enrollment.countDocuments({ courseId: course._id }),
  ]);

  return {
    ...course,
    id: String(course._id),
    totalModules,
    totalEnrollments,
    thumbnailUrl: course.thumbnailUrl || null,
    createdAt: course.createdAt ? new Date(course.createdAt).toISOString() : undefined,
  };
}

export async function getDashboard(req, res, next) {
  try {
    const userId = req.user.id;
    const enrollments = await Enrollment.find({ userId }).sort({ enrolledAt: -1 }).lean();

    const enrolledCourses = await Promise.all(
      enrollments.map(async (enrollment) => {
        const course = await Course.findById(enrollment.courseId).lean();
        if (!course) return null;

        const modules = await Module.find({ courseId: course._id }).lean();
        const topics = modules.length
          ? await Topic.find({ moduleId: { $in: modules.map((mod) => mod._id) } }).lean()
          : [];
        const completed = topics.length
          ? await TopicProgress.find({
              userId,
              topicId: { $in: topics.map((topic) => topic._id) },
              completed: true,
            }).lean()
          : [];
        const percentComplete = topics.length ? Math.round((completed.length / topics.length) * 100) : 0;

        return {
          course: await courseWithTotals(course),
          percentComplete,
          lastAccessed: new Date(enrollment.enrolledAt).toISOString(),
        };
      }),
    );

    const validEnrolled = enrolledCourses.filter(Boolean);

    res.json({
      totalEnrolled: validEnrolled.length,
      totalCompleted: validEnrolled.filter((item) => item.percentComplete === 100).length,
      totalInProgress: validEnrolled.filter((item) => item.percentComplete > 0 && item.percentComplete < 100).length,
      recentActivity: [],
      enrolledCourses: validEnrolled,
    });
  } catch (err) {
    next(err);
  }
}
