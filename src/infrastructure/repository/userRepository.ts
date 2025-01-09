import prisma from "@/src/lib/prisma";

export const userRepository = {
  async updateUsername(params: { userId: string; username: string }) {
    const { userId, username } = params;

    return prisma.user.update({
      where: {
        id: userId
      },
      data: {
        username: username
      }
    });
  }
};
