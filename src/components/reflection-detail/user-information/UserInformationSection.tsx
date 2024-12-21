import Image from "next/image";
import Link from "next/link";
import { Box, Divider, Typography } from "@mui/material";
import { link } from "../article";
import { theme } from "@/src/utils/theme";

type UserInformationSectionProps = {
  username: string;
  userImage: string;
  reflectionCount: number;
};

export const UserInformationSection: React.FC<UserInformationSectionProps> = ({
  username,
  userImage,
  reflectionCount
}) => {
  return (
    <Box component={"section"} mt={14} mb={10}>
      <Divider sx={{ borderColor: theme.palette.grey[400] }} />
      <Box my={3} display={"flex"} alignItems={"center"}>
        <Link
          href={`/${username}`}
          style={{
            display: "flex",
            alignItems: "center"
          }}
        >
          <Image
            src={userImage}
            alt={`${username}の画像`}
            width={55}
            height={55}
            priority
            style={{ borderRadius: 100, marginRight: 8 }}
          />
        </Link>
        <Box display={"flex"} flexDirection={"column"} gap={0.5}>
          <Typography component={Link} href={`/${username}`} sx={link}>
            {username}
          </Typography>
          <Typography color={`${theme.palette.grey[600]}`}>
            {`${username}`} has shared {reflectionCount} reflections. Discover
            new insights this platform.
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ borderColor: theme.palette.grey[400] }} />
    </Box>
  );
};
