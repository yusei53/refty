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
          borderBottom: `0.5px solid ${theme.palette.grey[600]}`,
          paddingBottom: 1,
          // TODO: CalenderAreaの余白関係のリファクタと一緒にmarginの大きい値を削除する
          marginTop: -14,
          fontSize: theme.typography.fontSize,
          letterSpacing: 0.8
        }}
      >
        {username}のレポートを見る
        <Typography component={"span"} pb={0.5} lineHeight={1.1}>
          →
        </Typography>
      </Link>
    </Box>
  );
};

export default ToReportPageLink;
