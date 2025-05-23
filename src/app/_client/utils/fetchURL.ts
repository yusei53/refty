import type { ErrorCode, HTTPMethod } from "@/src/app/_shared/type/httpMethod";

export type FetchURLOptions = {
  method: HTTPMethod;
  cache?: RequestCache;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
  headers?: HeadersInit;
  next?: {
    revalidate?: number;
    tags?: string[];
  };
};

export type Result<T, E = number> = T | E;

const defaultURL = process.env.NEXT_PUBLIC_ROOT_URL;

export async function fetchURL<T, E extends ErrorCode>(
  path: string,
  options: FetchURLOptions
): Promise<Result<T, E>> {
  try {
    const response = await fetch(`${defaultURL}${path}`, {
      ...options,
      headers: {
        ...options.headers
      },
      body: options.body ? JSON.stringify(options.body) : undefined
    });

    if (!response.ok) {
      switch (response.status) {
        case 400:
        case 401:
        case 403:
        case 404:
        case 500:
          return response.status as E;
        default:
          return 500 as E;
      }
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    return 500 as E;
  }
}
