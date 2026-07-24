import React, { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Award, BookOpen, CheckCircle2, Clock, Languages, PlayCircle, Star, Stethoscope, Target, Trophy, Users } from 'lucide-react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { getCourse } from '../data/pocCourses';
import { enrollInCourse, getCourseProgress } from '../utils/pocStorage';
import { useAuth } from '../context/AuthContext';
import { courseLabels, formatLevel } from '../utils/courseLanguage';

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [enrolledTick, setEnrolledTick] = useState(0);
  const course = useMemo(() => getCourse(id), [id]);
  const progress = course ? getCourseProgress(course) : null;
  const t = courseLabels(course?.language);
  void enrolledTick;

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Course not found</h2>
        <Button as={Link} to="/courses" className="mt-4">Back to Courses</Button>
      </div>
    );
  }

  function handleEnroll() {
    if (!user) {
      navigate('/sign-up');
      return;
    }
    enrollInCourse(course.id);
    setEnrolledTick((value) => value + 1);
    navigate(`/courses/${course.id}/learn`);
  }

  return (
    <>
      <div className="bg-muted/30 border-b pt-12 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 blur-3xl -z-10">
          <img src={course.thumbnailUrl} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <div className="flex flex-wrap gap-3 mb-6">
                <Badge className="font-medium text-sm">{course.category}</Badge>
                <Badge outline className="font-medium text-sm">{formatLevel(course.level, course.language)}</Badge>
                <Badge outline className="font-medium text-sm">
                  <Languages className="mr-1 h-3.5 w-3.5" />
                  {course.language}
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6 leading-[1.1]">{course.title}</h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{course.description}</p>

              <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span className="font-medium text-foreground">{course.totalModules} {t.modules}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="font-medium text-foreground">{course.totalEnrollments} {t.learners}</span>
                </div>
              </div>

              {progress.isEnrolled ? (
                <div className="flex flex-col gap-4 p-6 bg-background rounded-2xl border shadow-sm max-w-md">
                  <div className="flex items-center gap-3 mb-2">
                    <Trophy className="h-6 w-6 text-accent" />
                    <h3 className="font-semibold text-lg">{t.progressTitle}</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span>{progress.percentComplete}% {t.complete}</span>
                      <span>{progress.completedSections} / {progress.totalSections} {t.sectionsCompleted}</span>
                    </div>
                    <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary transition-all duration-1000 ease-out" style={{ width: `${progress.percentComplete}%` }} />
                    </div>
                  </div>
                  <Button as={Link} to={`/courses/${course.id}/learn`} className="w-full mt-2 h-12 text-base gap-2">
                    <PlayCircle className="h-5 w-5" />
                    {progress.percentComplete > 0 ? t.continueLearning : t.startLearning}
                  </Button>
                </div>
              ) : (
                <Button size="lg" className="h-14 px-8 text-base shadow-lg" onClick={handleEnroll}>
                  {t.enroll}
                </Button>
              )}
            </div>

            <div className="hidden lg:block">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border">
                <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div>
            <h2 className="text-3xl font-display font-bold mb-8">{t.curriculum}</h2>
            <div className="space-y-6">
              {course.modules.map((module, index) => {
                const moduleProgress = progress.moduleProgress.find((item) => item.moduleId === module.id);
                const completed = moduleProgress?.completedTopics === module.topics.length && moduleProgress?.assessmentPassed;
                return (
                  <div key={module.id} className="border rounded-2xl bg-card overflow-hidden transition-colors hover:border-primary/30">
                    <div className="p-6 md:p-8 bg-muted/20 border-b">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-sm font-medium text-primary mb-2">{t.module} {index + 1}</div>
                          <h3 className="text-xl font-bold mb-2">{module.title}</h3>
                          <p className="text-muted-foreground">{module.description}</p>
                        </div>
                        {completed && <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />}
                      </div>
                    </div>
                    <div className="divide-y divide-border/50">
                      {module.topics.map((topic) => {
                        const Icon = topic.contentType === 'video' ? PlayCircle : topic.contentType === 'interactive' ? Target : BookOpen;
                        return (
                          <div key={topic.id} className="p-4 md:px-8 flex items-center gap-4 hover:bg-muted/30 transition-colors">
                            <Icon className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                            <div className="flex-1">
                              <span className="font-medium text-sm md:text-base">{topic.title}</span>
                            </div>
                            <div className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 bg-muted px-2 py-1 rounded-md">
                              <Clock className="h-3 w-3" /> {topic.durationMinutes}m
                            </div>
                          </div>
                        );
                      })}
                      <div className="p-4 md:px-8 flex items-center gap-4 bg-primary/5 text-primary">
                        <Trophy className="h-5 w-5 flex-shrink-0" />
                        <div className="flex-1 font-medium text-sm md:text-base">{t.assessment}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <InstructorPanel instructor={course.instructor} course={course} />
        </div>
      </div>
    </>
  );
}

function InstructorPanel({ instructor, course }) {
  return (
    <aside className="lg:sticky lg:top-24">
      <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div className="bg-muted/30 p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-primary-foreground">
              {instructor.initials}
            </div>
            <div>
              <div className="text-sm font-medium text-primary">Instructor</div>
              <h3 className="text-xl font-display font-bold">{instructor.name}</h3>
              <p className="text-sm text-muted-foreground">{instructor.role}</p>
            </div>
          </div>
        </div>

        <div className="space-y-5 p-6">
          <p className="text-sm leading-relaxed text-muted-foreground">{instructor.bio}</p>

          <div className="grid grid-cols-3 gap-3">
            <InstructorMetric icon={Star} label="Rating" value={instructor.rating} />
            <InstructorMetric icon={Users} label="Learners" value={instructor.learners} />
            <InstructorMetric icon={Award} label="Exp." value={instructor.experience} />
          </div>

          <div className="rounded-xl border bg-background p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
              <Stethoscope className="h-4 w-4 text-primary" />
              Specialty
            </div>
            <p className="text-sm text-muted-foreground">{instructor.specialty}</p>
          </div>

          <div className="rounded-xl bg-primary/5 p-4 text-sm text-primary">
            Leads this course for {course.language} learners in {course.category}.
          </div>
        </div>
      </div>
    </aside>
  );
}

function InstructorMetric({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border bg-background p-3 text-center">
      <Icon className="mx-auto mb-1 h-4 w-4 text-primary" />
      <div className="text-sm font-bold">{value}</div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
    </div>
  );
}
