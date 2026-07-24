import Module from '../models/module.js';
import Topic from '../models/topic.js';
import Assessment from '../models/assessment.js';
import { AssessmentResult, SectionProgress } from '../models/sectionProgress.js';

export async function getOrderedSections(courseId) {
  const modules = await Module.find({ courseId }).sort({ order: 1 }).lean();
  const sections = [];

  for (const mod of modules) {
    const topics = await Topic.find({ moduleId: mod._id }).sort({ order: 1 }).lean();
    for (const topic of topics) {
      sections.push({
        courseId: String(courseId),
        moduleId: String(mod._id),
        sectionId: String(topic._id),
        title: topic.title,
        type: topic.contentType,
        moduleTitle: mod.title,
      });
    }
  }

  const assessmentSections = [];
  for (const mod of modules) {
    const assessment = await Assessment.findOne({ moduleId: mod._id }).lean();
    if (!assessment) continue;
    assessment.questions.forEach((question, index) => {
      assessmentSections.push({
        courseId: String(courseId),
        moduleId: `assessment:${String(mod._id)}`,
        sectionId: `${String(assessment._id)}:question:${index}`,
        assessmentId: String(assessment._id),
        title: `${mod.title} Assessment ${index + 1}`,
        type: 'assessment',
        moduleTitle: 'Final Assessment Module',
        questionIndex: index,
      });
    });
  }

  return [...sections, ...assessmentSections];
}

export async function buildProgressPayload(userId, courseId) {
  const sections = await getOrderedSections(courseId);
  const rows = await SectionProgress.find({ userId, courseId: String(courseId) }).lean();
  const rowBySection = new Map(rows.map((row) => [row.sectionId, row]));
  const completedSet = new Set(rows.filter((row) => row.status === 'completed').map((row) => row.sectionId));

  const sectionProgress = sections.map((section, index) => {
    const stored = rowBySection.get(section.sectionId);
    const unlocked = index === 0 || completedSet.has(sections[index - 1]?.sectionId);
    const status = stored?.status === 'completed'
      ? 'completed'
      : unlocked
        ? 'unlocked'
        : 'locked';

    return {
      ...section,
      status,
      videoProgress: stored?.videoProgress ?? 0,
      videoPositionSeconds: stored?.videoPositionSeconds ?? 0,
      completedAt: stored?.completedAt ?? null,
    };
  });

  const completedSections = sectionProgress.filter((section) => section.status === 'completed').length;
  const percentComplete = sectionProgress.length ? Math.round((completedSections / sectionProgress.length) * 100) : 0;

  return {
    courseId: String(courseId),
    totalSections: sectionProgress.length,
    completedSections,
    percentComplete,
    isComplete: sectionProgress.length > 0 && completedSections === sectionProgress.length,
    sections: sectionProgress,
  };
}

export async function assertSectionUnlocked(userId, courseId, sectionId) {
  const payload = await buildProgressPayload(userId, courseId);
  const section = payload.sections.find((item) => item.sectionId === sectionId);
  if (!section) {
    const err = new Error('Section not found');
    err.status = 404;
    throw err;
  }
  if (section.status === 'locked') {
    const err = new Error('Section is locked. Complete previous sections first.');
    err.status = 403;
    throw err;
  }
  return section;
}

export async function upsertSectionProgress({ userId, courseId, moduleId, sectionId, status, videoProgress, videoPositionSeconds }) {
  return SectionProgress.findOneAndUpdate(
    { userId, courseId: String(courseId), sectionId },
    {
      userId,
      courseId: String(courseId),
      moduleId,
      sectionId,
      status,
      videoProgress,
      videoPositionSeconds,
      completedAt: status === 'completed' ? new Date() : undefined,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  ).lean();
}

export async function saveAssessmentResult({ userId, courseId, assessmentId, sectionId, score, passed, answers, breakdown }) {
  return AssessmentResult.create({
    userId,
    courseId: String(courseId),
    assessmentId,
    sectionId,
    score,
    passed,
    answers,
    breakdown,
  });
}
