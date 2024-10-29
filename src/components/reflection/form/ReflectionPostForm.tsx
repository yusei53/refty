import { Box, Container, Stack } from "@mui/material";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { CustomInput } from "../../shared/input";
import { Button } from "../../shared/button";
import { ErrorMessage } from "../../shared/alert";
import { MarkdownEditor, MarkdownEditorRef } from "./markdown-editor";
import { useRef, useState } from "react";
import EmojiPicker from "./EmojiPicker";
import {
  REFLECTION_TEMPLATES,
  ReflectionTemplatePopupAreaContainer,
} from "./popup/reflection-template";
import { PublishSettingPopupAreaContainer } from "./popup/publish-setting";

type FormValues = {
  title: string;
  content: string;
  charStamp: string;
  isPublic: boolean;
};

type ReflectionPostFormProps = {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  isLoading: boolean;
  onSubmit: (event: React.FormEvent) => Promise<void>;
};

// TODO: UIとロジックが微妙に混在気味なのでコンポーネント分割を検討
const ReflectionPostForm: React.FC<ReflectionPostFormProps> = ({
  control,
  errors,
  isLoading = false,
  onSubmit,
}) => {
  const [selectedEmoji, setSelectedEmoji] = useState("💭");
  const [isComposing, setIsComposing] = useState(false);
  const editorRef = useRef<MarkdownEditorRef>(null);

  const handleEnter = () => {
    if (editorRef.current && !isComposing) {
      editorRef.current.focus();
    }
  };

  const handleCompositionStart = () => setIsComposing(true);
  const handleCompositionEnd = () => setIsComposing(false);

  const handleInsertTemplate = (template: string) => {
    const editor = editorRef.current;
    if (editor) {
      editor.insertText(template);
    }
  };

  const handleClearContent = () => {
    const editor = editorRef.current;
    if (editor) {
      editor.clearContent();
    }
  };

  return (
    <Box component={"form"} onSubmit={onSubmit}>
      <Box display={"flex"} position={"fixed"} top={25} right={35}>
        <ReflectionTemplatePopupAreaContainer
          onInsertTemplate={handleInsertTemplate}
          onClearContent={handleClearContent}
          reflectionTemplateType={REFLECTION_TEMPLATES}
        />
        <Controller
          name="isPublic"
          control={control}
          render={({ field }) => (
            <PublishSettingPopupAreaContainer
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Button type={"submit"} disabled={isLoading}>
          {isLoading ? "投稿中..." : "投稿する"}
        </Button>
      </Box>
      <Container maxWidth="md" sx={{ my: 15 }}>
        <Stack gap={10} m={{ md: 10 }}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Box>
                <CustomInput
                  id="title"
                  placeholder="タイトル"
                  value={field.value}
                  onChange={field.onChange}
                  onEnter={handleEnter}
                  onCompositionStart={handleCompositionStart}
                  onCompositionEnd={handleCompositionEnd}
                />
                {errors.title && (
                  <ErrorMessage message={errors.title.message} />
                )}
              </Box>
            )}
          />
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <Box>
                <MarkdownEditor
                  value={field.value}
                  ref={editorRef}
                  onChange={field.onChange}
                />
                {errors.content && (
                  <ErrorMessage message={errors.content.message} />
                )}
              </Box>
            )}
          />
          <Controller
            name="charStamp"
            control={control}
            render={({ field }) => (
              <Box>
                <EmojiPicker
                  selectedEmoji={selectedEmoji}
                  setSelectedEmoji={setSelectedEmoji}
                  onChange={field.onChange}
                />
                {errors.charStamp && (
                  <ErrorMessage message={errors.charStamp.message} />
                )}
              </Box>
            )}
          />
        </Stack>
      </Container>
    </Box>
  );
};

export default ReflectionPostForm;
