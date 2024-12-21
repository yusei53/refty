import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { ToHomePageButton } from "../button";

type UserAvatarProps = {
  userImage: string;
  username: string;
};

export const UserAvatar: React.FC<UserAvatarProps> = ({
  userImage,
  username
}) => {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      mx={{ xs: 4, sm: 3 }}
      mt={{ sm: 8 }} // MEMO: ほんとは当てたくないけどデザイン的にhotfixで当てている
    >
      <Box display={"flex"} alignItems={"center"}>
        <Image
          src={userImage}
          alt={`${username}の画像`}
          width={40}
          height={40}
          priority
          style={{ borderRadius: 100, marginRight: 8 }}
        />
        <Typography fontSize={16}>{username}</Typography>
      </Box>
      <ToHomePageButton />
    </Box>
  );
};
