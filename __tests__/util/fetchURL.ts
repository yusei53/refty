import fetch from "node-fetch";
import { authSessionCookie } from "@/e2e/mocks/auth/authSessionCookie";

const BASE_URL = "http://localhost:3000";

const createAuthHeaders = () => ({
  "Content-Type": "application/json",
  Cookie: `${authSessionCookie.name}=${authSessionCookie.value}`
});

const fetchURL = async (path: string, isAuth: boolean = false) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: "GET",
    headers: isAuth ? createAuthHeaders() : undefined
  });

  return response.status;
};

export const request: {
  unauthorized: {
    get: (path: string) => Promise<number>;
  };
  authorized: {
    get: (path: string) => Promise<number>;
  };
} = {
  unauthorized: {
    get: (path: string) => fetchURL(path)
  },
  authorized: {
    get: (path: string) => fetchURL(path, true)
  }
};
