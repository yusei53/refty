import { useState } from "react";
import { KebabMenuButton } from "./KebabMenuButton";
import { useUpdatePinnedReflection } from "@/src/hooks/reflection/useUpdatePinnedReflection";
import { Reflection } from "@/src/api/reflection-api";

type PopupContainerProps = {
  reflectionCUID: string;
  username: string;
  reflection: Reflection;
  isPinned: boolean;
};

export const PopupContainer: React.FC<PopupContainerProps> = ({
  username,
  reflectionCUID,
  reflection,
  isPinned,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpenPopup = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClosePopup = () => {
    setAnchorEl(null);
  };

  const handleCopyLink = () => {
    const link = `${process.env.NEXT_PUBLIC_API_URL}/${username}/${reflectionCUID}`;
    navigator.clipboard.writeText(link);
    handleClosePopup();
  };

  const { handleUpdatePinned } = useUpdatePinnedReflection({ reflection });

  const handlePinToggle = () => {
    handleUpdatePinned();
    handleClosePopup();
  };

  return (
    <KebabMenuButton
      reflectionCUID={reflectionCUID}
      username={username}
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      isPinned={isPinned}
      onOpenPopup={handleOpenPopup}
      onClosePopup={handleClosePopup}
      onCopyLink={handleCopyLink}
      onPinToggle={handlePinToggle}
    />
  );
};
