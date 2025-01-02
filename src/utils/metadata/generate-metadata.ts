import "server-only";
import type { Metadata } from "next";
import opengraphAPI from "@/src/api/opengraph-api";
import { reflectionAPI } from "@/src/api/reflection-api";

const notFoundMetadata: Metadata = {
  title: "404",
  description: "このページは見つかりません",
  openGraph: {
    type: "website",
    title: "404 | リフティ",
    description: "このページは見つかりません",
    siteName: "リフティ"
  }
};

export const generateMeta = {
  async userReflectionListPage(username: string): Promise<Metadata> {
    const userInformation = await opengraphAPI.getOGPByUsername(username);
    if (userInformation === 404) {
      return notFoundMetadata;
    }
    return {
      title: `${username} | リフティ`,
      description: `${username} has ${userInformation.totalReflections} reflections. Find new insights with refty!`,
      openGraph: {
        type: "website",
        url: `https://www.refty.jp/${username}`,
        title: `${username} | リフティ`,
        description: `${username} has ${userInformation.totalReflections} reflections. Find new insights with refty!`,
        siteName: "リフティ"
      },
      twitter: {
        title: `${username} | リフティ`,
        description: `${username} has ${userInformation.totalReflections} reflections. Find new insights with refty!`,
        card: "summary"
      }
    };
  },

  async reflectionDetailPage(reflectionCUID: string): Promise<Metadata> {
    const reflection = await opengraphAPI.getOGPByCUID(reflectionCUID);
    if (reflection === 404) {
      return notFoundMetadata;
    }
    return {
      title: `${reflection.title} | リフティ`,
      description: `by ${reflection.user.username}`,
      openGraph: {
        type: "website",
        title: `${reflection.title} | リフティ`,
        description: `by ${reflection.user?.username}`,
        siteName: "リフティ"
      },
      twitter: {
        title: `${reflection.title} | リフティ`,
        description: `by ${reflection.user?.username}`,
        card: "summary_large_image"
      }
    };
  },

  async reflectionUpdateFormPage(reflectionCUID: string): Promise<Metadata> {
    const reflection = await reflectionAPI.getReflectionByCUID(reflectionCUID);
    if (reflection === 404) {
      return notFoundMetadata;
    }
    return {
      title: `${reflection.title}を編集 | リフティ`,
      description: `${reflection.title}に関する詳細ページの編集画面です`,
      openGraph: {
        type: "website",
        url: `https://www.refty.jp/${reflectionCUID}`,
        title: `${reflection.title}を編集 | リフティ`,
        description: `${reflection.title}に関する詳細ページの編集画面です`
      },
      twitter: {
        title: `${reflection.title}を編集 | リフティ`,
        description: `${reflection.title}に関する詳細ページの編集画面です`
      }
    };
  }
};
