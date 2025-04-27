import "server-only";
import type { Metadata } from "next";
import { REFTY } from "./metadata";
import opengraphAPI from "@/src/api/opengraph-api";
import { reflectionAPI } from "@/src/api/reflection-api";

const notFoundMetadata: Metadata = {
  title: "404",
  description: "このページは見つかりません",
  openGraph: {
    type: "website",
    title: `404 | ${REFTY}`,
    description: "このページは見つかりません",
    siteName: REFTY
  }
};

export const generateMeta = {
  async userReflectionListPage(username: string): Promise<Metadata> {
    const userInformation = await opengraphAPI.getOGPByUsername(username);
    if (userInformation === 404) {
      return notFoundMetadata;
    }
    return {
      title: `${username} | ${REFTY}`,
      description: `${username} has ${userInformation.totalReflections} reflections.`,
      openGraph: {
        type: "website",
        url: `https://www.refty.jp/${username}`,
        title: `${username} | ${REFTY}`,
        description: `${username} has ${userInformation.totalReflections} reflections.`,
        siteName: REFTY
      },
      twitter: {
        title: `${username} | ${REFTY}`,
        description: `${username} has ${userInformation.totalReflections} reflections.`,
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
      title: `${reflection.title} | ${REFTY}`,
      description: `by ${reflection.user.username}`,
      openGraph: {
        type: "website",
        title: `${reflection.title} | ${REFTY}`,
        description: `by ${reflection.user?.username}`,
        siteName: REFTY
      },
      twitter: {
        title: `${reflection.title} | ${REFTY}`,
        description: `by ${reflection.user?.username}`,
        card: "summary_large_image"
      }
    };
  },

  async reflectionUpdateFormPage(reflectionCUID: string): Promise<Metadata> {
    const reflection =
      await reflectionAPI.getDetailReflectionByCUID(reflectionCUID);
    if (reflection === 404) {
      return notFoundMetadata;
    }
    return {
      title: `${reflection.title}を編集 | ${REFTY}`,
      description: `${reflection.title}に関する詳細ページの編集画面です`,
      openGraph: {
        type: "website",
        url: `https://www.refty.jp/${reflectionCUID}`,
        title: `${reflection.title}を編集 | ${REFTY}`,
        description: `${reflection.title}に関する詳細ページの編集画面です`
      },
      twitter: {
        title: `${reflection.title}を編集 | ${REFTY}`,
        description: `${reflection.title}に関する詳細ページの編集画面です`
      }
    };
  }
};
