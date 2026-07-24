import { useEffect, useMemo, useState } from 'react';
import { buildLearningModules } from '../data/pocCourses';
import { flattenLearningModules, getNextUnlockedSection, getSectionStatus } from './useSectionUnlock';

const STORAGE_PREFIX = 'healthCareLmsCourseProgress';

export function useCourseProgress(course) {
  const storageKey = `${STORAGE_PREFIX}:${course?.id}`;
  const [snapshot, setSnapshot] = useState(() => readProgress(storageKey));

  const modules = useMemo(() => buildLearningModules(course), [course]);
  const sections = useMemo(() => flattenLearningModules(modules), [modules]);
  const sectionIds = useMemo(() => new Set(sections.map((section) => section.sectionId)), [sections]);
  const completedSectionIds = useMemo(() => new Set(snapshot.completedSectionIds || []), [snapshot]);
  const activeSection = useMemo(() => {
    const activeCandidate = sections.find((section) => section.sectionId === snapshot.activeSectionId);
    if (activeCandidate && getSectionStatus(sections, completedSectionIds, activeCandidate.sectionId) !== 'locked') {
      return activeCandidate;
    }
    return getNextUnlockedSection(sections, completedSectionIds);
  }, [sections, snapshot.activeSectionId, completedSectionIds]);

  useEffect(() => {
    if (!sections.length) return;
    const clean = sanitizeProgress(readProgress(storageKey), sections, sectionIds);
    if (JSON.stringify(clean) !== JSON.stringify(snapshot)) {
      persist(clean);
    }
  }, [sections, sectionIds, snapshot, storageKey]);

  function currentSnapshot() {
    return readProgress(storageKey);
  }

  function persist(next) {
    const clean = sanitizeProgress(next, sections, sectionIds);
    localStorage.setItem(storageKey, JSON.stringify(clean));
    setSnapshot(clean);
  }

  function statusFor(sectionId) {
    return getSectionStatus(sections, completedSectionIds, sectionId);
  }

  function setActiveSection(sectionId) {
    if (statusFor(sectionId) === 'locked') return false;
    persist({ ...currentSnapshot(), activeSectionId: sectionId });
    return true;
  }

  function nextSectionAfter(sectionId) {
    const index = sections.findIndex((section) => section.sectionId === sectionId);
    return index >= 0 && index < sections.length - 1 ? sections[index + 1] : null;
  }

  function getSectionProgress(sectionId) {
    return snapshot.videoProgressBySection?.[sectionId]?.progress || 0;
  }

  function completeSection(sectionId, nextActiveSectionId = sectionId) {
    if (statusFor(sectionId) === 'locked') return false;
    const latest = currentSnapshot();
    const completed = new Set(latest.completedSectionIds || []);
    completed.add(sectionId);
    persist({
      ...latest,
      activeSectionId: nextActiveSectionId,
      completedSectionIds: [...completed],
      completedAtBySection: {
        ...(latest.completedAtBySection || {}),
        [sectionId]: new Date().toISOString(),
      },
    });
    return true;
  }

  function setVideoProgress(sectionId, progress, currentTime = 0) {
    const latest = currentSnapshot();
    const nextVideoProgress = {
      ...(latest.videoProgressBySection || {}),
      [sectionId]: {
        progress,
        currentTime,
        updatedAt: new Date().toISOString(),
      },
    };

    const completed = new Set(latest.completedSectionIds || []);
    const completedAtBySection = { ...(latest.completedAtBySection || {}) };
    const passedCompletionGate = progress >= 90;

    if (passedCompletionGate) {
      completed.add(sectionId);
      completedAtBySection[sectionId] = completedAtBySection[sectionId] || new Date().toISOString();
    }

    persist({
      ...latest,
      activeSectionId: latest.activeSectionId,
      videoProgressBySection: nextVideoProgress,
      completedSectionIds: [...completed],
      completedAtBySection,
    });
    return passedCompletionGate;
  }

  function saveAssessmentSection(sectionId, result, nextActiveSectionId = sectionId) {
    const latest = currentSnapshot();
    const completed = new Set(latest.completedSectionIds || []);
    if (result?.passed) completed.add(sectionId);

    persist({
      ...latest,
      activeSectionId: result?.passed ? nextActiveSectionId : sectionId,
      completedSectionIds: [...completed],
      completedAtBySection: result?.passed ? {
        ...(latest.completedAtBySection || {}),
        [sectionId]: new Date().toISOString(),
      } : latest.completedAtBySection,
      assessmentResults: {
        ...(latest.assessmentResults || {}),
        [sectionId]: {
          ...result,
          submittedAt: new Date().toISOString(),
        },
      },
    });
  }

  const totalSections = sections.length;
  const completedSections = sections.filter((section) => completedSectionIds.has(section.sectionId)).length;
  const percentComplete = totalSections ? Math.round((completedSections / totalSections) * 100) : 0;
  const isComplete = totalSections > 0 && completedSections === totalSections;

  return {
    modules,
    sections,
    activeSection,
    snapshot,
    statusFor,
    setActiveSection,
    nextSectionAfter,
    getSectionProgress,
    completeSection,
    setVideoProgress,
    saveAssessmentSection,
    totalSections,
    completedSections,
    percentComplete,
    isComplete,
  };
}

function sanitizeProgress(progress, sections, sectionIds) {
  const completedSectionIds = (progress.completedSectionIds || []).filter((sectionId) => sectionIds.has(sectionId));
  const completed = new Set(completedSectionIds);
  const activeExists = sectionIds.has(progress.activeSectionId);
  const activeIsAvailable = activeExists && getSectionStatus(sections, completed, progress.activeSectionId) !== 'locked';
  const activeSectionId = activeIsAvailable
    ? progress.activeSectionId
    : getNextUnlockedSection(sections, completed)?.sectionId || null;

  return {
    activeSectionId,
    completedSectionIds,
    videoProgressBySection: filterBySectionIds(progress.videoProgressBySection || {}, sectionIds),
    completedAtBySection: filterBySectionIds(progress.completedAtBySection || {}, sectionIds),
    assessmentResults: filterBySectionIds(progress.assessmentResults || {}, sectionIds),
  };
}

function filterBySectionIds(valueBySection, sectionIds) {
  return Object.fromEntries(
    Object.entries(valueBySection).filter(([sectionId]) => sectionIds.has(sectionId))
  );
}

function readProgress(storageKey) {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : {
      activeSectionId: null,
      completedSectionIds: [],
      videoProgressBySection: {},
      completedAtBySection: {},
      assessmentResults: {},
    };
  } catch {
    return {
      activeSectionId: null,
      completedSectionIds: [],
      videoProgressBySection: {},
      completedAtBySection: {},
      assessmentResults: {},
    };
  }
}
