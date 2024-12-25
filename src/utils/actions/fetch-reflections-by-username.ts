"use server";
import { headers } from "next/headers";
import { fetchURL, type FetchURLOptions } from "../fetchURL";

type Reflection = {
  reflectionCUID: string;
  title: string;
  charStamp: string;
  isPublic: boolean;
  isPinned: boolean;
  isDailyReflection: boolean;
  isLearning: boolean;
  isAwareness: boolean;
  isInputLog: boolean;
  isMonologue: boolean;
  createdAt: string;
};

type Reflections = {
  userImage: string;
  reflections: Reflection[];
  totalPage: number;
};

export const fetchReflectionsByUsername = async (
  username: string,
  page: number = 1
) => {
  const path = `/api/reflection/${username}?page=${page}`;
  const options: FetchURLOptions = {
    method: "GET",
    next: { tags: [`reflections-${username}`] },
    headers: Object.fromEntries(headers())
  };
  return await fetchURL<Reflections, 404>(path, options);
};
