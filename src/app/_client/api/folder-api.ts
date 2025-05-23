import type { FetchURLOptions, Result } from "../utils/fetchURL";
import { fetchURL } from "../utils/fetchURL";

export type Folder = {
  folderUUID: string;
  name: string;
  countByFolder: number;
};

export const folderAPI = {
  async getFolder(username: string): Promise<Result<Folder[], 404>> {
    const path = `/api/${username}/folder`;
    const options: FetchURLOptions = {
      method: "GET",
      next: { tags: [`${username}-folder`] }
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
  },

  async deleteFolder(
    username: string,
    folderUUID: string
  ): Promise<Result<void, 401>> {
    const path = `/api/${username}/folder/${folderUUID}`;
    const options: FetchURLOptions = {
      method: "DELETE",
      body: {
        folderUUID
      },
      headers: {
        "Content-Type": "application/json"
      }
    };
    return await fetchURL<void, 401>(path, options);
  },

  async updateFolder(
    username: string,
    folderUUID: string,
    name: string
  ): Promise<Result<Folder, 401>> {
    const path = `/api/${username}/folder/${folderUUID}`;
    const options: FetchURLOptions = {
      method: "PATCH",
      body: {
        name
      },
      headers: {
        "Content-Type": "application/json"
      }
    };
    return await fetchURL<Folder, 401>(path, options);
  }
};
