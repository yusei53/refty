import "server-only";
import type { Metadata } from "next";

export const REFTY = "リフティ";
const siteName = `${REFTY} | 振り返りプラットフォーム`;
const description = "日々の振り返りを手助けする振り返りプラットフォーム";

const baseMetadata: Metadata = {
  title: {
    default: siteName,
    template: `%s | ${REFTY}`
  },
  description: description,
  openGraph: {
    type: "website",
    url: "https://www.refty.jp/",
    title: siteName,
    description: description,
    siteName: REFTY
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
    title: `${REFTY}とは`,
    openGraph: {
      ...baseMetadata.openGraph,
      url: "https://www.refty.jp/welcome",
      title: `${REFTY}とは | ${REFTY}`
    },
    twitter: {
      ...baseMetadata.twitter,
      title: `${REFTY}とは | ${REFTY}`
    }
  },

  settingUsernamePage: {
    ...baseMetadata,
    title: "ユーザーネーム設定",
    description: `${REFTY}のユーザーネーム設定ページ`,
    openGraph: {
      ...baseMetadata.openGraph,
      url: "https://www.refty.jp/setting/username",
      title: `ユーザーネーム設定 | ${REFTY}`,
      description: `${REFTY}のユーザーネーム設定ページ`
    },
    twitter: {
      ...baseMetadata.twitter,
      title: `ユーザーネーム設定 | ${REFTY}`,
      description: `${REFTY}のユーザーネーム設定ページ`
    }
  },

  loginFormPage: {
    ...baseMetadata,
    title: "ログイン",
    description: `${REFTY}のログインページ`,
    openGraph: {
      ...baseMetadata.openGraph,
      url: "https://www.refty.jp/login",
      title: `ログイン | ${REFTY}`,
      description: `${REFTY}のログインページ`
    },
    twitter: {
      ...baseMetadata.twitter,
      title: `ログイン | ${REFTY}`,
      description: `${REFTY}のログインページ`
    }
  },

  reflectionPostFormPage: {
    ...baseMetadata,
    title: "投稿作成",
    description: `${REFTY}の投稿作成ページ`,
    openGraph: {
      ...baseMetadata.openGraph,
      url: "https://www.refty.jp/post",
      title: `投稿作成 | ${REFTY}`,
      description: `${REFTY}の投稿作成ページ`
    },
    twitter: {
      ...baseMetadata.twitter,
      title: `投稿作成 | ${REFTY}`,
      description: `${REFTY}の投稿作成ページ`
    }
  }
};
