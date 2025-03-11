import React, { useState } from "react";
import { BGMSettingPopupArea } from "./BGMSettingPopupArea";

type BGMSettingPopupAreaContainerProps = {
  currentTrack: string;
  playTrack: (track: string) => void;
  stop: () => void;
  isNightMode: boolean;
  toggleNightMode: () => void;
  getBGMName: () => string;
};

export const BGMSettingPopupAreaContainer: React.FC<
  BGMSettingPopupAreaContainerProps
> = ({
  currentTrack,
  playTrack,
  stop,
  isNightMode,
  toggleNightMode,
  getBGMName
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <BGMSettingPopupArea
      currentTrack={currentTrack}
      playTrack={playTrack}
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onToggle={handleClick}
      onClose={handleClose}
      stop={stop}
      isNightMode={isNightMode}
      toggleNightMode={toggleNightMode}
      getBGMName={getBGMName}
    />
  );
};
