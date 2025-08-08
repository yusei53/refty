import { useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { Box, Stack } from "@mui/material";
import type { MarkdownEditorRef } from "../../routes/post/markdown-editor";
import type { Folder } from "@/src/app/_client/api/folder-api";
import type {
  Control,
  FieldErrors,
  UseFormReset,
  UseFormWatch
} from "react-hook-form";
import { reflectionAPI } from "../../../api/reflection-api";
import { useAutoSave } from "../../../hooks/reflection/useAutoSave";
import EmojiPicker from "../../routes/post/emoji/EmojiPicker";
import { ImageUploadButton } from "../../routes/post/image-upload/ImageUploadButton";
import { MarkdownEditor } from "../../routes/post/markdown-editor";
import { BGMSettingPopupAreaContainer } from "../../routes/post/popup/BGM-setting/BGMSettingPopupAreaContainer";
import { DraftPopupAreaContainer } from "../../routes/post/popup/draft/DraftPopupAreaContainer";
import { FolderSettingPopupAreaContainer } from "../../routes/post/popup/folder-setting";
import { MarkdownSupportPopupAreaContainer } from "../../routes/post/popup/markdown-support";
import { PublishSettingPopupAreaContainer } from "../../routes/post/popup/publish-setting";
import {
  REFLECTION_TEMPLATES,
  ReflectionTemplatePopupAreaContainer
} from "../../routes/post/popup/reflection-template";
import { SelectTagPopupContainer } from "../../routes/post/popup/select-tag/SelectTagContainer";
import { ErrorMessage } from "@/src/app/_client/components/alert";
import {
  BirdAnimation,
  RainAnimation,
  StarAnimation
} from "@/src/app/_client/components/animation";
import { Button } from "@/src/app/_client/components/button";
import { CustomInput } from "@/src/app/_client/components/input";
import { useExtractTrueTags } from "@/src/app/_client/hooks/reflection-tag/useExtractTrueTags";
import { useResponsive } from "@/src/app/_client/hooks/responsive/useResponsive";

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
  folderUUID?: string | null;
  imageUrls?: string[];
};

type ReflectionPostFormProps = {
  control: Control<FormValues>;
  isSubmitting: boolean;
  isSubmitSuccessful: boolean;
  errors: FieldErrors<FormValues>;
  onSubmit: (event: React.FormEvent) => Promise<void>;
  selectedEmoji: string;
  onEmojiChange: (emoji: string) => void;
  selectedFolderUUID: string | null;
  onFolderChange: (folderUUID: string | null) => void;
  onTagChange: (tag: string, isSelected: boolean) => void;
  // NOTE: ここから下はUpdateReflectionFormでのみ使用
  isDailyReflection?: boolean;
  isLearning?: boolean;
  isAwareness?: boolean;
  isInputLog?: boolean;
  isMonologue?: boolean;
  folders: Folder[];
  playTrack: (track: string) => void;
  stop: () => void;
  currentTrack: string | null;
  getBGMName: () => string;
  isNightMode: boolean;
  setIsNightMode: (isNightMode: boolean) => void;
  addImageUrl: (url: string) => void;
  imageUrls: string[];
  handleEditorChange: (editorContent: string) => void;
  watch: UseFormWatch<FormValues>;
  reset: UseFormReset<FormValues>;
  isPostPage?: boolean;
};

const ReflectionPostForm: React.FC<ReflectionPostFormProps> = ({
  control,
  isSubmitting,
  isSubmitSuccessful,
  errors,
  onSubmit,
  selectedEmoji,
  onEmojiChange,
  selectedFolderUUID,
  onFolderChange,
  onTagChange,
  isDailyReflection = false,
  isLearning = false,
  isAwareness = false,
  isInputLog = false,
  isMonologue = false,
  folders,
  playTrack,
  stop,
  currentTrack,
  getBGMName,
  isNightMode,
  setIsNightMode,
  addImageUrl,
  imageUrls,
  handleEditorChange,
  watch,
  reset,
  isPostPage = false
}) => {
  const [isComposing, setIsComposing] = useState(false);
  const editorRef = useRef<MarkdownEditorRef>(null);
  const { isMobile } = useResponsive();

  const activeTags = useExtractTrueTags({
    isDailyReflection,
    isLearning,
    isAwareness,
    isInputLog,
    isMonologue
  });

  const { deleteDraft, draftList, currentDraftId, handleDraftChange } =
    useAutoSave(watch, isSubmitSuccessful, reset);

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

  const animationWithSelectedBGM = () => {
    switch (currentTrack) {
      case "bird":
        return <BirdAnimation />;
      case "rain":
        return <RainAnimation />;
      case "star":
        return <StarAnimation />;
      default:
        return null;
    }
  };

  const toggleNightMode = () => setIsNightMode(!isNightMode);

  const handleInsertImage = async (file: File) => {
    // TODO: 切り出し

    // NOTE: 画像の投稿上限を5つに制限
    if (imageUrls.length >= 5) {
      console.error("画像の投稿上限に達しています");
      alert("画像の投稿上限に達しています");
      return;
    }

    // MEMO: HEIC/HEIFかどうかをMIMEタイプと拡張子の両方で判定
    const isHeicOrHeif: (file: File) => boolean = (file) => {
      const mime = (file.type || "").toLowerCase();
      const name = (file.name || "").toLowerCase();
      return (
        mime === "image/heic" ||
        mime === "image/heif" ||
        name.endsWith(".heic") ||
        name.endsWith(".heif")
      );
    };

    let fileToUpload: File = file;

    // NOTE: HEIC/HEIFの場合はクライアントでJPEGに変換してからアップロード
    if (isHeicOrHeif(file)) {
      try {
        // MEMO: heic2anyライブラリを動的にインポート
        const heic2any = (await import("heic2any")).default as (options: {
          blob: Blob;
          toType?: string;
          quality?: number;
        }) => Promise<Blob>;

        const convertedBlob = await heic2any({
          blob: file,
          toType: "image/jpeg",
          quality: 0.9
        });

        // MEMO: 元ファイル名を維持しつつ拡張子を.jpgへ
        const newName = file.name
          ? file.name.replace(/\.(heic|heif)$/i, ".jpg")
          : `converted-${Date.now()}.jpg`;

        fileToUpload = new File([convertedBlob], newName, {
          type: "image/jpeg"
        });
      } catch (error) {
        console.error("HEIC/HEIF の変換に失敗しました", error);
        alert("HEIC/HEIF 画像の変換に失敗しました。別の画像をご利用ください。");
        return;
      }
    }

    // NOTE: 画像のサイズを5MBに制限（アップロード対象のファイルに対してチェック）
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (fileToUpload.size > MAX_FILE_SIZE) {
      console.error("画像のサイズが5MBを超えています");
      alert("画像のサイズが5MBを超えています");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileToUpload);

    const res = await reflectionAPI.uploadReflectionImage(formData);

    if (res === 401) {
      console.error("画像アップロードに失敗しました");
      return;
    }

    const imageUrl = res.imageUrl;
    if (imageUrl) {
      editorRef.current?.insertImage(imageUrl);
    }
    addImageUrl(imageUrl);
  };

  return (
    <>
      {animationWithSelectedBGM()}
      <Box
        component={"form"}
        onSubmit={onSubmit}
        minHeight={"80vh"}
        position={"relative"}
        zIndex={1}
        sx={{
          color: isNightMode ? "white !important" : "",
          "& *": { color: isNightMode ? "inherit" : "" }
        }}
      >
        <Box
          component={"header"}
          position={"fixed"}
          top={{ xs: 0, md: 24 }}
          right={{ xs: 0, md: 35 }}
          bgcolor={{ xs: isNightMode ? "black" : "white", md: "transparent" }}
          width={{ xs: "100%", md: "96%" }}
          zIndex={1}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            px={{ xs: 1.5, md: 0 }}
            py={{ xs: 1, md: 0 }}
            boxShadow={{
              xs: "0px 0.7px 1px rgba(0, 0, 0, 0.1)",
              md: "none"
            }}
          >
            <Box display={"flex"}>
              {!isMobile && (
                <>
                  <MarkdownSupportPopupAreaContainer />
                  <BGMSettingPopupAreaContainer
                    currentTrack={currentTrack ?? ""}
                    playTrack={playTrack}
                    stop={stop}
                    isNightMode={isNightMode}
                    toggleNightMode={toggleNightMode}
                    getBGMName={getBGMName}
                  />

                  {isPostPage && (
                    <DraftPopupAreaContainer
                      draftList={draftList}
                      currentDraftId={currentDraftId}
                      onDraftChange={handleDraftChange}
                      deleteDraft={deleteDraft}
                    />
                  )}
                </>
              )}
            </Box>
            <Box display={"flex"}>
              <ImageUploadButton onImageSelect={handleInsertImage} />
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
              <Button
                type="submit"
                disabled={isSubmitting || isSubmitSuccessful}
              >
                {isSubmitting || isSubmitSuccessful ? "投稿中..." : "投稿する"}
              </Button>
            </Box>
          </Box>
          {isMobile && (
            <Box
              px={1.5}
              py={0.8}
              boxShadow={"0px 0.7px 1px rgba(0, 0, 0, 0.1)"}
              display={"flex"}
              gap={2}
              whiteSpace={"nowrap"}
              sx={{
                overflowX: "auto",
                "&::-webkit-scrollbar": {
                  display: "none"
                }
              }}
            >
              <SelectTagPopupContainer
                value={activeTags}
                onTagChange={onTagChange}
              />
              <Controller
                name="folderUUID"
                control={control}
                render={({ field }) => (
                  <FolderSettingPopupAreaContainer
                    selectedFolderUUID={selectedFolderUUID}
                    setSelectedFolderUUID={(value) => {
                      onFolderChange(value);
                      field.onChange(value);
                    }}
                    folders={folders}
                  />
                )}
              />
              {isPostPage && (
                <DraftPopupAreaContainer
                  draftList={draftList}
                  currentDraftId={currentDraftId}
                  onDraftChange={handleDraftChange}
                  deleteDraft={deleteDraft}
                />
              )}
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
                    style={{ backgroundColor: "transparent" }}
                  />
                  {errors.title && (
                    <ErrorMessage message={errors.title.message} />
                  )}
                </Box>
              )}
            />
            {!isMobile && (
              <Box display={"flex"} gap={2} sx={{ color: "black !important" }}>
                <SelectTagPopupContainer
                  value={activeTags}
                  onTagChange={onTagChange}
                />
                <Controller
                  name="folderUUID"
                  control={control}
                  render={({ field }) => (
                    <FolderSettingPopupAreaContainer
                      selectedFolderUUID={selectedFolderUUID}
                      setSelectedFolderUUID={(value) => {
                        onFolderChange(value);
                        field.onChange(value);
                      }}
                      folders={folders}
                    />
                  )}
                />
              </Box>
            )}
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <Box>
                  <MarkdownEditor
                    value={field.value}
                    ref={editorRef}
                    onChange={(editorContent) => {
                      handleEditorChange(editorContent);
                      field.onChange(editorContent);
                    }}
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
    </>
  );
};

export default ReflectionPostForm;
