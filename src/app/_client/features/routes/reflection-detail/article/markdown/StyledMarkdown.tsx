import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { sharedMarkdownStyles } from "@/src/app/_client/features/common/markdown-styles";

export const StyledMarkdown = styled(Box)(({ theme }) => ({
  ...sharedMarkdownStyles(theme)
}));
