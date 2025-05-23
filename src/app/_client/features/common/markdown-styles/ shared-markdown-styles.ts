import type { Theme } from "@mui/material/styles";

export const sharedMarkdownStyles = (theme: Theme) => ({
  letterSpacing: "0.03em",
  lineHeight: "2rem",
  fontSize: "1.05rem",
  fontWeight: 500,
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.95rem"
  },
  ".tiptap p.is-editor-empty:first-of-type::before": {
    color: "#adb5bd",
    content: "attr(data-placeholder)",
    float: "left",
    height: 0,
    pointerEvents: "none"
  },
  "& .ProseMirror": {
    outline: "none",
    fontSize: "16px"
  },
  "&": {
    "&:first-of-type": {
      marginTop: 2
    },
    p: {
      marginTop: "1em",
      marginBottom: "1.8em"
    },
    /* List styles */
    "ul, ol": {
      padding: "0 0.3rem 0 1rem",
      margin: "0.2rem 0rem 1rem 0.3rem",
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
      lineHeight: 1.4,
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
      fontSize: "1.3rem",
      paddingBottom: "0.2rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.2rem"
      }
    },

    h3: {
      marginTop: "3.8rem",
      marginBottom: "1rem",
      fontSize: "1.24rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.1rem"
      }
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
});
