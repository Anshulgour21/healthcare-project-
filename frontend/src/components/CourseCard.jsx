import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Languages, Users } from 'lucide-react';
import Badge from './ui/Badge';
import { courseLabels, formatLevel } from '../utils/courseLanguage';


export default function CourseCard({ course, progress=null }) {
  const t = courseLabels(course.language);
  const currPath =  useLocation().pathname;

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
      rounded-2xl
      border
      bg-card
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
      hover:border-primary/40
      cursor-pointer
    "
  >
    {/* Thumbnail */}
    <div className="relative aspect-[5/3.1a] overflow-hidden bg-muted">
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
            group-hover:scale-110
          "
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-primary/5">
          <BookOpen className="h-12 w-12 text-primary/20" />
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      {/* Badges */}
      <div className="absolute top-3 left-3 flex flex-wrap gap-2">
        <Badge className="bg-background/90 backdrop-blur text-foreground">
          {course.category}
        </Badge>

        <Badge
          outline
          className="bg-background/90 backdrop-blur text-foreground"
        >
          {formatLevel(course.level, course.language)}
        </Badge>
      </div>
    </div>

    {/* Progress */}
    {currPath === "/dashboard" && (
      <div className="px-5 pt-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">
            {progress?.percentComplete === 100
              ? t.completed
              : progress?.percentComplete > 0
              ? t.inProgress
              : t.notStarted}
          </span>

          <span className="text-xs font-semibold text-primary">
            {progress?.percentComplete || 0}%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="
              h-full
              rounded-full
              bg-primary
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
          font-semibold
          leading-tight
          transition-colors
          group-hover:text-primary
        "
      >
        {course.title}
      </h3>

      <p className="mb-4 flex-1 line-clamp-2 text-sm text-muted-foreground">
        {course.description}
      </p>

      {course.language && (
        <div
          className="
            mb-4
            inline-flex
            w-fit
            items-center
            gap-1.5
            rounded-full
            bg-primary/10
            px-3
            py-1
            text-xs
            font-medium
            text-primary
          "
        >
          <Languages className="h-3.5 w-3.5" />
          {course.language}
        </div>
      )}

      <div className="mt-auto border-t pt-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            <span>
              {course.totalModules || 0} {t.modules}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
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
