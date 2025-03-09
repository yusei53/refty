import { BirdAnimation } from "@/src/components/animation";

export type OverlayConfig = {
  component?: React.ReactNode;
  backgroundColor?: string;
};

export const useBGMOverlay = (
  currentTrack: string | null
): OverlayConfig | null => {
  const overlayConfig: { [key: string]: OverlayConfig } = {
    nature: {
      component: <BirdAnimation />,
      backgroundColor: "#FAFDFB"
    },
    bgm2: {
      backgroundColor: "#EFF9F2"
    }
  };

  if (currentTrack && overlayConfig[currentTrack]) {
    return overlayConfig[currentTrack];
  }
  return null;
};
