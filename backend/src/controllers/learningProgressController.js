import Assessment from '../models/assessment.js';
import { AssessmentResult } from '../models/sectionProgress.js';
import {
  assertSectionUnlocked,
  buildProgressPayload,
  saveAssessmentResult,
  upsertSectionProgress,
} from '../services/learningPathService.js';

function userId(req) {
  return req.user?.id;
}

export async function getCourseProgress(req, res, next) {
  try {
    res.json(await buildProgressPayload(userId(req), req.params.courseId));
  } catch (err) {
    next(err);
  }
}

export async function saveSectionProgress(req, res, next) {
  try {
    const { courseId, moduleId, sectionId, videoProgress = 0, videoPositionSeconds = 0 } = req.body;
    if (!courseId || !moduleId || !sectionId) return res.status(400).json({ error: 'courseId, moduleId and sectionId are required' });

    await assertSectionUnlocked(userId(req), courseId, sectionId);
    const progress = Number(videoProgress);
    const status = progress >= 90 ? 'completed' : 'unlocked';
    const row = await upsertSectionProgress({
      userId: userId(req),
      courseId,
      moduleId,
      sectionId,
      status,
      videoProgress: Math.max(0, Math.min(100, progress)),
      videoPositionSeconds: Number(videoPositionSeconds) || 0,
    });
    res.json(row);
  } catch (err) {
    next(err);
  }
}

export async function markSectionComplete(req, res, next) {
  try {
    const { courseId, moduleId, sectionId } = req.body;
    if (!courseId || !moduleId || !sectionId) return res.status(400).json({ error: 'courseId, moduleId and sectionId are required' });

    await assertSectionUnlocked(userId(req), courseId, sectionId);
    const row = await upsertSectionProgress({
      userId: userId(req),
      courseId,
      moduleId,
      sectionId,
      status: 'completed',
      videoProgress: 100,
      videoPositionSeconds: Number(req.body.videoPositionSeconds) || 0,
    });
    res.json(row);
  } catch (err) {
    next(err);
  }
}

export async function submitAssessment(req, res, next) {
  try {
    const { courseId, assessmentId, sectionId, answer, answers } = req.body;
    if (!courseId || !assessmentId || !sectionId) return res.status(400).json({ error: 'courseId, assessmentId and sectionId are required' });

    const section = await assertSectionUnlocked(userId(req), courseId, sectionId);
    const assessment = await Assessment.findById(assessmentId).lean();
    if (!assessment) return res.status(404).json({ error: 'Assessment not found' });

    const questionIndex = section.questionIndex ?? Number(String(sectionId).split(':question:')[1] || 0);
    const question = assessment.questions[questionIndex];
    if (!question) return res.status(404).json({ error: 'Assessment question not found' });

    const submittedAnswer = answer ?? answers?.[0];
    const correct = evaluateQuestion(question, submittedAnswer);
    const score = correct ? 100 : 0;
    const passed = score >= (assessment.passingScore || 70);

    const result = await saveAssessmentResult({
      userId: userId(req),
      courseId,
      assessmentId,
      sectionId,
      score,
      passed,
      answers: answer ?? answers,
      breakdown: { correct, questionIndex },
    });

    if (passed) {
      await upsertSectionProgress({
        userId: userId(req),
        courseId,
        moduleId: section.moduleId,
        sectionId,
        status: 'completed',
        videoProgress: 100,
        videoPositionSeconds: 0,
      });
    }

    res.json({ score, passed, result });
  } catch (err) {
    next(err);
  }
}

function evaluateQuestion(question, submittedAnswer) {
  const type = question.type || 'single-choice';
  const correctAnswer = question.correctAnswer !== undefined
    ? question.correctAnswer
    : question.correctOptions !== undefined
      ? question.correctOptions
      : question.options?.[question.correctOption] ?? question.correctOption;

  if (type === 'multiple-select') {
    return JSON.stringify([...(submittedAnswer || [])].sort()) === JSON.stringify([...(correctAnswer || [])].sort());
  }

  if (type === 'match-following' || type === 'match-the-following' || type === 'ordering') {
    return JSON.stringify(submittedAnswer || (Array.isArray(correctAnswer) ? [] : {})) === JSON.stringify(correctAnswer || {});
  }

  if (type === 'short-answer') {
    return String(submittedAnswer || '').trim().toLowerCase() === String(correctAnswer || '').trim().toLowerCase();
  }

  return String(submittedAnswer) === String(correctAnswer);
}

export async function getAssessmentResult(req, res, next) {
  try {
    const result = await AssessmentResult.findOne({
      userId: userId(req),
      assessmentId: req.params.assessmentId,
    }).sort({ submittedAt: -1 }).lean();
    if (!result) return res.status(404).json({ error: 'No assessment result found' });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getCourseCompletionStatus(req, res, next) {
  try {
    const courseId = req.query.courseId || req.params.courseId;
    if (!courseId) return res.status(400).json({ error: 'courseId is required' });
    const payload = await buildProgressPayload(userId(req), courseId);
    res.json({
      courseId,
      percentComplete: payload.percentComplete,
      isComplete: payload.isComplete,
      certificateEligible: payload.isComplete,
    });
  } catch (err) {
    next(err);
  }
}
