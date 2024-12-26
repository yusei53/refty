import { headers } from "next/headers";

export const getHeaders = (): HeadersInit | undefined => {
  return Object.fromEntries(headers());
};
