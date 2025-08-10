import type { RefObject } from "react";
import type { MarkdownEditorRef } from "../../features/routes/post/markdown-editor/MarkdownEditor";
import { reflectionAPI } from "../../api/reflection-api";

type useUploadReflectionImageProps = {
  imageUrls: string[];
  addImageUrl: (url: string) => void;
  editorRef: RefObject<MarkdownEditorRef>;
};

// MEMO: 画像のアップロード処理
export const useUploadReflectionImage = ({
  imageUrls,
  addImageUrl,
  editorRef
}: useUploadReflectionImageProps) => {
  const handleFileUpload = async (file: File) => {
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

    const convertHeicToJpeg = async (file: File) => {
      type Heic2anyOptions = {
        blob: Blob;
        toType?: string;
        quality?: number;
      };
      type Heic2any = (options: Heic2anyOptions) => Promise<Blob>;

      // MEMO: heic2anyライブラリを動的にインポート
      const heic2any = (await import("heic2any")).default as Heic2any;

      const convertedBlob = await heic2any({
        blob: file,
        toType: "image/jpeg",
        quality: 0.9 // MEMO: 5MBに収まるように不具合があれば修正する
      });

      // MEMO: 元ファイル名を維持しつつ拡張子を.jpgへ
      const newName = file.name
        ? file.name.replace(/\.(heic|heif)$/i, ".jpg")
        : `converted-${Date.now()}.jpg`;

      return new File([convertedBlob], newName, {
        type: "image/jpeg"
      });
    };

    try {
      const fileToUpload: File = isHeicOrHeif(file)
        ? await convertHeicToJpeg(file)
        : file;

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

      if (!imageUrl) return;

      editorRef.current?.insertImage(imageUrl);
      addImageUrl(imageUrl);
    } catch (error) {
      console.error("画像アップロードに失敗しました", error);
      alert("画像アップロードに失敗しました");
    }
  };

  return {
    handleFileUpload
  };
};
