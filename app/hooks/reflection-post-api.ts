import { ReflectionPosts } from "../types/types";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

const reflectionPostsAPI = {
  async getReflectionPosts(): Promise<ReflectionPosts[]> {
    const response = await fetch(`${baseURL}/api/post`, {
      method: "GET",
    });
    return response.json();
  },
};

export default reflectionPostsAPI;
