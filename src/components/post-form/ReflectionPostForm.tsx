import { useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { Box, Stack, useMediaQuery } from "@mui/material";
import type { MarkdownEditorRef } from "./markdown-editor";
import type { Control, FieldErrors } from "react-hook-form";
import EmojiPicker from "./EmojiPicker";
import { MarkdownEditor } from "./markdown-editor";
import { MarkdownSupportPopupAreaContainer } from "./popup/markdown-support";
import { PublishSettingPopupAreaContainer } from "./popup/publish-setting";
import {
  REFLECTION_TEMPLATES,
  ReflectionTemplatePopupAreaContainer
} from "./popup/reflection-template";
import { SelectTagPopupContainer } from "./popup/select-tag/SelectTagContainer";
import { useExtractTrueTags } from "@/src/hooks/reflection-tag/useExtractTrueTags";
import { ErrorMessage } from "@/src/ui/shared/alert";
import { Button } from "@/src/ui/shared/button";
import { CustomInput } from "@/src/ui/shared/input";
import { theme } from "@/src/utils/theme";

type FormValues = {
  title: string;
  content: string;
  charStamp: string;
  isPublic: boolean;
  isDailyReflection: boolean;
  isLearning: boolean;
  isAwareness: boolean;
  isInputLog: boolean;
  isMonologue: boolean;
};

type ReflectionPostFormProps = {
  control: Control<FormValues>;
  isSubmitting: boolean;
  isSubmitSuccessful: boolean;
  errors: FieldErrors<FormValues>;
  onSubmit: (event: React.FormEvent) => Promise<void>;
  selectedEmoji: string;
  onEmojiChange: (emoji: string) => void;
  onTagChange: (tag: string, isSelected: boolean) => void;
  // NOTE: ここから下はUpdateReflectionFormでのみ使用
  isDailyReflection?: boolean;
  isLearning?: boolean;
  isAwareness?: boolean;
  isInputLog?: boolean;
  isMonologue?: boolean;
};

const ReflectionPostForm: React.FC<ReflectionPostFormProps> = ({
  control,
  isSubmitting,
  isSubmitSuccessful,
  errors,
  onSubmit,
  selectedEmoji,
  onEmojiChange,
  onTagChange,
  isDailyReflection = false,
  isLearning = false,
  isAwareness = false,
  isInputLog = false,
  isMonologue = false
}) => {
  const [isComposing, setIsComposing] = useState(false);
  const editorRef = useRef<MarkdownEditorRef>(null);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const activeTags = useExtractTrueTags({
    isDailyReflection,
    isLearning,
    isAwareness,
    isInputLog,
    isMonologue
  });

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
    <Box component={"form"} onSubmit={onSubmit} minHeight={"80vh"}>
      <Box
        component={"header"}
        position={"fixed"}
        top={{ xs: 0, md: 25 }}
        right={{ xs: 0, md: 35 }}
        bgcolor={{ xs: "white", md: "transparent" }}
        width={{ xs: "100%", md: "auto" }}
        zIndex={1}
      >
        <Box
          display={"flex"}
          justifyContent={"flex-end"}
          px={{ xs: 1.5, md: 0 }}
          py={{ xs: 1, md: 0 }}
          boxShadow={{ xs: "0px 0.7px 1px rgba(0, 0, 0, 0.1)", md: "none" }}
        >
          <MarkdownSupportPopupAreaContainer />
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
          <Button type="submit" disabled={isSubmitting || isSubmitSuccessful}>
            {isSubmitting || isSubmitSuccessful ? "投稿中..." : "投稿する"}
          </Button>
        </Box>
        {isSmallScreen && (
          <Box px={1.5} py={0.8} boxShadow={"0px 0.7px 1px rgba(0, 0, 0, 0.1)"}>
            <SelectTagPopupContainer
              value={activeTags}
              onTagChange={onTagChange}
            />
          </Box>
        )}
      </Box>
      <Box my={{ xs: 14, md: 10 }} mx={{ xs: 0.5, md: 12 }}>
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
          {!isSmallScreen && (
            <SelectTagPopupContainer
              value={activeTags}
              onTagChange={onTagChange}
            />
          )}
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
                  setSelectedEmoji={onEmojiChange}
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
