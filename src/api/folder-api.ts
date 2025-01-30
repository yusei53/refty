import { fetchURL, FetchURLOptions } from "../utils/fetchURL";
import { Result } from "../utils/types/result";

export type Folder = {
  folderUUID: string;
  name: string;
};

export const folderAPI = {
  async getFolder(username: string): Promise<Result<Folder[], 404>> {
    const path = `/api/${username}/folder`;
    const options: FetchURLOptions = {
      method: "GET"
    };
    return await fetchURL<Folder[], 404>(path, options);
  },

  async createFolder(
    username: string,
    name: string
  ): Promise<Result<void, 401>> {
    const path = `/api/${username}/folder`;
    const options: FetchURLOptions = {
      method: "POST",
      body: {
        name
      },
      headers: {
        "Content-Type": "application/json"
      }
    };
    return await fetchURL<void, 401>(path, options);
  }
};
