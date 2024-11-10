import { forwardRef, useImperativeHandle } from "react";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import StyledEditorContent from "./StyledEditorContent";

type MarkdownEditorProps = {
  value: string;
  onChange: (content: string) => void;
};

export type MarkdownEditorRef = {
  focus: () => void;
  insertText: (text: string) => void;
  clearContent: () => void;
};

export const MarkdownEditor = forwardRef<
  MarkdownEditorRef,
  MarkdownEditorProps
>(({ value, onChange }, ref) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Typography,
      Placeholder.configure({
        placeholder: "文章を入力",
      }),
      Link.configure({
        openOnClick: true, // クリックでリンクを開く
        autolink: true, // 自動リンク化
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  useImperativeHandle(
    ref,
    () => ({
      focus: () => {
        editor?.commands.focus();
      },
      insertText: (text: string) => {
        editor?.commands.insertContent(text);
      },
      clearContent: () => {
        editor?.commands.setContent("");
      },
    }),
    [editor]
  );

  return <StyledEditorContent editor={editor} />;
});

MarkdownEditor.displayName = "MarkdownEditor";
