import { MarkdownSectionType } from "./MarkDownSection";

export const markdownList: MarkdownSectionType[] = [
  {
    image: "h2.svg",
    title: "## 線付きの見出し",
    description: "線付きで大きいフォントの見出しです。"
  },
  {
    image: "h3.svg",
    title: "### 見出し",
    description: "大きいフォントの見出しです。"
  },
  {
    image: "list.svg",
    title: "- 箇条書きリスト",
    description: "箇条書きリストを作成します。"
  },
  {
    image: "list-number.svg",
    title: "1. 番号付きリスト",
    description: "番号付きリストを作成します。"
  },
  {
    image: "strong.svg",
    title: "**太字** or command + B",
    description:
      "文字を太字にします。(文字の間に使用する場合は最初にスペースが必要)"
  },
  {
    image: "marker.svg",
    title: "==マーカー== or command + U",
    description:
      "文字を黄色でマーキングします。(文字の間に使用する場合は最初にスペースが必要)"
  },
  {
    image: "line.svg",
    title: "--- 水平線",
    description: "資格的に分割するための水平線を作成します。"
  },
  {
    image: "border-left.svg",
    title: "> 引用 or command + shift + B",
    description: "引用する文章を入力します。"
  },
  {
    image: "code.svg",
    title: "``` コードブロック ```",
    description: "コードブロックを作成します。"
  }
];
