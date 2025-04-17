import "server-only";
import { headers } from "next/headers";

export const getHeaders = async (): Promise<HeadersInit | undefined> => {
  const headersList = await headers();
  return Object.fromEntries(headersList);
};
