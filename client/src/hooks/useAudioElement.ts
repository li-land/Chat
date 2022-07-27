import { useEffect, useState } from "react";

export const useAudioElement = (
  audioElement: any
): [isPlayingAudio: boolean, progress: number, audioCurrentTime: number] => {
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState<number>(0);
  useEffect(() => {
    audioElement.current.addEventListener(
      "playing",
      () => {
        setIsPlayingAudio(true);
      },
      false
    );
    audioElement.current.addEventListener(
      "ended",
      () => {
        setIsPlayingAudio(false);
        setProgress(0);
        setAudioCurrentTime(0);
      },
      false
    );
    audioElement.current.addEventListener(
      "pause",
      () => {
        setIsPlayingAudio(false);
      },
      false
    );
    audioElement.current.addEventListener("timeupdate", () => {
      const duration =
        (audioElement.current && audioElement.current.duration) || 0;
      setAudioCurrentTime(audioElement.current.currentTime);
      setProgress((audioElement.current.currentTime / duration) * 100);
    });
  }, []);
  return [isPlayingAudio, progress, audioCurrentTime];
};
