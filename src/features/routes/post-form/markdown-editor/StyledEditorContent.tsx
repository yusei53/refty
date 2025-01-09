import { EditorContent } from "@tiptap/react";
import { styled } from "@mui/material/styles";
import { sharedMarkdownStyles } from "@/src/features/common/markdown";

export const StyledEditorContent = styled(EditorContent)(({ theme }) => ({
  ...sharedMarkdownStyles(theme)
}));
