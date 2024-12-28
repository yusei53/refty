import "server-only";
import type { Metadata } from "next";

const siteName = "リフティ | 振り返りプラットフォーム";
const description = "日々の振り返りを手助けする振り返りプラットフォーム";

const baseMetadata: Metadata = {
  title: {
    default: siteName,
    template: "%s | リフティ"
  },
  description: description,
  openGraph: {
    type: "website",
    url: "https://www.refty.jp/",
    title: siteName,
    description: description,
    siteName: "リフティ"
  },
  twitter: {
    title: siteName,
    description: description,
    card: "summary"
  }
};

export const meta = {
  rootPage: baseMetadata,

  welcomePage: {
    ...baseMetadata,
    title: "リフティとは",
    openGraph: {
      ...baseMetadata.openGraph,
      url: "https://www.refty.jp/welcome",
      title: "リフティとは | リフティ"
    },
    twitter: {
      ...baseMetadata.twitter,
      title: "リフティとは | リフティ"
    }
  },

  settingUsernamePage: {
    ...baseMetadata,
    title: "ユーザーネーム設定",
    description: "リフティのユーザーネーム設定ページ",
    openGraph: {
      ...baseMetadata.openGraph,
      url: "https://www.refty.jp/setting/username",
      title: "ユーザーネーム設定 | リフティ",
      description: "リフティのユーザーネーム設定ページ"
    },
    twitter: {
      ...baseMetadata.twitter,
      title: "ユーザーネーム設定 | リフティ",
      description: "リフティのユーザーネーム設定ページ"
    }
  },

  loginFormPage: {
    ...baseMetadata,
    title: "ログイン",
    description: "リフティのログインページ",
    openGraph: {
      ...baseMetadata.openGraph,
      url: "https://www.refty.jp/login",
      title: "ログイン | リフティ",
      description: "リフティのログインページ"
    },
    twitter: {
      ...baseMetadata.twitter,
      title: "ログイン | リフティ",
      description: "リフティのログインページ"
    }
  },

  reflectionPostFormPage: {
    ...baseMetadata,
    title: "投稿作成",
    description: "リフティの投稿作成ページ",
    openGraph: {
      ...baseMetadata.openGraph,
      url: "https://www.refty.jp/post",
      title: "投稿作成 | リフティ",
      description: "リフティの投稿作成ページ"
    },
    twitter: {
      ...baseMetadata.twitter,
      title: "投稿作成 | リフティ",
      description: "リフティの投稿作成ページ"
    }
  }
};
