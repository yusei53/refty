import supabase from "@/src/app/_shared/lib/supabase";

export type UploadReflectionImageItem = {
  file: File;
  path: string;
};

export const reflectionImageRepository = {
  /**
   * 1画像をSupabase Storageにアップロードし、公開URLを返す
   * @param uploadItem - { file, path }
   * @returns 公開URL（失敗時はnull）
   */
  async uploadImage({
    file,
    path
  }: UploadReflectionImageItem): Promise<string | null> {
    try {
      const { error } = await supabase.storage
        .from("refty-storage")
        .upload(path, file);

      if (error) {
        console.error("Upload error:", file.name, error);
        return null;
      }

      // アップロード成功後、公開URLを取得
      const { data: reflectionImageUrlData } = supabase.storage
        .from("refty-storage")
        .getPublicUrl(path);

      if (!reflectionImageUrlData?.publicUrl) {
        console.error("Failed to get public URL:", path);
        return null;
      }

      return reflectionImageUrlData.publicUrl;
    } catch (err) {
      console.error("Upload promise error:", file.name, err);
      return null;
    }
  }
};
