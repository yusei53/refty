import { EditorContent } from "@tiptap/react";
import { styled } from "@mui/material/styles";
import { sharedMarkdownStyles } from "@/src/app/_client/features/common/markdown-styles";

export const StyledEditorContent = styled(EditorContent)(({ theme }) => ({
  ...sharedMarkdownStyles(theme)
}));
