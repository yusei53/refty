import { Box, Typography, useMediaQuery } from "@mui/material";
import ToOtherPageButton from "../reflection-all/ToOtherPageButton";
import { theme } from "@/src/utils/theme";
import { User } from "@prisma/client";
import { ChangeEvent } from "react";
import ArrowPagination from "./ArrowPagination";

type ReflectionAllHeaderProps = {
  currentUsername: User["username"];
  currentPage: number;
  totalPage: number;
  handleChange: (event: ChangeEvent<unknown>, value: number) => void;
};

const ReflectionAllHeader: React.FC<ReflectionAllHeaderProps> = ({
  currentUsername,
  currentPage,
  totalPage,
  handleChange,
}) => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      {isSmallScreen && (
        <Box position={"absolute"} top={-45} right={30}>
          <ToOtherPageButton currentUsername={currentUsername} />
        </Box>
      )}
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        mx={{ xs: 4, md: 3 }}
      >
        <Typography component={"h1"} fontSize={17} letterSpacing={1}>
          みんなの振り返り(公開のみ)
        </Typography>
        {!isSmallScreen && (
          <ToOtherPageButton currentUsername={currentUsername} />
        )}
      </Box>
      <Box position={"absolute"} mt={2} right={18}>
        <ArrowPagination
          currentPage={currentPage}
          totalPage={totalPage}
          onChange={handleChange}
        />
      </Box>
    </>
  );
};

export default ReflectionAllHeader;