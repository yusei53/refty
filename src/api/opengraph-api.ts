import { fetchURL, FetchURLOptions } from "../utils/fetchURL";
import { Result } from "../utils/types/result";

type UserInformation = {
  totalReflections: string;
  user: {
    image: string;
  };
};

type ReflectionInformation = {
  title: string;
  user: {
    image: string;
    username: string;
  };
};

const opengraphAPI = {
  async getOGPByUsername(
    username: string
  ): Promise<Result<UserInformation, 404>> {
    const path = `/api/${username}/ogp`;
    const options: FetchURLOptions = {
      method: "GET",
      cache: "no-store"
    };
    return await fetchURL<UserInformation, 404>(path, options);
  },

  async getOGPByCUID(
    refectionCUID: string
  ): Promise<Result<ReflectionInformation, 404>> {
    const path = `/api/ogp/${refectionCUID}`;
    const options: FetchURLOptions = {
      method: "GET",
      cache: "no-store"
    };
    return await fetchURL<ReflectionInformation, 404>(path, options);
  }
};

export default opengraphAPI;
