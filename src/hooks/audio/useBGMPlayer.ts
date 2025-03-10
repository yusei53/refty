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
  getBGMName: () => string;
} => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);

  const playTrack = async (track: string) => {
    // 既に同じトラックが再生中なら何もしない
    if (currentTrack === track) return;

    // 別のトラックが再生中なら停止
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    }

    const src = sources[track];
    if (src) {
      audioRef.current = new Audio(src);
      audioRef.current.loop = true;

      const initialVolume = 0.1;
      const mainVolume = 0.5;
      const fadeInDuration = 3000;
      const fadeInInterval = 100;
      const steps = fadeInDuration / fadeInInterval;
      const volumeStep = (mainVolume - initialVolume) / steps;

      audioRef.current.volume = initialVolume;
      try {
        await audioRef.current.play();
        setCurrentTrack(track);
      } catch (error) {
        console.error(`音声(${track})の再生に失敗しました:`, error);
        return;
      }

      // NOTE: フェードイン処理
      fadeIntervalRef.current = setInterval(() => {
        if (audioRef.current) {
          const newVolume = Math.min(
            audioRef.current.volume + volumeStep,
            mainVolume
          );
          audioRef.current.volume = newVolume;
          if (newVolume >= mainVolume) {
            clearInterval(fadeIntervalRef.current!);
          }
        }
      }, fadeInInterval);
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setCurrentTrack(null);
      audioRef.current = null;
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    }
  };

  const getBGMName = () => {
    switch (currentTrack) {
      case "bird":
        return "鳥と自然";
      case "rain":
        return "静かな雨";
      case "star":
        return "星空";
      default:
        return "サウンドを選択";
    }
  };

  return { playTrack, stop, currentTrack, getBGMName };
};
