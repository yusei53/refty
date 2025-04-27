import { useState } from "react";
import PublishSettingPopup from "./PublishSettingPopupArea";

type PublishSettingPopupAreaContainerProps = {
  value: boolean;
  onChange: (value: boolean) => void;
};

export const PublishSettingPopupAreaContainer: React.FC<
  PublishSettingPopupAreaContainerProps
> = ({ value, onChange }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <PublishSettingPopup
      value={value}
      onChange={onChange}
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onToggle={handleClick}
      onClose={handleClose}
    />
  );
};
