import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Target, Trophy, Clock, ArrowRight, PlayCircle } from 'lucide-react';
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
    <div className="animate-fade">
      {/* Dashboard Header */}
      <div className="bg-surface border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 pointer-events-none"></div>
        <div className="container mx-auto px-6 max-w-7xl py-12 lg:py-16 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-heading">
                Welcome back, Doctor
              </h1>
              <p className="text-body text-lg max-w-2xl">
                Track your clinical certifications, resume active courses, and explore new specialized medical training.
              </p>
            </div>
            <Button as={Link} to="/explore" className="rounded-button shadow-soft h-12 px-6">
              Explore Courses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl py-12 mb-10">
        
        {/* Statistics Bento Box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 animate-slide" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
          <Stat 
            icon={BookOpen} 
            label="Total Enrollments" 
            value={enrolledCourses.length} 
            colorClass="text-primary bg-primary/10" 
          />
          <Stat 
            icon={Target} 
            label="In Progress" 
            value={enrolledCourses.filter((item) => item.progress.percentComplete > 0 && item.progress.percentComplete < 100).length} 
            colorClass="text-secondary bg-secondary/10" 
          />
          <Stat 
            icon={Trophy} 
            label="Certifications Earned" 
            value={enrolledCourses.filter((item) => item.progress.percentComplete === 100).length} 
            colorClass="text-accent bg-accent/10" 
          />
        </div>

        {/* Courses Section */}
        <div className="animate-slide" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
          <div className="flex items-end justify-between gap-4 mb-8">
            <div className="space-y-1">
              <h2 className="text-2xl font-display font-bold text-heading">Your Active Training</h2>
              <p className="text-body">Continue where you left off or review completed material.</p>
            </div>
          </div>

          {enrolledCourses.length ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {enrolledCourses.map(({ course, progress }) => (
                <CourseCard key={course.id} course={course} progress={progress} />
              ))}
            </div>
          ) : (
            <div className="border border-border border-dashed rounded-card bg-surface-secondary/50 p-12 text-center flex flex-col items-center max-w-2xl mx-auto">
              <div className="h-16 w-16 rounded-full bg-surface shadow-soft flex items-center justify-center mb-6">
                <PlayCircle className="h-8 w-8 text-body/50" />
              </div>
              <h3 className="text-xl font-bold text-heading mb-2">No Active Courses</h3>
              <p className="text-body mb-8">You haven't enrolled in any medical training modules yet. Explore the course catalog to begin your learning journey.</p>
              <Button as={Link} to="/explore" variant="primary" size="lg" className="rounded-button shadow-premium">
                Browse Catalog
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value, colorClass }) {
  return (
    <div className="rounded-card bg-surface border border-border p-6 shadow-soft hover:shadow-premium transition-shadow duration-300 flex items-center gap-5">
      <div className={`h-14 w-14 rounded-2xl flex items-center justify-center ${colorClass}`}>
        <Icon className="h-7 w-7" strokeWidth={2} />
      </div>
      <div>
        <div className="text-3xl font-bold text-heading tracking-tight mb-1">{value}</div>
        <div className="text-sm font-medium text-body">{label}</div>
      </div>
    </div>
  );
}
