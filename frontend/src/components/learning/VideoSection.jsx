import React, { useCallback } from 'react';
import { CheckCircle2, Clock } from 'lucide-react';
import { useVideoTracking } from '../../hooks/useVideoTracking';

export default function VideoSection({ section, savedProgress, labels, onProgress }) {
  const handleProgress = useCallback((progress, currentTime) => {
    onProgress(section.sectionId, progress, currentTime);
  }, [onProgress, section.sectionId]);

  const { videoRef, progress, watchTime, handleTimeUpdate } = useVideoTracking(section, savedProgress, handleProgress);

  return (
    <div className="space-y-5">
      <div className="aspect-video overflow-hidden rounded-xl bg-black">
        <video
          ref={videoRef}
          controls
          className="h-full w-full"
          src={section.videoUrl}
          onTimeUpdate={handleTimeUpdate}
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border bg-muted/30 p-4">
          <div className="text-xs font-medium text-muted-foreground">{labels.progress}</div>
          <div className="mt-1 text-2xl font-bold">{progress}%</div>
        </div>
        <div className="rounded-xl border bg-muted/30 p-4">
          <div className="text-xs font-medium text-muted-foreground">{labels.watchTime}</div>
          <div className="mt-1 flex items-center gap-2 text-2xl font-bold">
            <Clock className="h-5 w-5 text-primary" />
            {formatSeconds(watchTime)}
          </div>
        </div>
        <div className="rounded-xl border bg-muted/30 p-4">
          <div className="text-xs font-medium text-muted-foreground">{labels.completion}</div>
          <div className="mt-2 flex items-center gap-2 font-semibold">
            <CheckCircle2 className={`h-5 w-5 ${progress >= 90 ? 'text-primary' : 'text-muted-foreground'}`} />
            {progress >= 90 ? labels.completed : labels.watch90}
          </div>
        </div>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-secondary">
        <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

function formatSeconds(seconds) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${minutes}:${String(rest).padStart(2, '0')}`;
}
