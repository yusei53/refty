import type { FetchURLOptions } from "./fetchURL";

const defaultURL = process.env.NEXT_PUBLIC_ROOT_URL;

export async function fetchURLDirect<T>(
  path: string,
  options: FetchURLOptions
): Promise<T> {
  const response = await fetch(`${defaultURL}${path}`, {
    ...options,
    headers: {
      ...options.headers
    }
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data as T;
}
