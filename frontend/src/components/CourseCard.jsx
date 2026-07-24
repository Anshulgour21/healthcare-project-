import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Languages, Users } from 'lucide-react';
import Badge from './ui/Badge';
import { courseLabels, formatLevel } from '../utils/courseLanguage';

export default function CourseCard({ course, progress=null }) {
  const t = courseLabels(course.language);
  const currPath = useLocation().pathname;

  return (
    <Link to={`/courses/${course._id || course.id}`}>
      <div
        className="
          group
          relative
          flex
          flex-col
          h-full
          overflow-hidden
          rounded-card
          border border-border
          bg-surface
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-premium
          hover:border-primary/30
          cursor-pointer
        "
      >
        {/* Thumbnail */}
        <div className="relative aspect-[5/3.1a] overflow-hidden bg-surface-secondary">
          {course.thumbnailUrl ? (
            <img
              src={course.thumbnailUrl}
              alt={course.title}
              className="
                w-full
                h-full
                object-cover
                transition-transform
                duration-700
                group-hover:scale-105
              "
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-primary/5">
              <BookOpen className="h-12 w-12 text-primary/20" />
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            <Badge className="bg-surface/90 backdrop-blur text-heading shadow-soft border-0">
              {course.category}
            </Badge>

            <Badge
              outline
              className="bg-surface/90 backdrop-blur text-heading shadow-soft border-0"
            >
              {formatLevel(course.level, course.language)}
            </Badge>
          </div>
        </div>

        {/* Progress */}
        {currPath === "/dashboard" && (
          <div className="px-5 pt-5 pb-1">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium text-body">
                {progress?.percentComplete === 100
                  ? t.completed
                  : progress?.percentComplete > 0
                  ? t.inProgress
                  : t.notStarted}
              </span>

              <span className="text-xs font-bold text-primary">
                {progress?.percentComplete || 0}%
              </span>
            </div>

            <div className="h-2.5 overflow-hidden rounded-full bg-surface-secondary shadow-inner">
              <div
                className="
                  h-full
                  rounded-full
                  bg-gradient-to-r from-primary to-secondary
                  transition-all
                  duration-700
                "
                style={{
                  width: `${progress?.percentComplete || 0}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          <h3
            className="
              mb-2
              line-clamp-2
              text-lg
              font-bold
              leading-tight
              text-heading
              transition-colors
              group-hover:text-primary
            "
          >
            {course.title}
          </h3>

          <p className="mb-5 flex-1 line-clamp-2 text-sm text-body leading-relaxed">
            {course.description}
          </p>

          {course.language && (
            <div
              className="
                mb-5
                inline-flex
                w-fit
                items-center
                gap-1.5
                rounded-full
                bg-primary/10
                px-3
                py-1.5
                text-xs
                font-medium
                text-primary
              "
            >
              <Languages className="h-3.5 w-3.5" />
              {course.language}
            </div>
          )}

          <div className="mt-auto border-t border-border pt-4">
            <div className="flex items-center justify-between text-sm font-medium text-body">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>
                  {course.totalModules || 0} {t.modules}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>
                  {course.totalEnrollments || 0} {t.enrolled}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
