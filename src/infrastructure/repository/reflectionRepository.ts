import prisma from "@/src/lib/prisma";

export const reflectionRepository = {
  async getPublicReflectionAll(params: {
    offset: number;
    limit: number;
    tagFilter?: Record<string, boolean>;
  }) {
    const { offset, limit, tagFilter } = params;

    return prisma.reflection.findMany({
      where: {
        isPublic: true,
        ...tagFilter
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
      select: {
        title: true,
        reflectionCUID: true,
        charStamp: true,
        createdAt: true,
        isPublic: true,
        user: {
          select: {
            username: true,
            image: true
          }
        }
      }
    });
  },

  async countPublicReflections(tagFilter?: Record<string, boolean>) {
    return prisma.reflection.count({
      where: {
        isPublic: true,
        ...tagFilter
      }
    });
  },

  async getReflectionDetail(reflectionCUID: string) {
    return prisma.reflection.findUnique({
      where: { reflectionCUID },
      select: {
        title: true,
        content: true,
        charStamp: true,
        isPublic: true,
        isDailyReflection: true,
        isLearning: true,
        isAwareness: true,
        isInputLog: true,
        isMonologue: true,
        aiFeedback: true,
        createdAt: true,
        userId: true,
        user: {
          select: { image: true, username: true }
        }
      }
    });
  },

  async countReflectionsByUserId(userId: string) {
    return prisma.reflection.count({
      where: { userId }
    });
  },

  async createReflection(params: {
    title: string;
    content: string;
    charStamp: string;
    isPublic: boolean;
    isDailyReflection: boolean;
    isLearning: boolean;
    isAwareness: boolean;
    isInputLog: boolean;
    isMonologue: boolean;
    createdAt: Date;
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
      createdAt,
      userId
    } = params;

    return prisma.reflection.create({
      data: {
        title,
        content,
        charStamp,
        isPublic,
        isDailyReflection,
        isLearning,
        isAwareness,
        isInputLog,
        isMonologue,
        createdAt,
        userId
      }
    });
  }
};
