import React, { useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  FileText,
  Loader2,
  PlayCircle,
  Target,
} from 'lucide-react';
import Button from '../components/ui/Button';
import LearningSidebar from '../components/learning/LearningSidebar';
import VideoSection from '../components/learning/VideoSection';
import AssessmentQuestion from '../components/learning/AssessmentQuestion';
import FlashcardActivity from '../components/learning/FlashcardActivity';
import MismatchActivity from '../components/learning/MismatchActivity';
import CompletionPanel from '../components/learning/CompletionPanel';
import { getCourse } from '../data/pocCourses';
import { enrollInCourse } from '../utils/pocStorage';
import { courseLabels } from '../utils/courseLanguage';
import { useCourseProgress } from '../hooks/useCourseProgress';
import { useLearningApi } from '../hooks/useLearningApi';

export default function Learn() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = useMemo(() => getCourse(courseId), [courseId]);
  const t = courseLabels(course?.language);

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Course not found</h2>
        <Button className="mt-4" onClick={() => navigate('/courses')}>Back to Courses</Button>
      </div>
    );
  }

  enrollInCourse(course.id);

  return <LearningExperience course={course} labels={t} />;
}

function LearningExperience({ course, labels }) {
  const learningApi = useLearningApi(course);
  const {
    modules,
    sections,
    activeSection,
    snapshot,
    statusFor,
    setActiveSection,
    getSectionProgress,
    completeSection,
    setVideoProgress,
    saveAssessmentSection,
    completedSections,
    totalSections,
    percentComplete,
    isComplete,
  } = useCourseProgress(course);

  const activeIndex = sections.findIndex((section) => section.sectionId === activeSection?.sectionId);
  const previousSection = activeIndex > 0 ? sections[activeIndex - 1] : null;
  const nextSection = activeIndex >= 0 && activeIndex < sections.length - 1 ? sections[activeIndex + 1] : null;
  const activeVideoProgress = activeSection ? getSectionProgress(activeSection.sectionId) : 0;
  const activeSectionCompleted = activeSection ? statusFor(activeSection.sectionId) === 'completed' : false;
  const requiresVideoCompletion = Boolean(activeSection?.contentType === 'video' && activeSection?.videoUrl && !activeSectionCompleted);
  const canCompleteActiveSection = !requiresVideoCompletion || activeVideoProgress >= 90;

  function selectSection(sectionId) {
    setActiveSection(sectionId);
  }

  function goToSection(section) {
    if (!section) return;
    setActiveSection(section.sectionId);
  }

  function completeCurrent() {
    if (!activeSection) return;
    if (!canCompleteActiveSection) return;
    const completed = completeSection(activeSection.sectionId, nextSection?.sectionId || activeSection.sectionId);
    if (!completed) return;
    learningApi.markSectionComplete({ section: activeSection });
    if (nextSection) {
      setActiveSection(nextSection.sectionId);
    }
  }

  function markActiveSectionAsCompleteWithoutRedirect() {
    if (!activeSection) return;
    const completed = completeSection(activeSection.sectionId, activeSection.sectionId);
    if (!completed) return;
    learningApi.markSectionComplete({ section: activeSection });
  }

  if (!activeSection) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="flex h-64 items-center justify-center rounded-2xl border bg-card text-muted-foreground">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          {labels.preparingPath}
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="container mx-auto px-4 py-10">
        <CompletionPanel
          percentComplete={percentComplete}
          labels={labels}
          onReview={() => setActiveSection(sections[0].sectionId)}
        />
      </div>
    );
  }

  const Icon = activeSection.contentType === 'video'
    ? PlayCircle
    : (activeSection.contentType === 'interactive' || activeSection.contentType === 'flipcard' || activeSection.contentType === 'mismatch')
      ? Target
      : activeSection.contentType === 'assessment'
        ? CheckCircle2
        : FileText;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Link to={`/courses/${course.id}`} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-2">
            <ChevronLeft className="h-4 w-4" /> {labels.backToCourse}
          </Link>
          <h1 className="text-2xl md:text-3xl font-display font-bold">{course.title}</h1>
          <div className="mt-2 text-sm text-muted-foreground">
            {completedSections}/{totalSections} {labels.sectionsCompleted}
          </div>
        </div>
        <div className="w-full md:w-72">
          <div className="mb-1 flex justify-between text-xs font-medium">
            <span>{percentComplete}%</span>
            <span>{statusFor(activeSection.sectionId)}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-secondary">
            <div className="h-full bg-primary transition-all" style={{ width: `${percentComplete}%` }} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        <LearningSidebar
          modules={modules}
          activeSectionId={activeSection.sectionId}
          statusFor={statusFor}
          labels={labels}
          onSelect={selectSection}
        />

        <main className="min-w-0 flex-1">
          <div className="rounded-2xl border bg-card overflow-hidden">
            <div className="border-b bg-muted/20 px-6 py-4">
              <div className="flex items-center gap-2 text-sm text-primary font-medium">
                <Icon className="h-4 w-4" />
                <span className="capitalize">{activeSection.contentType}</span>
              </div>
              <h2 className="mt-2 text-2xl md:text-3xl font-display font-bold">{activeSection.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{activeSection.module.title}</p>
            </div>

            <div className="p-6 md:p-10">
              {activeSection.contentType === 'assessment' ? (
                <AssessmentQuestion
                  section={activeSection}
                  savedResult={snapshot.assessmentResults?.[activeSection.sectionId]}
                  onSubmit={(sectionId, result) => {
                    saveAssessmentSection(sectionId, result, nextSection?.sectionId || sectionId);
                    learningApi.submitAssessment({ section: activeSection, result });
                  }}
                />
              ) : activeSection.contentType === 'flipcard' ? (
                <FlashcardActivity
                  section={activeSection}
                  onFlippedAll={markActiveSectionAsCompleteWithoutRedirect}
                  onComplete={completeCurrent}
                />
              ) : activeSection.contentType === 'mismatch' ? (
                <MismatchActivity
                  section={activeSection}
                  onFlippedAll={markActiveSectionAsCompleteWithoutRedirect}
                  onComplete={completeCurrent}
                />
              ) : (
                <ContentSection
                  section={activeSection}
                  labels={labels}
                  savedProgress={snapshot.videoProgressBySection?.[activeSection.sectionId]}
                  onVideoProgress={(sectionId, progress, currentTime) => {
                    const section = sections.find((item) => item.sectionId === sectionId) || activeSection;
                    const wasCompleted = statusFor(sectionId) === 'completed';
                    const completed = setVideoProgress(sectionId, progress, currentTime);
                    learningApi.syncSectionProgress({
                      section,
                      videoProgress: progress,
                      videoPositionSeconds: currentTime,
                    });
                    if (completed && !wasCompleted) {
                      learningApi.markSectionComplete({
                        section,
                        videoPositionSeconds: currentTime,
                      });
                    }
                  }}
                  onComplete={completeCurrent}
                  completeDisabled={!canCompleteActiveSection}
                  completeLabel={canCompleteActiveSection ? labels.completeTopic : labels.watchToUnlock}
                />
              )}
            </div>

            <div className="flex flex-col gap-3 border-t bg-muted/20 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <Button
                variant="outline"
                disabled={!previousSection || statusFor(previousSection.sectionId) === 'locked'}
                onClick={() => goToSection(previousSection)}
              >
                <ArrowLeft className="h-4 w-4" />
                {labels.previous}
              </Button>
              <Button
                disabled={!nextSection || statusFor(nextSection.sectionId) === 'locked'}
                onClick={() => goToSection(nextSection)}
              >
                {labels.next}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function ContentSection({
  section,
  labels,
  savedProgress,
  onVideoProgress,
  onComplete,
  completeDisabled,
  completeLabel,
}) {
  return (
    <div>
      {section.videoUrl && (
        <div className="mb-8">
          <VideoSection
            section={section}
            savedProgress={savedProgress}
            labels={labels}
            onProgress={onVideoProgress}
          />
        </div>
      )}
      <div className="prose prose-emerald max-w-none whitespace-pre-line text-foreground">
        {section.textContent}
      </div>
      {section.contentType === 'interactive' && (
        <div className="mt-8 bg-muted p-8 rounded-xl border border-dashed flex flex-col items-center justify-center text-center">
          <Target className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">{labels.interactiveTitle}</h3>
          <p className="text-muted-foreground mb-4">{labels.interactiveText}</p>
          <Button variant="outline">{labels.launchExercise}</Button>
        </div>
      )}
      <div className="my-10 border-t" />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {completeDisabled ? labels.videoUnlockHelp : labels.finished}
        </p>
        <Button onClick={onComplete} disabled={completeDisabled}>
          <CheckCircle2 className="h-4 w-4" />
          {completeLabel}
        </Button>
      </div>
    </div>
  );
}
