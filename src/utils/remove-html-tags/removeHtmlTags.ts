export const removeHtmlTags = (contentWithHtml: string): string => {
  return contentWithHtml.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "");
};
