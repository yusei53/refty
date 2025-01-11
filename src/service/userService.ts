import { userRepository } from "../infrastructure/repository/userRepository";

export const userService = {
  async getProfile(params: { userId: string }) {
    const { userId } = params;
    return userRepository.getUserProfile({ userId });
  },

  async updateProfile(params: {
    userId: string;
    username: string;
    bio: string;
    goal: string;
    website: string;
  }) {
    const { userId, username, bio, goal, website } = params;

    return userRepository.updateUserProfile({
      userId,
      username,
      bio,
      goal,
      website
    });
  },

  async updateUsername(params: { username: string; userId: string }) {
    const { username, userId } = params;

    return userRepository.updateUsername({
      userId,
      username
    });
  }
};
