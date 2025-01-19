import { Box, Typography } from "@mui/material";
import { theme } from "@/src/utils/theme";

export const TableOfContents = () => {
  return (
    <Box
      display={{ xs: "none", md: "block" }}
      sx={{
        ".toc": {
          position: "fixed",
          top: 200,
          right: { md: 10, lg: 24 },
          maxWidth: { md: "14ch", lg: "28ch" },
          backgroundColor: theme.palette.grey[50],
          borderRadius: 2,
          pr: 3,
          py: 1
        },
        ".toc-list-item": {
          listStyle: "none",
          fontSize: 13.5,
          py: 0.6
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
      <Typography component="nav" className="toc" />
    </Box>
  );
};
