import type { Prisma } from "@prisma/client";
import prisma from "@/src/app/_shared/lib/prisma";

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

  async getTotalReflectionsByUserId(userId: string) {
    return prisma.reflection.count({
      where: {
        userId
      }
    });
  },

  async getReflectionsDateByUserId(userId: string) {
    return prisma.reflection.findMany({
      where: {
        userId
      },
      select: {
        createdAt: true
      }
    });
  },

  async getUserReflections(params: {
    userId: string;
    isCurrentUser: boolean;
    tagFilter?: Record<string, boolean>;
    folderFilter?: string;
    offset?: number;
    limit?: number;
    isDetailMode: boolean;
  }) {
    const {
      userId,
      isCurrentUser,
      tagFilter,
      folderFilter,
      offset,
      limit,
      isDetailMode
    } = params;
    return prisma.reflection.findMany({
      where: {
        userId,
        isPublic: isCurrentUser ? undefined : true,
        ...tagFilter,
        folderUUID: folderFilter
      },
      orderBy: isDetailMode
        ? [{ createdAt: "desc" }]
        : [{ isPinned: "desc" }, { createdAt: "desc" }],
      ...(offset !== undefined &&
        limit !== undefined && { take: limit, skip: offset }),
      select: {
        title: true,
        reflectionCUID: true,
        charStamp: true,
        createdAt: true,
        isPublic: true,
        isPinned: true,
        content: isDetailMode
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

  async countSelectedTagReflectionsByUserId(
    userId: string,
    isPublic: boolean | undefined,
    tagFilter: Record<string, boolean>
  ) {
    return prisma.reflection.count({
      where: {
        userId,
        isPublic,
        ...tagFilter
      }
    });
  },

  async countFilteredReflections(params: {
    userId: string;
    isCurrentUser: boolean;
    tagFilter?: Record<string, boolean>;
    folderFilter?: string;
  }) {
    const { userId, isCurrentUser, tagFilter, folderFilter } = params;
    return await prisma.reflection.count({
      where: {
        userId,
        isPublic: isCurrentUser ? undefined : true,
        ...tagFilter,
        folderUUID: folderFilter
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
        folderUUID: true,
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
    folderUUID?: string;
    imageUrls?: string[];
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
      userId,
      folderUUID,
      imageUrls
    } = params;

    return prisma.$transaction(async (transaction) => {
      const createdReflection = await transaction.reflection.create({
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
          userId,
          folderUUID
        }
      });

      if (imageUrls && imageUrls.length > 0) {
        await transaction.reflectionImage.createMany({
          data: imageUrls.map((imageUrl: string, index: number) => ({
            reflectionCUID: createdReflection.reflectionCUID,
            imageUrl,
            orderIndex: index
          }))
        });
      }
      return createdReflection;
    });
  },

  async getReflectionRecord(reflectionCUID: string) {
    return prisma.reflection.findUnique({
      where: { reflectionCUID }
    });
  },

  async getReflectionsByDate(
    userId: string,
    isCurrentUser: boolean,
    dateFilter?: Record<string, Prisma.DateTimeFilter<"Reflection">>
  ) {
    return prisma.reflection.findMany({
      where: {
        userId,
        isPublic: isCurrentUser ? undefined : true,
        ...dateFilter
      }
    });
  },

  async updateReflection(params: {
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
    folderUUID?: string;
    addImageUrls?: string[];
    deleteImageUrls?: string[];
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
      isMonologue,
      folderUUID,
      addImageUrls,
      deleteImageUrls
    } = params;

    // MEMO: 画像の差分（追加と削除）についてトランザクション内で処理
    return prisma.$transaction(async (transaction) => {
      const updatedReflection = await transaction.reflection.update({
        where: { reflectionCUID },
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
          folderUUID
        }
      });
      if (addImageUrls && addImageUrls.length > 0) {
        await transaction.reflectionImage.createMany({
          data: addImageUrls.map((imageUrl: string, index: number) => ({
            reflectionCUID,
            imageUrl,
            orderIndex: index
          }))
        });
      }
      if (deleteImageUrls && deleteImageUrls.length > 0) {
        await transaction.reflectionImage.deleteMany({
          where: {
            reflectionCUID,
            imageUrl: {
              in: deleteImageUrls
            }
          }
        });
      }
      return updatedReflection;
    });
  },

  async deleteReflection(reflectionCUID: string) {
    return prisma.reflection.delete({
      where: { reflectionCUID }
    });
  },

  async updatePinnedStatus(params: {
    reflectionCUID: string;
    isPinned: boolean;
  }) {
    const { reflectionCUID, isPinned } = params;

    return prisma.reflection.update({
      where: { reflectionCUID },
      data: { isPinned }
    });
  },

  async updatePublicStatus(params: {
    reflectionCUID: string;
    isPublic: boolean;
  }) {
    const { reflectionCUID, isPublic } = params;

    return prisma.reflection.update({
      where: { reflectionCUID },
      data: { isPublic }
    });
  },

  async getReflectionContent(userId: string) {
    return prisma.reflection.findMany({
      where: {
        userId
      },
      select: {
        content: true
      }
    });
  },

  async getPublicPrivateCount(userId: string) {
    return await prisma.reflection.groupBy({
      by: ["isPublic"],
      where: {
        userId
      },
      _count: {
        _all: true
      }
    });
  }
};
