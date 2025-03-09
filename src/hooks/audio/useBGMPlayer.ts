import { useRef, useState } from "react";

type BGMSources = {
  [key: string]: string;
};

export const useBGMPlayer = (
  sources: BGMSources
): {
  playTrack: (track: string) => Promise<void>;
  stop: () => void;
  currentTrack: string | null;
} => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);

  const playTrack = async (track: string) => {
    // 既に同じトラックが再生中なら何もしない
    if (currentTrack === track) {
      return;
    }
    // 別のトラックが再生中なら停止
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    const src = sources[track];
    if (src) {
      audioRef.current = new Audio(src);
      audioRef.current.loop = true;
      try {
        await audioRef.current.play();
        setCurrentTrack(track);
      } catch (error) {
        console.error(`音声(${track})の再生に失敗しました:`, error);
      }
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setCurrentTrack(null);
      audioRef.current = null;
    }
  };

  return { playTrack, stop, currentTrack };
};
