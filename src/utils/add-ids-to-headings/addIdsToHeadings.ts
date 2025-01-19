export const addIdsToHeadings = (content: string): string => {
  const headingRegex = /<(h[1-6])([^>]*)>(.*?)<\/\1>/gi;

  let idCounter = 0;

  // MEMO: h1~h6のタグに'heading-${number}'というidをidが被らないように追加
  const contentWithIds = content.replace(
    headingRegex,
    // MEMO: （正規表現にマッチした文字列）、タグ名、属性、タグの中身
    (_, tagName, attributes, headingText) => {
      const id = `heading-${idCounter++}`;

      // MEMO: <h1 id="heading-0">{目次}</h1>のようなタグに置き換えて返す
      return `<${tagName} id="${id}"${attributes}>${headingText}</${tagName}>`;
    }
  );

  return contentWithIds;
};
