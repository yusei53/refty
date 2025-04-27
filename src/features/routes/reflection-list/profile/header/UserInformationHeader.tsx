import Image from "next/image";
import Link from "next/link";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { theme } from "@/src/app/_client/utils/theme";

type UserInformationHeaderProps = {
  userImage: string;
  username: string;
  bio: string;
  website: string;
  isCurrentUser: boolean;
};

const link = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "42px",
  height: "42px",
  borderRadius: "50%",
  transition: "background-color 0.3s ease"
};

export const UserInformationHeader: React.FC<UserInformationHeaderProps> = ({
  userImage,
  username,
  bio,
  website,
  isCurrentUser
}) => {
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Box component={"header"} mx={{ xs: 4, sm: 3 }} mt={{ sm: 10 }}>
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
        </Box>
        <Box display={"flex"} gap={0.5}>
          {isCurrentUser && (
            <>
              {/* // TODO: コンポーネント化したい */}
              <Link
                href={`${username}/book`}
                style={link}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = `${theme.palette.grey[100]}`)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <Image
                  src={"/book.svg"}
                  alt={"マイブックへ行くアイコンボタン"}
                  width={36}
                  height={36}
                />
              </Link>
              <Link
                href={"/settings/profile"}
                style={link}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = `${theme.palette.grey[100]}`)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <Image
                  src={"/setting.svg"}
                  alt={"プロフィール設定へ行くアイコンボタン"}
                  width={36}
                  height={36}
                />
              </Link>
            </>
          )}
          {isLargeScreen && (
            <Link
              href="/"
              style={link}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = `${theme.palette.grey[100]}`)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <Image
                src={"/home.svg"}
                alt={"ホームへ行くアイコンボタン"}
                width={36}
                height={36}
              />
            </Link>
          )}
        </Box>
      </Box>
      {(bio || website) && (
        <Box mt={2} mb={7} display={"flex"} flexDirection={"column"} gap={0.5}>
          {bio && (
            <Typography fontSize={15} letterSpacing={0.8}>
              {bio}
            </Typography>
          )}
          {website && (
            <Link
              href={website}
              style={{
                color: `${theme.palette.primary.light}`,
                display: "flex",
                alignItems: "center",
                fontSize: 14
              }}
            >
              <Image
                src={"/link.svg"}
                alt={"プロフィール設定アイコン"}
                width={19}
                height={19}
                style={{
                  marginRight: 2
                }}
              />
              {website}
            </Link>
          )}
        </Box>
      )}
    </Box>
  );
};
