import Link from "next/link";
import { Box } from "@mui/material";
import type { ReflectionWithIncludeContent } from "@/src/api/reflection-api";
import { ReflectionArticle } from "../../reflection-detail/article";
import { theme } from "@/src/utils/theme";

type FullViewReflectionPaperProps = {
  reflection: ReflectionWithIncludeContent;
  username: string;
  userImage: string;
};

export const FullViewReflectionPaper = ({
  reflection,
  username,
  userImage
}: FullViewReflectionPaperProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "380px",
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.grey[300]}`,
        transition: "transform 0.3s ease-in-out",
        position: "relative",
        paddingRight: "4px",
        "&:hover": {
          paddingRight: "0px",
          transform: "scale(1.2)",
          boxShadow: `0 6px 24px 0 ${theme.palette.grey[400]}`,
          zIndex: 1,
          overflow: "auto",
          overflowX: "hidden",
          "&::-webkit-scrollbar": {
            width: "4px"
          },
          "&::-webkit-scrollbar-track": {
            background: theme.palette.grey[100],
            borderRadius: "2px"
          },
          "&::-webkit-scrollbar-thumb": {
            background: theme.palette.grey[300],
            borderRadius: "2px",
            "&:hover": {
              background: theme.palette.grey[400]
            }
          }
        }
      }}
    >
      <Link
        href={`/${username}/${reflection.reflectionCUID}`}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1
        }}
      />
      <Box
        mt={-7}
        height={"100%"}
        minWidth={"150%"}
        sx={{
          transform: "scale(0.55)"
        }}
      >
        <ReflectionArticle
          username={username}
          userImage={userImage}
          createdAt={reflection.createdAt}
          title={reflection.title}
          content={reflection.content}
          activeTags={[]} //TODO: API置き換える時に追加
          reflectionCUID={reflection.reflectionCUID}
        />
      </Box>
    </Box>
  );
};
