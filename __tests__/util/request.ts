import fetch from "node-fetch";
import { authSessionCookie } from "@/e2e/mocks/auth/authSessionCookie";

const API_CONFIG = {
  BASE_URL: "http://localhost:3000",
  CONTENT_TYPE: "application/json"
} as const;

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

type RequestOptions = {
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: string;
};

type StatusCode = 200 | 201 | 400 | 401 | 403 | 404;

type RequestHandler = {
  GET: (path: string) => Promise<StatusCode>;
  POST: (path: string, body: Record<string, unknown>) => Promise<StatusCode>;
  PATCH: (path: string, body: Record<string, unknown>) => Promise<StatusCode>;
};

type Request = {
  unauthorized: RequestHandler;
  authorized: RequestHandler;
};

const createAuthHeaders = (): Record<string, string> => ({
  "Content-Type": API_CONFIG.CONTENT_TYPE,
  Cookie: `${authSessionCookie.name}=${authSessionCookie.value}`
});

const createRequestOptions = (
  method: HttpMethod,
  isAuth: boolean,
  body?: Record<string, unknown>
): RequestOptions => ({
  method,
  headers: isAuth ? createAuthHeaders() : undefined,
  body: body ? JSON.stringify(body) : undefined
});

const fetchRequest = async (
  path: string,
  options: RequestOptions
): Promise<StatusCode> => {
  const response = await fetch(`${API_CONFIG.BASE_URL}${path}`, options);
  return response.status as StatusCode;
};

export const request: Request = {
  unauthorized: {
    GET: (path: string) =>
      fetchRequest(path, createRequestOptions("GET", false)),
    POST: (path: string, body: Record<string, unknown>) =>
      fetchRequest(path, createRequestOptions("POST", false, body)),
    PATCH: (path: string, body: Record<string, unknown>) =>
      fetchRequest(path, createRequestOptions("PATCH", false, body))
  },
  authorized: {
    GET: (path: string) =>
      fetchRequest(path, createRequestOptions("GET", true)),
    POST: (path: string, body: Record<string, unknown>) =>
      fetchRequest(path, createRequestOptions("POST", true, body)),
    PATCH: (path: string, body: Record<string, unknown>) =>
      fetchRequest(path, createRequestOptions("PATCH", true, body))
  }
};
