import Image from "next/image";
import { Box, Typography } from "@mui/material";
import ReportPublicPopupContainer from "./popup/ReportPublicPopupContainer";
import { theme } from "@/src/utils/theme";

type ReportHeaderProps = {
  userImage: string;
  username: string;
  isReportOpen: boolean;
  isCurrentUser: boolean;
};

export const ReportHeader: React.FC<ReportHeaderProps> = ({
  userImage,
  username,
  isReportOpen,
  isCurrentUser
}) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      mx={{ xs: 4, sm: 3 }}
      mt={{ sm: 10 }}
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
        <Typography fontSize={15} color={theme.palette.grey[600]}>
          のレポート
        </Typography>
      </Box>
      <Box>
        {isCurrentUser && (
          <ReportPublicPopupContainer
            username={username}
            isReportOpen={isReportOpen}
            isCurrentUser={isCurrentUser}
          />
        )}
      </Box>
    </Box>
  );
};
