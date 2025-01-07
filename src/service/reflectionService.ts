import { reflectionRepository } from "../infrastructure/repository/reflectionRepository";
import { toJST } from "../utils/date-helper";
import prisma from "@/src/lib/prisma";

const COUNT_PER_PAGE = 12;

export const reflectionService = {
  async getAll(page: number, tag?: string) {
    const offset = (page - 1) * COUNT_PER_PAGE;
    const tagFilter = tag ? { [tag]: true } : undefined;

    const filteredCount =
      await reflectionRepository.countPublicReflections(tagFilter);
    const totalPage = Math.ceil(filteredCount / COUNT_PER_PAGE);

    const reflections = await reflectionRepository.getPublicReflectionAll({
      offset,
      limit: COUNT_PER_PAGE,
      tagFilter
    });

    return {
      reflections,
      totalPage
    };
  },

  async getByUsername(
    page: number,
    userId: string,
    isCurrentUser: boolean,
    tag?: string
  ) {
    const offset = (page - 1) * COUNT_PER_PAGE;
    const tagFilter = tag ? { [tag]: true } : undefined;

    const filteredReflectionCount =
      await reflectionRepository.countFilteredReflections({
        userId,
        isCurrentUser,
        tagFilter
      });

    const totalPage = Math.ceil(filteredReflectionCount / COUNT_PER_PAGE);

    const userWithReflections =
      await reflectionRepository.getUserWithReflections({
        userId,
        isCurrentUser,
        tagFilter,
        offset,
        limit: COUNT_PER_PAGE
      });

    // MEMO: タグ別の投稿数を全て取得しておく
    const isLearningCount = await prisma.reflection.count({
      where: {
        userId,
        isLearning: true,
        isPublic: isCurrentUser ? undefined : true
      }
    });
    const isAwarenessCount = await prisma.reflection.count({
      where: {
        userId,
        isAwareness: true,
        isPublic: isCurrentUser ? undefined : true
      }
    });
    const isMonologueCount = await prisma.reflection.count({
      where: {
        userId,
        isMonologue: true,
        isPublic: isCurrentUser ? undefined : true
      }
    });
    const isInputLogCount = await prisma.reflection.count({
      where: {
        userId,
        isInputLog: true,
        isPublic: isCurrentUser ? undefined : true
      }
    });
    const isDailyReflectionCount = await prisma.reflection.count({
      where: {
        userId,
        isDailyReflection: true,
        isPublic: isCurrentUser ? undefined : true
      }
    });

    const tagCountList = {
      isDailyReflection: isDailyReflectionCount,
      isLearning: isLearningCount,
      isAwareness: isAwarenessCount,
      isMonologue: isMonologueCount,
      isInputLog: isInputLogCount
    };

    return {
      userWithReflections,
      totalPage,
      filteredReflectionCount,
      tagCountList
    };
  },

  async getTagCounts() {
    const isDailyReflectionCount =
      await reflectionRepository.countPublicReflections({
        isDailyReflection: true
      });
    const isLearningCount = await reflectionRepository.countPublicReflections({
      isLearning: true
    });
    const isAwarenessCount = await reflectionRepository.countPublicReflections({
      isAwareness: true
    });
    const isMonologueCount = await reflectionRepository.countPublicReflections({
      isMonologue: true
    });
    const isInputLogCount = await reflectionRepository.countPublicReflections({
      isInputLog: true
    });
    const tagCountList = {
      isDailyReflection: isDailyReflectionCount,
      isLearning: isLearningCount,
      isAwareness: isAwarenessCount,
      isMonologue: isMonologueCount,
      isInputLog: isInputLogCount
    };

    return tagCountList;
  },

  async getReflection(reflectionCUID: string) {
    const reflection =
      await reflectionRepository.getReflectionDetail(reflectionCUID);

    if (!reflection) {
      return;
    }

    const reflectionCount = await reflectionRepository.countReflectionsByUserId(
      reflection.userId
    );

    return {
      ...reflection,
      reflectionCount,
      createdAt: reflection.createdAt.toISOString()
    };
  },

  async create(params: {
    title: string;
    content: string;
    charStamp: string;
    isPublic: boolean;
    isDailyReflection: boolean;
    isLearning: boolean;
    isAwareness: boolean;
    isInputLog: boolean;
    isMonologue: boolean;
    userId: string;
  }) {
    const {
      title,
      content,
      charStamp,
      isPublic,
      isDailyReflection,
      isLearning,
      isAwareness,
      isInputLog,
      isMonologue,
      userId
    } = params;

    const now = new Date();
    const jstDate = toJST(now);

    return await reflectionRepository.createReflection({
      title,
      content,
      charStamp,
      isPublic,
      isDailyReflection,
      isLearning,
      isAwareness,
      isInputLog,
      isMonologue,
      createdAt: jstDate,
      userId
    });
  }
};
