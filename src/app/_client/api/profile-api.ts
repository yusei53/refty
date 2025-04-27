import type { FetchURLOptions, Result } from "../utils/fetchURL";
import { fetchURL } from "../utils/fetchURL";

type Username = {
  username: string;
};

type Profile = {
  image: string;
  bio: string;
  goal: string;
  website: string;
};

type ProfileForMyPage = Omit<Profile, "goal">;

type CheckExists = {
  exists: boolean;
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

  async getUserProfileForMyPage(
    username: string
  ): Promise<Result<ProfileForMyPage, 404>> {
    const path = `/api/${username}/profile`;
    const options: FetchURLOptions = {
      method: "GET",
      next: { tags: [`profile-${username}`] }
    };
    return await fetchURL<ProfileForMyPage, 404>(path, options);
  },

  async checkUsernameExists(
    username: string
  ): Promise<Result<CheckExists, 500>> {
    const path = `/api/username/check-exists?username=${username}`;
    const options: FetchURLOptions = {
      method: "GET"
    };
    return await fetchURL<{ exists: boolean }, 500>(path, options);
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
