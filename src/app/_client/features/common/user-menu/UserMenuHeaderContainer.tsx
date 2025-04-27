import { useState } from "react";
import { LoginButtonHeader } from "./LoginButtonHeader";
import { UserMenuHeader } from "./UserMenuHeader";

type UserMenuHeaderContainerProps = {
  username: string | null;
  userImage: string | null;
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

  if (!username || !userImage) {
    return <LoginButtonHeader />;
  }

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
