import { useCallback } from 'react';
import api from '../services/api';

const backendProgressEnabled = import.meta.env.VITE_ENABLE_BACKEND_PROGRESS === 'true';

export function useLearningApi(course) {
  const run = useCallback(async (request) => {
    if (!backendProgressEnabled || !course?.id) return null;
    try {
      const response = await request();
      return response.data;
    } catch (error) {
      // The POC keeps working from local progress if the backend is unavailable.
      console.warn('[learning-progress] backend sync skipped:', error?.response?.data?.error || error.message);
      return null;
    }
  }, [course?.id]);

  const syncSectionProgress = useCallback(async ({ section, videoProgress = 0, videoPositionSeconds = 0 }) => (
    run(() => api.post('/section-progress', {
      courseId: course.id,
      moduleId: section.moduleId,
      sectionId: section.sectionId,
      videoProgress,
      videoPositionSeconds,
    }))
  ), [course?.id, run]);

  const markSectionComplete = useCallback(async ({ section, videoPositionSeconds = 0 }) => (
    run(() => api.post('/mark-section-complete', {
      courseId: course.id,
      moduleId: section.moduleId,
      sectionId: section.sectionId,
      videoPositionSeconds,
    }))
  ), [course?.id, run]);

  const submitAssessment = useCallback(async ({ section, result }) => (
    run(() => api.post('/assessment-submit', {
      courseId: course.id,
      moduleId: section.moduleId,
      sectionId: section.sectionId,
      assessmentId: section.assessmentId,
      answer: result.answer,
      score: result.score,
      passed: result.passed,
    }))
  ), [course?.id, run]);

  return {
    enabled: backendProgressEnabled,
    syncSectionProgress,
    markSectionComplete,
    submitAssessment,
  };
}
