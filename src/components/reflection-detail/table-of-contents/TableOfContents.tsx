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
          right: { xs: 25, lg: 125 },
          maxWidth: { xs: "14ch", lg: "25ch" },
          backgroundColor: theme.palette.grey[400],
          borderRadius: 2,
          pr: 2
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
      <Typography component="nav" className="toc" />
    </Box>
  );
};
