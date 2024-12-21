import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import type { Reflection } from "@/src/api/reflection-api";
import { KebabMenuButton } from "../../ui/shared/popup";
import { useUpdatePinnedReflection } from "@/src/hooks/reflection/useUpdatePinnedReflection";
import { formatDate } from "@/src/utils/date-helper";
import { theme } from "@/src/utils/theme";

type ReflectionCardProps = {
  username: string;
  reflection: Reflection;
  isCurrentUser: boolean;
};

// MEMO: ここ書き換えたら、../../reflection-all/ReflectionCardWithUser.tsxも書き換える
const ReflectionCard: React.FC<ReflectionCardProps> = ({
  username,
  reflection,
  isCurrentUser
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { handleUpdatePinned } = useUpdatePinnedReflection({ reflection });

  return (
    <Box component={"article"} position={"relative"} sx={article}>
      {isCurrentUser && (
        <KebabMenuButton
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClick={handleClick}
          onClose={handleClose}
          onUpdatePinned={handleUpdatePinned}
          username={username}
          reflectionCUID={reflection.reflectionCUID}
          sx={{ position: "absolute", right: 2, top: 10, zIndex: 2 }}
          isPinned={reflection.isPinned}
        />
      )}
      <Box
        component={Link}
        href={`/${username}/${reflection.reflectionCUID}`}
        p={2}
        sx={box}
      >
        <Box display={"flex"} mt={1.5}>
          <Typography
            color={"black"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            display={"-webkit-box"}
            pr={10}
            letterSpacing={0.9}
            lineHeight={1.4}
            sx={{
              // MEMO: 2行で切り捨てるためのcss
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2
            }}
          >
            {reflection.title}
          </Typography>
          <Box
            position={"absolute"}
            right={30}
            top={22}
            borderRadius={10}
            width={55}
            height={55}
            bgcolor={theme.palette.primary.main}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Typography fontSize={33}>{reflection.charStamp}</Typography>
          </Box>
          <Box position={"absolute"} bottom={{ xs: 12, sm: 15 }}>
            <Box display={"flex"} alignItems={"center"}>
              <Box
                component={"time"}
                display={"flex"}
                alignItems={"center"}
                mr={2}
              >
                <Image
                  src={"/calendar.svg"}
                  alt={"カレンダーアイコン"}
                  width={20}
                  height={20}
                />
                <Typography color={theme.palette.grey[600]} ml={0.8} pt={0.2}>
                  {formatDate(reflection.createdAt)}
                </Typography>
              </Box>
              {!reflection.isPublic && (
                <Image
                  src={"/lock-google.svg"}
                  alt={"非公開アイコン"}
                  width={20}
                  height={20}
                />
              )}
              {reflection.isPinned && (
                <Image
                  src={"/pin.svg"}
                  alt={"ピン止めアイコン"}
                  width={20}
                  height={20}
                />
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const article = {
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05), 0 1px 1px rgba(0, 0, 0, 0.03)",
  borderRadius: 3,
  cursor: "pointer",
  border: `1.2px solid ${theme.palette.primary.main}`,
  transition: "box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s",
  "&:hover": {
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)",
    transform: "translateY(-3px)"
  }
};

const box = {
  textDecoration: "none",
  // MEMO: 79vwはスマホの様々な画面幅に合わせている(px固定値じゃ対応できない)
  width: { xs: "79vw", sm: 380 },
  height: 120,
  // MEMO: aタグにblock要素を指定すると長方形が表示できる
  display: "block"
};
export default ReflectionCard;
