import { useState } from "react";
import type { User } from "@prisma/client";
import { UserMenuHeader } from "./UserMenuHeader";

type UserMenuHeaderContainerProps = {
  username: User["username"];
  userImage: string;
};

export const UserMenuHeaderContainer: React.FC<
  UserMenuHeaderContainerProps
> = ({ username, userImage }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpenPopup = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClosePopup = () => {
    setAnchorEl(null);
  };

  return (
    <UserMenuHeader
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onOpenPopup={handleOpenPopup}
      onClosePopup={handleClosePopup}
      username={username}
      userImage={userImage}
    />
  );
};
