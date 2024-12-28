import { useState } from "react";
import type { Reflection } from "@/src/api/reflection-api";
import { KebabMenuButton } from "./KebabMenuButton";
import { useUpdatePinnedReflection } from "@/src/hooks/reflection/useUpdatePinnedReflection";
import { useUpdatePublicReflection } from "@/src/hooks/reflection/useUpdatePublicReflection";

type PopupContainerProps = {
  reflectionCUID: string;
  username: string;
  reflection: Reflection;
  isPublic: boolean;
  isPinned: boolean;
  isCurrentUser: boolean;
};

export const PopupContainer: React.FC<PopupContainerProps> = ({
  username,
  reflectionCUID,
  reflection,
  isPublic,
  isPinned,
  isCurrentUser
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

  const { handleUpdatePublic } = useUpdatePublicReflection({ reflection });

  const handlePublicToggle = () => {
    handleUpdatePublic();
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
      isPublic={isPublic}
      isPinned={isPinned}
      isCurrentUser={isCurrentUser}
      onOpenPopup={handleOpenPopup}
      onClosePopup={handleClosePopup}
      onCopyLink={handleCopyLink}
      onPublicToggle={handlePublicToggle}
      onPinToggle={handlePinToggle}
    />
  );
};
