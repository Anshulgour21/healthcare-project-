import { TopicProgress, AssessmentAttempt } from '../models/progress.js';
import Assessment from '../models/assessment.js';
import Enrollment from '../models/enrollment.js';
import Module from '../models/module.js';
import Topic from '../models/topic.js';

function getUserId(req) {
  return req.user?.id || req.body.userId || req.query.userId;
}

export async function listTopicProgress(req, res, next) {
  try {
    const q = {};
    if (req.query.userId) q.userId = req.query.userId;
    const items = await TopicProgress.find(q).lean();
    res.json(items);
  } catch (err) { next(err); }
}

export async function markTopicComplete(req, res, next) {
  try {
    const topicId = req.params.topicId || req.body.topicId;
    const userId = getUserId(req);
    if (!userId) return res.status(400).json({ error: 'Missing userId' });
    const doc = await TopicProgress.findOneAndUpdate({ userId, topicId }, { completed: true, completedAt: new Date() }, { upsert: true, new: true });
    res.json({ ...doc.toObject(), id: String(doc._id), topicId: String(doc.topicId), completed: true });
  } catch (err) { next(err); }
}

export async function getCourseProgress(req, res, next) {
  try {
    const { courseId } = req.params;
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ error: 'Not authenticated' });

    const enrollment = await Enrollment.findOne({ userId, courseId }).lean();
    if (!enrollment) {
      return res.json({
        courseId,
        totalTopics: 0,
        completedTopics: 0,
        percentComplete: 0,
        moduleProgress: [],
        isEnrolled: false,
      });
    }

    const modules = await Module.find({ courseId }).sort({ order: 1 }).lean();
    const moduleIds = modules.map((mod) => mod._id);
    const topics = moduleIds.length
      ? await Topic.find({ moduleId: { $in: moduleIds } }).lean()
      : [];
    const topicIds = topics.map((topic) => topic._id);
    const completedRows = topicIds.length
      ? await TopicProgress.find({ userId, topicId: { $in: topicIds }, completed: true }).lean()
      : [];
    const completedSet = new Set(completedRows.map((row) => String(row.topicId)));

    const moduleProgress = await Promise.all(modules.map(async (mod) => {
      const moduleTopics = topics.filter((topic) => String(topic.moduleId) === String(mod._id));
      const completedInModule = moduleTopics.filter((topic) => completedSet.has(String(topic._id))).length;
      const assessment = await Assessment.findOne({ moduleId: mod._id }).lean();
      let assessmentPassed = false;

      if (assessment) {
        assessmentPassed = !!(await AssessmentAttempt.findOne({
          userId,
          assessmentId: assessment._id,
          passed: true,
        }).lean());
      } else {
        assessmentPassed = moduleTopics.length > 0 && completedInModule === moduleTopics.length;
      }

      return {
        moduleId: String(mod._id),
        title: mod.title,
        totalTopics: moduleTopics.length,
        completedTopics: completedInModule,
        assessmentPassed,
      };
    }));

    const totalTopics = topics.length;
    const completedTopics = completedRows.length;
    const percentComplete = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

    res.json({
      courseId,
      totalTopics,
      completedTopics,
      percentComplete,
      moduleProgress,
      isEnrolled: true,
    });
  } catch (err) { next(err); }
}

export async function submitAssessment(req, res, next) {
  try {
    const { assessmentId, answers } = req.body;
    const userId = getUserId(req);
    if (!userId || !assessmentId || !Array.isArray(answers)) return res.status(400).json({ error: 'Invalid payload' });
    const assessment = await Assessment.findById(assessmentId).lean();
    if (!assessment) return res.status(404).json({ error: 'Assessment not found' });

    let correct = 0;
    for (let i = 0; i < assessment.questions.length; i++) {
      if (answers[i] === assessment.questions[i].correctOption) correct++;
    }
    const score = Math.round((correct / assessment.questions.length) * 100);
    const passed = score >= (assessment.passingScore || 70);
    const attempt = await AssessmentAttempt.create({ userId, assessmentId, score, passed });
    res.json({ attempt, score, passed });
  } catch (err) { next(err); }
}
