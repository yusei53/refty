import { Box, Typography } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Link from "next/link";
import Image from "next/image";
import { theme } from "@/src/utils/theme";
import { ReflectionWithUser } from "@/src/api/reflection-api";
import { formatDate } from "@/src/utils/date-helper";

type ReflectionCardWithUserProps = {
  reflection: ReflectionWithUser;
};

// MEMO: ここ書き換えたら、../user-reflection-list/reflection-list/ReflectionCard.tsxも書き換える
const ReflectionCardWithUser: React.FC<ReflectionCardWithUserProps> = ({
  reflection,
}) => {
  return (
    <Box component={"article"}>
      <Box
        position={"relative"}
        p={2}
        sx={{
          textDecoration: "none",
          ...article,
        }}
      >
        <Link
          href={`/${reflection.user.username}/${reflection.reflectionCUID}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
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
              WebkitLineClamp: 2,
            }}
          >
            {reflection.title}
          </Typography>
          <Box
            position={"absolute"}
            right={20}
            top={20}
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
                  textDecoration: "none",
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
                  sx={{
                    "&:hover": {
                      textDecoration: "underline",
                    },
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
              <Typography color={theme.palette.grey[600]} ml={0.8}>
                {formatDate(reflection.createdAt)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
const article = {
  width: { xs: 305, sm: 380 },
  height: 120,
  borderRadius: 3,
  border: `1.2px solid ${theme.palette.primary.main}`,
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05), 0 1px 1px rgba(0, 0, 0, 0.03)",
  transition: "box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s",
  "&:hover": {
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)",
    transform: "translateY(-3px)",
  },
};
export default ReflectionCardWithUser;
