import { reflectionRepository } from "../infrastructure/repository/reflectionRepository";
import { toJST } from "../utils/date-helper";
import { notFoundError } from "../utils/http-error";
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

  // MEMO: 結構複雑なので、コメント多め
  async getCountByUsername(userId: string) {
    const total =
      await reflectionRepository.getTotalReflectionsByUserId(userId);
    const reflectionsDateGroup =
      await reflectionRepository.getReflectionsDateByUserId(userId);

    const formatDate = (createdAt: Date) =>
      createdAt.toISOString().split("T")[0];

    // NOTE: 日付ごとにグループ化して投稿数を計算(groupBy)
    const countPerDate: DateCountMap = reflectionsDateGroup.reduce(
      (dateCounts, currentValue) => {
        const date = formatDate(currentValue.createdAt);

        // NOTE: 存在する日付の場合はカウントを増やす
        if (dateCounts[date]) {
          dateCounts[date] = dateCounts[date] + 1;
        } else {
          dateCounts[date] = 1;
        }

        return dateCounts;
      },
      // NOTE: initialValue(初期値)として空のオブジェクトを渡す
      {} as DateCountMap
    );

    // NOTE: 配列に変換
    const reflectionsPerDate = Object.entries(countPerDate).map(
      ([date, countReflections]) => ({ date, countReflections })
    );

    return {
      total,
      reflectionsPerDate
    };
  },

  async getByUsername(
    userId: string,
    isCurrentUser: boolean,
    page: number,
    tag?: string,
    folderUUID?: string
  ) {
    const offset = (page - 1) * COUNT_PER_PAGE;
    const tagFilter = tag ? { [tag]: true } : undefined;
    const folderFilter = folderUUID ?? undefined;

    const filteredReflectionCount =
      await reflectionRepository.countFilteredReflections({
        userId,
        isCurrentUser,
        tagFilter,
        folderFilter
      });

    const totalPage = Math.ceil(filteredReflectionCount / COUNT_PER_PAGE);

    const userWithReflections =
      await reflectionRepository.getUserWithReflections({
        userId,
        isCurrentUser,
        tagFilter,
        folderFilter,
        offset,
        limit: COUNT_PER_PAGE
      });

    // MEMO: タグ別の投稿数を全て取得しておく
    const isPublic = isCurrentUser ? undefined : true;
    const isDailyReflectionCount =
      await reflectionRepository.countSelectedTagReflectionsByUserId(
        userId,
        isPublic,
        {
          isDailyReflection: true
        }
      );

    const isLearningCount =
      await reflectionRepository.countSelectedTagReflectionsByUserId(
        userId,
        isPublic,
        { isLearning: true }
      );

    const isAwarenessCount =
      await reflectionRepository.countSelectedTagReflectionsByUserId(
        userId,
        isPublic,
        { isAwareness: true }
      );

    const isMonologueCount =
      await reflectionRepository.countSelectedTagReflectionsByUserId(
        userId,
        isPublic,
        { isMonologue: true }
      );

    const isInputLogCount =
      await reflectionRepository.countSelectedTagReflectionsByUserId(
        userId,
        isPublic,
        {
          isInputLog: true
        }
      );

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

  async getDetail(reflectionCUID: string) {
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
  },

  async update(params: {
    reflectionCUID: string;
    title: string;
    content: string;
    charStamp: string;
    isPublic: boolean;
    isDailyReflection: boolean;
    isLearning: boolean;
    isAwareness: boolean;
    isInputLog: boolean;
    isMonologue: boolean;
  }) {
    const {
      reflectionCUID,
      title,
      content,
      charStamp,
      isPublic,
      isDailyReflection,
      isLearning,
      isAwareness,
      isInputLog,
      isMonologue
    } = params;

    const reflection = await prisma.reflection.findUnique({
      where: { reflectionCUID }
    });

    if (!reflection) {
      return notFoundError("振り返りが見つかりません");
    }

    return await reflectionRepository.updateReflection({
      reflectionCUID,
      title,
      content,
      charStamp,
      isPublic,
      isDailyReflection,
      isLearning,
      isAwareness,
      isInputLog,
      isMonologue
    });
  },

  async delete(reflectionCUID: string) {
    return await reflectionRepository.deleteReflection(reflectionCUID);
  },

  async updatePinned(reflectionCUID: string, isPinned: boolean) {
    return await reflectionRepository.updatePinnedStatus({
      reflectionCUID,
      isPinned
    });
  },

  async updatePublic(reflectionCUID: string, isPublic: boolean) {
    return await reflectionRepository.updatePublicStatus({
      reflectionCUID,
      isPublic
    });
  }
};

type DateCountMap = Record<string, number>;
