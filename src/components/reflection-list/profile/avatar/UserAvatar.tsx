import Image from "next/image";
import Link from "next/link";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { theme } from "@/src/utils/theme";

type UserAvatarProps = {
  userImage: string;
  username: string;
  bio: string;
  website: string;
  isCurrentUser: boolean;
};

export const UserAvatar: React.FC<UserAvatarProps> = ({
  userImage,
  username,
  bio,
  website,
  isCurrentUser
}) => {
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Box component={"header"} mx={{ xs: 4, sm: 3 }} mt={{ sm: 8 }}>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
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
          {website && (
            <Link href={website}>
              <Image
                src={"/website.svg"}
                alt={"ウェブサイトアイコン"}
                width={20}
                height={20}
                priority
                style={{ marginLeft: 8, marginTop: 6 }}
              />
            </Link>
          )}
        </Box>
        <Box display={"flex"} gap={1.2}>
          {isCurrentUser && (
            <Link
              href={"/settings/profile"}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Image
                src={"/setting.svg"}
                alt={"プロフィール設定アイコン"}
                width={32}
                height={32}
              />
            </Link>
          )}
          {isLargeScreen && (
            <Link
              href={"/"}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Image src={"/home.svg"} alt={"alt"} width={32} height={32} />
            </Link>
          )}
        </Box>
      </Box>
      <Typography mt={1} fontSize={14} letterSpacing={0.8}>
        {bio}
      </Typography>
    </Box>
  );
};
