import { useEffect, useState } from "react";
import * as tocbot from "tocbot";

export const useCreateTableOfContents = () => {
  const [tocArray, setTocArray] = useState<{ href: string; title: string }[]>(
    []
  );

  useEffect(() => {
    tocbot.init({
      tocSelector: ".toc",
      contentSelector: ".content",
      headingSelector: "h1, h2, h3, h4"
    });

    // MEMO:DOMから目次の情報を抽出
    const tocLinks = document.querySelectorAll(".toc-link");
    const tocLinksArray = Array.from(tocLinks).map((link) => ({
      href: link.getAttribute("href") || "",
      title: link.textContent || ""
    }));
    setTocArray(tocLinksArray);

    return () => tocbot.destroy();
  }, []);

  return {
    tocArray
  };
};
