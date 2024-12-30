import { useState } from "react";
import { Box } from "@mui/material";
import type { Reflection } from "@/src/api/reflection-api";
import { KebabMenuButton } from "./KebabMenuButton";
import { useUpdatePinnedReflection } from "@/src/hooks/reflection/useUpdatePinnedReflection";
import { useUpdatePublicReflection } from "@/src/hooks/reflection/useUpdatePublicReflection";

type KebabButtonPopupContainerProps = {
  reflectionCUID: string;
  username: string;
  reflection: Reflection;
  isPublic: boolean;
  isPinned: boolean;
  isCurrentUser: boolean;
};

export const KebabButtonPopupContainer: React.FC<
  KebabButtonPopupContainerProps
> = ({
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
    <>
      {Boolean(anchorEl) && (
        // MEMO: なぜかこのPopperは外側をクリックしてもスマホで閉じないため、透明なBoxを設置
        <Box
          onClick={handleClosePopup}
          position="fixed"
          top={0}
          left={0}
          width="100vw"
          height="100vh"
          zIndex={3}
        />
      )}
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
    </>
  );
};
