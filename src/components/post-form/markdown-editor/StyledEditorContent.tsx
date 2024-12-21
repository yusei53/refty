import { EditorContent } from "@tiptap/react";
import { styled } from "@mui/material/styles";

// MEMO: ここ書き換えたら、components/reflection-detail/StyledMarkdown.tsxも書き換える
const StyledEditorContent = styled(EditorContent)(({ theme }) => ({
  letterSpacing: "0.04em",
  lineHeight: 1.7,
  fontSize: "1.05rem",
  fontWeight: 500,
  ".tiptap p.is-editor-empty:first-of-type::before": {
    color: "#adb5bd",
    content: "attr(data-placeholder)",
    float: "left",
    height: 0,
    pointerEvents: "none"
  },
  "& .ProseMirror": {
    outline: "none"
  },
  "&": {
    "&:first-of-type": {
      marginTop: 2
    },
    p: {
      marginTop: "1em",
      marginBottom: "2.5em"
    },
    /* List styles */
    "ul, ol": {
      padding: "0 0.3rem 0 1rem",
      margin: "0.4rem 0rem 1.25rem 0.4rem",
      "& li p": {
        marginTop: "0.25em",
        marginBottom: "0.25em"
      }
    },

    a: {
      color: theme.palette.primary.light,
      textDecoration: "underline",
      cursor: "pointer",
      wordBreak: "break-word"
    },

    /* Heading styles */
    "h1, h2, h3, h4, h5, h6": {
      lineHeight: 1.1,
      marginTop: "2rem",
      textWrap: "pretty"
    },

    "h1, h2": {
      marginTop: "4rem",
      marginBottom: "1.2rem",
      borderBottom: "1px solid #e0e0e0"
    },

    h1: {
      fontSize: "1.4rem"
    },

    h2: {
      fontSize: "1.3rem"
    },

    h3: {
      fontSize: "1.2rem"
    },

    "h4, h5, h6": {
      fontSize: "1.1rem"
    },

    /* Code and preformatted text styles */
    code: {
      backgroundColor: "#f0f0f0",
      borderRadius: "0.4rem",
      color: "var(--black)",
      fontSize: "0.95rem",
      padding: "0.25em 0.3em",
      overflowX: "auto",
      wordBreak: "break-word"
    },

    pre: {
      background: "#1e1e1e",
      color: "white",
      fontFamily: "'JetBrainsMono', monospace",
      borderRadius: "0.4rem",
      margin: "1.5rem 0",
      padding: "0.75rem 1rem",
      overflowX: "auto",
      maxWidth: "100%",
      boxSizing: "border-box",

      "& code": {
        backgroundColor: "transparent",
        fontSize: "0.9rem"
      }
    },

    mark: {
      backgroundColor: "#fffbc4",
      borderRadius: "0.4rem",
      boxDecorationBreak: "clone",
      padding: "0.1rem 0.3rem"
    },

    blockquote: {
      borderLeft: "3px solid #B7B8B8",
      color: "#7d8186",
      margin: "1.5rem 0",
      paddingLeft: "1rem"
    },

    hr: {
      border: "#7d8186",
      borderTop: "1px solid grey",
      margin: "2rem 0"
    }
  }
}));

export default StyledEditorContent;
