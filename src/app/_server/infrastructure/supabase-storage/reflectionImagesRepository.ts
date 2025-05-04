import supabase from "@/src/app/_shared/lib/supabase";

export type UploadReflectionImageItem = {
  file: File;
  path: string;
};

export const reflectionImagesRepository = {
  /**
   * 複数画像をSupabase Storageに並列アップロードし、公開URLの配列を返す
   * @param uploadItems - { file, path }の配列
   * @returns 公開URLの配列（失敗時はnull）
   */
  async uploadImages(
    uploadReflectionImageItems: UploadReflectionImageItem[]
  ): Promise<(string | null)[]> {
    const reflectionImageUploadPromises = uploadReflectionImageItems.map(
      async ({ file, path }) => {
        try {
          const { error } = await supabase.storage
            .from("refty-storage")
            .upload(path, file);

          if (error) {
            console.error("Upload error:", file.name, error);
            return null;
          }

          // アップロード成功後、公開URLを取得
          const { data: reflectionImageUrls } = supabase.storage
            .from("refty-storage")
            .getPublicUrl(path);

          if (!reflectionImageUrls?.publicUrl) {
            console.error("Failed to get public URL:", path);
            return null;
          }

          return reflectionImageUrls.publicUrl;
        } catch (err) {
          console.error("Upload promise error:", file.name, err);
          return null;
        }
      }
    );

    return Promise.all(reflectionImageUploadPromises);
  }
};
