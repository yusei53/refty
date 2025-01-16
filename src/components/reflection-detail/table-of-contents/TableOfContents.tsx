import React from "react";
import { Box } from "@mui/material";
import { theme } from "@/src/utils/theme";

const TableOfContents = () => {
  return (
    <Box
      display={{ xs: "none", md: "block" }}
      sx={{
        ".toc": {
          position: "absolute",
          top: 200,
          right: { xs: -150, lg: -225 },
          maxWidth: { xs: "14ch", lg: "25ch" }
        },
        ".toc-list-item": {
          listStyle: "none"
        },
        ".toc-link": {
          textDecoration: "none",
          color: theme.palette.grey[600],
          "&:hover": {
            textDecoration: "underline",
            cursor: "pointer"
          }
        },
        ".toc-list li::before": {
          content: '"•"',
          color: theme.palette.grey[600],
          display: "inline-block",
          width: "1em",
          marginLeft: "-1em"
        }
      }}
    >
      <nav className="toc" />
    </Box>
  );
};

export default TableOfContents;
