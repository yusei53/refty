import { Box, Container, Stack } from "@mui/material";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { CustomInput } from "../shared/input";
import { Button } from "../shared/button";
import { ErrorMessage } from "../shared/alert";
import { MarkdownEditor, MarkdownEditorRef } from "./markdown-editor";
import { useRef, useState } from "react";
import EmojiPicker from "./EmojiPicker";
import {
  REFLECTION_TEMPLATES,
  ReflectionTemplatePopupAreaContainer,
} from "./popup/reflection-template";
import { PublishSettingPopupAreaContainer } from "./popup/publish-setting";
import ReflectionTemplateInstruct from "./popup/reflection-template/ReflectionTemplateInstruct";

type FormValues = {
  title: string;
  content: string;
  charStamp: string;
  isPublic: boolean;
};

type ReflectionPostFormProps = {
  control: Control<FormValues>;
  isSubmitting: boolean;
  isSubmitSuccessful: boolean;
  errors: FieldErrors<FormValues>;
  onSubmit: (event: React.FormEvent) => Promise<void>;
};

// TODO: UIとロジックが微妙に混在気味なのでコンポーネント分割を検討
const ReflectionPostForm: React.FC<ReflectionPostFormProps> = ({
  control,
  isSubmitting,
  isSubmitSuccessful,
  errors,
  onSubmit,
}) => {
  const [selectedEmoji, setSelectedEmoji] = useState("💭");
  const [isComposing, setIsComposing] = useState(false);
  const editorRef = useRef<MarkdownEditorRef>(null);

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (editorRef.current && !isComposing) {
        editorRef.current.focus();
      }
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
      <Box
        component={"header"}
        display={"flex"}
        justifyContent={"flex-end"}
        position={"fixed"}
        top={{ xs: 0, md: 25 }}
        right={{ xs: 0, md: 35 }}
        bgcolor={{ xs: "white", md: "transparent" }}
        width={{ xs: "100%", md: "auto" }}
        px={{ xs: 1.5, md: 0 }}
        py={{ xs: 1, md: 0 }}
        zIndex={1}
        boxShadow={{ xs: "0px 1px 2.5px rgba(0, 0, 0, 0.1)", md: "none" }}
      >
        <Box
          position={"fixed"}
          top={25}
          right={35}
          display={"flex"}
          flexDirection={{ xs: "column", md: "row" }}
        >
          <Box order={{ xs: 1, md: 0 }} mb={{ xs: 4, md: 0 }}>
            <ReflectionTemplateInstruct
              title={"ヒント"}
              description={"テンプレートの利用でより良い振り返りを"}
              fadeOut
            />
          </Box>
          <Box
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            order={0}
          >
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
            <Box width={100}>
              <Button
                type="submit"
                disabled={isSubmitting || isSubmitSuccessful}
              >
                {isSubmitting || isSubmitSuccessful ? "投稿中..." : "投稿する"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box my={{ xs: 12, md: 10 }} mx={{ xs: 0.5, md: 12 }}>
        <Stack gap={3} m={{ md: 2 }}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Box mt={{ xs: 2, md: 5 }}>
                <CustomInput
                  id="title"
                  placeholder="タイトル"
                  value={field.value}
                  onChange={field.onChange}
                  onEnter={(e) => handleEnter(e)}
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
      </Box>
    </Box>
  );
};

export default ReflectionPostForm;
