import prisma from "@/src/lib/prisma";

export const userRepository = {
  async getUserProfile(params: { userId: string }) {
    const { userId } = params;

    return prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        image: true,
        bio: true,
        goal: true,
        website: true
      }
    });
  },

  async getUserProfileForReport(params: { username: string }) {
    const { username } = params;

    return prisma.user.findUnique({
      where: { username },
      select: {
        image: true,
        bio: true,
        website: true
      }
    });
  },

  async updateUserProfile(params: {
    userId: string;
    username: string;
    bio: string;
    goal: string;
    website: string;
  }) {
    const { userId, username, bio, goal, website } = params;

    return prisma.user.update({
      where: {
        id: userId
      },
      data: {
        username,
        bio,
        goal,
        website
      }
    });
  },

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
