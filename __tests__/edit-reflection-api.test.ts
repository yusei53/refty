import fetch from "node-fetch";
import { authSessionCookie } from "@/e2e/mocks/auth/authSessionCookie";
import {
  reflection,
  requestReflection,
  yusei53Reflection
} from "@/e2e/mocks/reflection/reflection";

const BASE_URL = process.env.NEXT_PUBLIC_ROOT_URL || "http://localhost:3000";

const createAuthHeaders = () => ({
  "Content-Type": "application/json",
  Cookie: `${authSessionCookie.name}=${authSessionCookie.value}; Path=/; Domain=${process.env.NEXT_PUBLIC_ROOT_URL ? new URL(process.env.NEXT_PUBLIC_ROOT_URL).hostname : "localhost"}`
});

describe("未認証ユーザー", () => {
  test("編集ページにアクセスした場合、401エラーが返される", async () => {
    const response = await fetch(
      `${BASE_URL}/api/reflection/detail/${reflection.reflectionCUID}/edit`
    );
    expect(response.status).toBe(401);
  });

  test("編集するリクエストが飛ばされた場合、401エラーが返される", async () => {
    const response = await fetch(
      `${BASE_URL}/api/reflection/detail/${reflection.reflectionCUID}/edit`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestReflection)
      }
    );
    expect(response.status).toBe(401);
  });
});

describe("認証済みユーザー", () => {
  test("指定されたreflectionCUIDが自身の投稿でなく、編集ページにアクセスした場合、403エラーが返される", async () => {
    const response = await fetch(
      `${BASE_URL}/api/reflection/detail/${yusei53Reflection.reflectionCUID}/edit`,
      {
        headers: createAuthHeaders()
      }
    );
    expect(response.status).toBe(403);
  });

  test("指定されたreflectionCUIDが存在せず、編集ページにアクセスした場合、404エラーが返される", async () => {
    const response = await fetch(
      `${BASE_URL}/api/reflection/detail/not-exist-reflection-cuid/edit`,
      {
        headers: createAuthHeaders()
      }
    );
    expect(response.status).toBe(404);
  });

  test("指定されたreflectionCUIDが自身の投稿であり、編集ページにアクセスした場合、200が返される", async () => {
    const response = await fetch(
      `${BASE_URL}/api/reflection/detail/${reflection.reflectionCUID}/edit`,
      {
        headers: createAuthHeaders()
      }
    );
    expect(response.status).toBe(200);
  });

  test("指定されたreflectionCUIDが自身の投稿でなく、編集するリクエストが飛ばされた場合、403エラーが返される", async () => {
    const response = await fetch(
      `${BASE_URL}/api/reflection/detail/${yusei53Reflection.reflectionCUID}/edit`,
      {
        method: "PATCH",
        headers: createAuthHeaders(),
        body: JSON.stringify(requestReflection)
      }
    );
    expect(response.status).toBe(403);
  });

  test("指定されたreflectionCUIDが存在せず、編集するリクエストが飛ばされた場合、404エラーが返される", async () => {
    const response = await fetch(
      `${BASE_URL}/api/reflection/detail/not-exist-reflection-cuid/edit`,
      {
        method: "PATCH",
        headers: createAuthHeaders(),
        body: JSON.stringify(requestReflection)
      }
    );
    expect(response.status).toBe(404);
  });

  test("指定されたreflectionCUIDが自身の投稿であり、編集するリクエストが飛ばされた場合、200が返される", async () => {
    const response = await fetch(
      `${BASE_URL}/api/reflection/detail/${reflection.reflectionCUID}/edit`,
      {
        method: "PATCH",
        headers: createAuthHeaders(),
        body: JSON.stringify(requestReflection)
      }
    );
    expect(response.status).toBe(200);
  });
});
