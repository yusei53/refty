import prisma from "@/src/lib/prisma";

export const opengraphRepository = {
  async getTotalReflections(userId: string) {
    return await prisma.reflection.count({
      where: {
        userId
      }
    });
  },

  async getUserImage(userId: string) {
    return await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        image: true
      }
    });
  },

  async getReflection(reflectionCUID: string) {
    return await prisma.reflection.findUnique({
      where: {
        reflectionCUID
      },
      select: {
        title: true,
        user: {
          select: { image: true, username: true }
        }
      }
    });
  }
};
