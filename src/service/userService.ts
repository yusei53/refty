import { userRepository } from "../infrastructure/repository/userRepository";

export const userService = {
  async updateUsername(params: { username: string; userId: string }) {
    const { username, userId } = params;

    return userRepository.updateUsername({
      userId,
      username
    });
  }
};
