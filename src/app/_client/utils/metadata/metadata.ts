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
    url: "https://refty.vercel.app/",
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
    title: `${REFTY}とは | ${REFTY}`,
    openGraph: {
      ...baseMetadata.openGraph,
      url: "https://refty.vercel.app/welcome",
      title: `${REFTY}とは | ${REFTY}`
    },
    twitter: {
      ...baseMetadata.twitter,
      title: `${REFTY}とは | ${REFTY}`
    }
  },

  importantPage: {
    ...baseMetadata,
    title: `振り返りの大切さ | ${REFTY}`,
    description: `振り返りの大切さを学ぶページ`,
    openGraph: {
      ...baseMetadata.openGraph,
      url: "https://refty.vercel.app/important",
      title: `振り返りの大切さ | ${REFTY}`,
      description: `振り返りの大切さを学ぶページ`
    },
    twitter: {
      ...baseMetadata.twitter,
      title: `振り返りの大切さ | ${REFTY}`,
      description: `振り返りの大切さを学ぶページ`
    }
  },

  termsPage: {
    ...baseMetadata,
    title: `利用規約 | ${REFTY}`,
    description: `${REFTY}の利用規約のページ`,
    openGraph: {
      ...baseMetadata.openGraph,
      url: "https://refty.vercel.app/terms",
      title: `利用規約 | ${REFTY}`,
      description: `${REFTY}の利用規約のページ`
    },
    twitter: {
      ...baseMetadata.twitter,
      title: `利用規約 | ${REFTY}`,
      description: `${REFTY}の利用規約のページ`
    }
  },

  settingUsernamePage: {
    ...baseMetadata,
    title: `ユーザーネーム設定 | ${REFTY}`,
    description: `${REFTY}のユーザーネーム設定ページ`,
    openGraph: {
      ...baseMetadata.openGraph,
      url: "https://refty.vercel.app/settings/username",
      title: `ユーザーネーム設定 | ${REFTY}`,
      description: `${REFTY}のユーザーネーム設定ページ`
    },
    twitter: {
      ...baseMetadata.twitter,
      title: `ユーザーネーム設定 | ${REFTY}`,
      description: `${REFTY}のユーザーネーム設定ページ`
    }
  },

  settingProfilePage: {
    ...baseMetadata,
    title: `プロフィール設定 | ${REFTY}`,
    description: `${REFTY}のプロフィール設定ページ`,
    openGraph: {
      ...baseMetadata.openGraph,
      url: "https://refty.vercel.app/settings/profile",
      title: `プロフィール設定 | ${REFTY}`,
      description: `${REFTY}のプロフィール設定ページ`
    },
    twitter: {
      ...baseMetadata.twitter,
      title: `プロフィール設定 | ${REFTY}`,
      description: `${REFTY}のプロフィール設定ページ`
    }
  },

  loginFormPage: {
    ...baseMetadata,
    title: `ログイン | ${REFTY}`,
    description: `${REFTY}のログインページ`,
    openGraph: {
      ...baseMetadata.openGraph,
      url: "https://refty.vercel.app/login",
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
    title: `投稿作成 | ${REFTY}`,
    description: `${REFTY}の投稿作成ページ`,
    openGraph: {
      ...baseMetadata.openGraph,
      url: "https://refty.vercel.app/post",
      title: `投稿作成 | ${REFTY}`,
      description: `${REFTY}の投稿作成ページ`
    },
    twitter: {
      ...baseMetadata.twitter,
      title: `投稿作成 | ${REFTY}`,
      description: `${REFTY}の投稿作成ページ`
    }
  },

  reflectionsBookPage(username: string) {
    return {
      ...baseMetadata,
      title: `${username}さんの振り返りブック | ${REFTY}`,
      description: `${username}さんだけの振り返りブックページ`,
      openGraph: {
        type: "website",
        url: `https://refty.vercel.app/${username}`,
        title: `${username}さんの振り返りブック | ${REFTY}`,
        description: `${username}さんだけの振り返りブックページ`,
        siteName: REFTY
      },
      twitter: {
        title: `${username}さんの振り返りブック | ${REFTY}`,
        description: `${username}さんだけの振り返りブックページ`
      }
    };
  },

  reportPage(username: string) {
    return {
      ...baseMetadata,
      title: `${username}さんのレポート | ${REFTY}`,
      description: `${username}さんのレポートページ`,
      openGraph: {
        type: "website",
        url: `https://refty.vercel.app/${username}/report`,
        title: `${username}さんのレポート | ${REFTY}`,
        description: `${username}さんのレポートページ`,
        siteName: REFTY
      },
      twitter: {
        title: `${username}さんのレポート | ${REFTY}`,
        description: `${username}さんのレポートページ`
      }
    };
  }
};
