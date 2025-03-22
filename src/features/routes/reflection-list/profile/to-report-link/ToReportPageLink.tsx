import React from "react";
import Link from "next/link";
import { Box } from "@mui/material";

type ToReportPageLinkProps = {
  username: string;
};
const ToReportPageLink: React.FC<ToReportPageLinkProps> = ({ username }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <Link
        href={`${username}/report`}
        style={{
          color: "#535353",
          display: "inline-flex",
          alignItems: "center",
          marginRight: 28,
          textDecoration: "none",
          borderBottom: "0.5px solid #535353",
          paddingBottom: 1,
          marginTop: -14,
          lineHeight: 0.8
        }}
      >
        {username}のレポートを見る
        <span style={{ paddingBottom: 4 }}>→</span>
      </Link>
    </Box>
  );
};

export default ToReportPageLink;
