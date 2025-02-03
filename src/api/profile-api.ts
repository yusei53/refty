import type { FetchURLOptions } from "../utils/fetchURL";
import type { Result } from "../utils/types/result";
import { fetchURL } from "../utils/fetchURL";

type Username = {
  username: string;
};

export type Profile = {
  image: string;
  bio: string;
  goal: string;
  website: string;
};

export const profileAPI = {
  async getUserProfile(username: string): Promise<Result<Profile, 404>> {
    const path = `/api/${username}/profile-setting`;
    const options: FetchURLOptions = {
      method: "GET",
      next: { tags: [`profile-${username}`] }
    };
    return await fetchURL<Profile, 404>(path, options);
  },
  async updateUsername(username: string): Promise<Result<Username, 401>> {
    const path = `/api/username`;
    const options: FetchURLOptions = {
      method: "PATCH",
      body: {
        username
      },
      headers: {
        "Content-Type": "application/json"
      }
    };
    return await fetchURL<Username, 401>(path, options);
  },

  async updateUserProfile(
    username: string,
    bio: string | null,
    goal: string | null,
    website: string | null
  ): Promise<Result<void, 401>> {
    const path = `/api/${username}/profile-setting`;
    const options: FetchURLOptions = {
      method: "PATCH",
      body: {
        username,
        bio,
        goal,
        website
      },
      headers: {
        "Content-Type": "application/json"
      }
    };
    return await fetchURL<void, 401>(path, options);
  }
};
