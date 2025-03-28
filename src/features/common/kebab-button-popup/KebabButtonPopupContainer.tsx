import { useState } from "react";
import { KebabMenuButton } from "./KebabMenuButton";
import { useUpdatePinnedReflection } from "@/src/hooks/reflection/useUpdatePinnedReflection";
import { useUpdatePublicReflection } from "@/src/hooks/reflection/useUpdatePublicReflection";

type KebabButtonPopupContainerProps = {
  reflectionCUID: string;
  username: string;
  isPublic: boolean;
  isPinned?: boolean;
  isCurrentUser: boolean;
  isReflectionSettingHeader?: boolean;
};

export const KebabButtonPopupContainer: React.FC<
  KebabButtonPopupContainerProps
> = ({
  username,
  reflectionCUID,
  isPublic,
  isPinned = false,
  isCurrentUser,
  isReflectionSettingHeader = false
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpenPopup = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClosePopup = () => {
    setAnchorEl(null);
  };

  const handleCopyLink = () => {
    const link = `${process.env.NEXT_PUBLIC_ROOT_URL}/${username}/${reflectionCUID}`;
    navigator.clipboard.writeText(link);
    handleClosePopup();
  };

  const { handleUpdatePublic } = useUpdatePublicReflection({
    reflectionCUID,
    isPublic
  });

  const handlePublicToggle = () => {
    handleUpdatePublic();
    handleClosePopup();
  };

  const { handleUpdatePinned } = useUpdatePinnedReflection({
    reflectionCUID,
    isPinned
  });

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
      isReflectionSettingHeader={isReflectionSettingHeader}
    />
  );
};
