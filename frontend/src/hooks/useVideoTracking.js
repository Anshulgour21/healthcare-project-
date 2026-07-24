import { useEffect, useRef, useState } from 'react';

export function useVideoTracking(section, savedProgress, onProgress) {
  const videoRef = useRef(null);
  const completionReportedRef = useRef((savedProgress?.progress || 0) >= 90);
  const [watchTime, setWatchTime] = useState(0);
  const [progress, setProgress] = useState(savedProgress?.progress || 0);

  useEffect(() => {
    const video = videoRef.current;
    const nextSavedProgress = savedProgress?.progress || 0;
    completionReportedRef.current = nextSavedProgress >= 90;
    setProgress(nextSavedProgress);
    setWatchTime(Math.round(savedProgress?.currentTime || 0));
    if (!video || !savedProgress?.currentTime) return;
    video.currentTime = savedProgress.currentTime;
  }, [section?.sectionId, savedProgress?.currentTime, savedProgress?.progress]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      const video = videoRef.current;
      if (!video || !video.duration) return;
      const nextProgress = Math.min(100, Math.round((video.currentTime / video.duration) * 100));
      setProgress(nextProgress);
      setWatchTime(Math.round(video.currentTime));
      onProgress(nextProgress, video.currentTime);
    }, 15000);

    return () => window.clearInterval(interval);
  }, [section?.sectionId, onProgress]);

  function handleTimeUpdate() {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const nextProgress = Math.min(100, Math.round((video.currentTime / video.duration) * 100));
    setProgress(nextProgress);
    setWatchTime(Math.round(video.currentTime));
    if (nextProgress >= 90 && !completionReportedRef.current) {
      completionReportedRef.current = true;
      onProgress(nextProgress, video.currentTime);
    }
  }

  return { videoRef, progress, watchTime, handleTimeUpdate };
}
