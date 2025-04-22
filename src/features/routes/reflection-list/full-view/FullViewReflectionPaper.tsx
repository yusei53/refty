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

export const FullViewReflectionPaper: React.FC<
  FullViewReflectionPaperProps
> = ({ reflection, username, userImage }) => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      height={"380px"}
      overflow={"hidden"}
      bgcolor={"white"}
      border={`1px solid ${theme.palette.grey[300]}`}
      position={"relative"}
      pr={"4px"}
      sx={{
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.2)",
          zIndex: 1,
          boxShadow: `0 6px 24px 0 ${theme.palette.grey[400]}`,
          ...scrollbar
        }
      }}
    >
      <Link
        href={`/${username}/${reflection.reflectionCUID}`}
        style={{
          position: "absolute",
          zIndex: 1,
          top: 0,
          left: 0,
          width: "100%",
          height: "100%"
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

const scrollbar = {
  pr: "0px",
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
};
