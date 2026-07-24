import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Target, Trophy } from 'lucide-react';
import Button from '../components/ui/Button';
import CourseCard from '../components/CourseCard';
import { getCourseProgress, getEnrollments } from '../utils/pocStorage';
import { getCourse } from '../data/pocCourses';

export default function Dashboard() {
  const enrolledCourses = useMemo(() => (
    getEnrollments()
      .map((id) => getCourse(id))
      .filter(Boolean)
      .map((course) => ({ course, progress: getCourseProgress(course) }))
  ), []);

  return (
    <>
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-2">Demo Dashboard</h1>
          <p className="text-muted-foreground">Track locally stored enrollment and learning progress for the POC walkthrough.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12 mb-10">
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          <Stat icon={BookOpen} label="Total Enrolled" value={enrolledCourses.length} color="text-blue-500 bg-blue-500/10" />
          <Stat icon={Trophy} label="Completed Courses" value={enrolledCourses.filter((item) => item.progress.percentComplete === 100).length} color="text-accent bg-accent/10" />
          <Stat icon={Target} label="In Progress" value={enrolledCourses.filter((item) => item.progress.percentComplete > 0 && item.progress.percentComplete < 100).length} color="text-primary bg-primary/10" />
        </div>

        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-display font-bold">Your Healthcare Courses</h2>
            <p className="text-muted-foreground">Pick up your current learning paths.</p>
          </div>
          <Button as={Link} to="/courses" variant="outline">Browse Courses</Button>
        </div>

        {enrolledCourses.length ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map(({ course, progress }) => (
              <div key={course.id} className="space-y-3">
                <CourseCard course={course} progress={progress} />
               
              </div>
            ))}
          </div>
        ) : (
          <div className="border rounded-2xl bg-card p-8 text-center">
            <p className="text-muted-foreground mb-4">No demo enrollments yet. Open a course and click the enroll button.</p>
            <Button as={Link} to="/courses">Browse Courses</Button>
          </div>
        )}
      </div>
    </>
  );
}

function Stat({ icon: Icon, label, value, color }) {
  return (
    <div className="border rounded-2xl bg-card p-5 flex items-center gap-4">
      <div className={`h-12 w-12 rounded-full flex items-center justify-center ${color}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}
