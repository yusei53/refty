export const addIdsToHeadings = (content: string): string => {
  const headingRegex = /<(h[1-6])([^>]*)>(.*?)<\/\1>/gi;

  let idCounter = 0;

  const contentWithIds = content.replace(
    headingRegex,
    (_, tagName, attributes, headingText) => {
      const id = `heading-${idCounter++}`;

      return `<${tagName} id="${id}"${attributes}>${headingText}</${tagName}>`;
    }
  );

  return contentWithIds;
};
