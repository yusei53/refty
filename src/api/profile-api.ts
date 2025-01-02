import type { FetchURLOptions } from "../utils/fetchURL";
import type { Result } from "../utils/types/result";
import { fetchURL } from "../utils/fetchURL";

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
      next: { tags: ["profile-setting"] }
    };
    return await fetchURL<Profile, 404>(path, options);
  }
};
