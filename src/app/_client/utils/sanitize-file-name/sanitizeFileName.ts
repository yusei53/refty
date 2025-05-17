// MEMO: ファイル名を安全な形式に変換する関数
export const sanitizeFileName = (fileName: string): string => {
  // MEMO: 拡張子を取得
  const extension = fileName.split(".").pop() || "";
  // MEMO: 拡張子を除いたファイル名を取得
  const nameWithoutExt = fileName.slice(0, fileName.lastIndexOf("."));

  // MEMO: ファイル名を安全な形式に変換
  const sanitized = nameWithoutExt
    // MEMO: 日本語を英数字に変換（例：スクリーンショット → screenshot）
    .replace(/[^\x00-\x7F]/g, "")
    // MEMO: スペースをハイフンに変換
    .replace(/\s+/g, "-")
    // MEMO: 特殊文字を除去
    .replace(/[^a-zA-Z0-9-]/g, "")
    // MEMO: 連続するハイフンを1つに
    .replace(/-+/g, "-")
    // MEMO: 先頭と末尾のハイフンを除去
    .replace(/^-+|-+$/g, "")
    // MEMO: 小文字に変換
    .toLowerCase();

  return `${sanitized}.${extension}`;
};
