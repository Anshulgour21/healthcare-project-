import { buildLearningModules } from '../data/pocCourses';

const AUTH_KEY = 'courseCanvasPocUser';
const ENROLLMENTS_KEY = 'courseCanvasPocEnrollments';
const TOPIC_PROGRESS_KEY = 'courseCanvasPocTopicProgress';
const ASSESSMENTS_KEY = 'courseCanvasPocAssessments';
const LEARNING_PROGRESS_PREFIX = 'healthCareLmsCourseProgress';

export function getStoredUser() {
  return readJson(AUTH_KEY, null);
}

export function setStoredUser(user) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

export function clearStoredUser() {
  localStorage.removeItem(AUTH_KEY);
}

export function getEnrollments() {
  return readJson(ENROLLMENTS_KEY, []);
}

export function enrollInCourse(courseId) {
  const enrollments = getEnrollments();
  if (!enrollments.includes(courseId)) {
    localStorage.setItem(ENROLLMENTS_KEY, JSON.stringify([...enrollments, courseId]));
  }
}

export function isEnrolled(courseId) {
  return getEnrollments().includes(courseId);
}

export function getCompletedTopics() {
  return readJson(TOPIC_PROGRESS_KEY, []);
}

export function completeTopic(topicId) {
  const completed = getCompletedTopics();
  if (!completed.includes(topicId)) {
    localStorage.setItem(TOPIC_PROGRESS_KEY, JSON.stringify([...completed, topicId]));
  }
}

export function getAssessmentResults() {
  return readJson(ASSESSMENTS_KEY, {});
}

export function saveAssessmentResult(assessmentId, result) {
  localStorage.setItem(ASSESSMENTS_KEY, JSON.stringify({
    ...getAssessmentResults(),
    [assessmentId]: result,
  }));
}

export function getCourseProgress(course) {
  const legacyCompleted = new Set(getCompletedTopics());
  const assessmentResults = getAssessmentResults();
  const learningSnapshot = getLearningProgressSnapshot(course.id);
  const completedSectionsSet = new Set(learningSnapshot.completedSectionIds || []);
  const learningModules = buildLearningModules(course);
  const learningSections = learningModules.flatMap((module) => module.sections || []);
  const totalSections = learningSections.length;
  const completedSections = learningSections.filter((section) => (
    completedSectionsSet.has(section.sectionId) || legacyCompleted.has(section.id)
  )).length;
  const totalTopics = course.modules.reduce((sum, module) => sum + module.topics.length, 0);
  const completedTopics = course.modules.reduce(
    (sum, module) => sum + module.topics.filter((topic) => completedSectionsSet.has(topic.id) || legacyCompleted.has(topic.id)).length,
    0,
  );

  return {
    courseId: course.id,
    totalTopics,
    completedTopics,
    totalSections,
    completedSections,
    percentComplete: totalSections ? Math.round((completedSections / totalSections) * 100) : 0,
    isEnrolled: isEnrolled(course.id),
    moduleProgress: course.modules.map((module) => ({
      moduleId: module.id,
      title: module.title,
      totalTopics: module.topics.length,
      completedTopics: module.topics.filter((topic) => completedSectionsSet.has(topic.id) || legacyCompleted.has(topic.id)).length,
      assessmentPassed: isModuleAssessmentPassed(module, completedSectionsSet, assessmentResults),
    })),
  };
}

function getLearningProgressSnapshot(courseId) {
  return readJson(`${LEARNING_PROGRESS_PREFIX}:${courseId}`, {
    completedSectionIds: [],
    assessmentResults: {},
  });
}

function isModuleAssessmentPassed(module, completedSectionsSet, assessmentResults) {
  if (!module.assessment) return true;
  if (assessmentResults[module.assessment.id]?.passed) return true;

  const questions = module.assessment.questions || [];
  return questions.length > 0 && questions.every((_, index) => (
    completedSectionsSet.has(`${module.assessment.id}-question-${index + 1}`)
  ));
}

function readJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}
