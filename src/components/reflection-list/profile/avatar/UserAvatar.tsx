import Image from "next/image";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import { ToHomePageButton } from "../button";
import { theme } from "@/src/utils/theme";

type UserAvatarProps = {
  userImage: string;
  username: string;
};

export const UserAvatar: React.FC<UserAvatarProps> = ({
  userImage,
  username
}) => {
  return (
    <>
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
          <Link href={"/settings/profile"}>
            <Image
              src={"/setting.svg"}
              alt={"プロフィール設定アイコン"}
              color={theme.palette.grey[500]}
              width={20}
              height={20}
              style={{ marginLeft: 8, marginTop: 6 }}
            />
          </Link>
        </Box>
        <ToHomePageButton />
      </Box>
      <Typography ml={9} fontSize={14} color={"#2A2A2A"}>
        好きなものを好きなだけ開発している大学4年生です
      </Typography>
    </>
  );
};
