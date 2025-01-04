import Image from "next/image";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import type { ReflectionWithUser } from "@/src/api/reflection-api";
import { KebabButtonPopupContainer } from "../../ui/shared/popup";
import { formatDate } from "@/src/utils/date-helper";
import { theme } from "@/src/utils/theme";

type ReflectionCardWithUserProps = {
  reflection: ReflectionWithUser;
  isCurrentUser: boolean;
};

// MEMO: ここ書き換えたら、../reflection-list/reflection-list/ReflectionCard.tsxも書き換える
const ReflectionCardWithUser: React.FC<ReflectionCardWithUserProps> = ({
  reflection,
  isCurrentUser
}) => {
  return (
    <Box component={"article"}>
      <Box position={"relative"} p={2} sx={article}>
        <Box
          sx={{
            position: "absolute",
            right: 2,
            top: 10,
            zIndex: 2
          }}
        >
          <KebabButtonPopupContainer
            reflectionCUID={reflection.reflectionCUID}
            username={reflection.user.username}
            isPublic={reflection.isPublic}
            isPinned={reflection.isPinned}
            isCurrentUser={isCurrentUser}
            isReflectionSetting={false}
          />
        </Box>
        <Link
          href={`/${reflection.user.username}/${reflection.reflectionCUID}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1
          }}
        />
        <Box display={"flex"} mt={1.2}>
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
          <Box
            display={"flex"}
            alignItems={"center"}
            position={"absolute"}
            bottom={{ xs: 12, md: 15 }}
          >
            <Box display={"flex"} alignItems={"center"}>
              <Link
                href={`/${reflection.user.username}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none"
                }}
              >
                <Image
                  src={reflection.user.image ?? "/no-image.png"}
                  alt={`${reflection.user.username}のアイコン`}
                  width={22}
                  height={22}
                  style={{ borderRadius: 10 }}
                />
                <Typography
                  color={theme.palette.grey[600]}
                  ml={0.5}
                  zIndex={1}
                  maxWidth={{ xs: 100, md: 120 }}
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
                  sx={{
                    "&:hover": {
                      textDecoration: "underline"
                    }
                  }}
                >
                  {reflection.user.username}
                </Typography>
              </Link>
            </Box>
            <Box
              component={"time"}
              display={"flex"}
              alignItems={"center"}
              position={"absolute"}
              left={{ xs: 125, md: 140 }}
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
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

//MEMO: ../reflection-list/reflection-list/ReflectionCard.tsxとhtml構造が微妙に違うのは申し訳ない。共通化できるようにいつかはしたい
const article = {
  // MEMO: 79vwはスマホの様々な画面幅に合わせている(px固定値じゃ対応できない)
  width: { xs: "79vw", sm: 380 },
  height: 120,
  borderRadius: 3,
  border: `1.2px solid ${theme.palette.primary.main}`,
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05), 0 1px 1px rgba(0, 0, 0, 0.03)",
  transition: "box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s",
  textDecoration: "none",
  "&:hover": {
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)",
    transform: "translateY(-3px)"
  }
};
export default ReflectionCardWithUser;
