import React from "react";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import { theme } from "@/src/utils/theme";

type ToReportPageLinkProps = {
  username: string;
};
const ToReportPageLink: React.FC<ToReportPageLinkProps> = ({ username }) => {
  return (
    <Box display={"flex"} justifyContent={"flex-end"}>
      <Link
        href={`${username}/report`}
        style={{
          color: theme.palette.grey[600],
          display: "inline-flex",
          alignItems: "center",
          marginRight: 28,
          textDecoration: "none",
          borderBottom: "0.5px solid #535353",
          paddingBottom: 1,
          marginTop: -14
        }}
      >
        {username}のレポートを見る
        <Typography
          component={"span"}
          style={{ paddingBottom: 4 }}
          lineHeight={1.1}
        >
          →
        </Typography>
      </Link>
    </Box>
  );
};

export default ToReportPageLink;
