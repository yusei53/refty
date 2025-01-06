import { reflectionRepository } from "../infrastructure/repository/reflectionRepository";
import { toJST } from "../utils/date-helper";

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
