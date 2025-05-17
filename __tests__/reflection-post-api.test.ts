import { request } from "./util/request";
import { requestReflection } from "@/e2e/mocks/reflection/reflection";

describe("未認証ユーザー", () => {
  test("リクエストが拒否され、401エラーが返される", async () => {
    const response = await request.unauthorized.POST(
      "/api/reflection",
      requestReflection
    );
    expect(response).toBe(401);
  });
});

describe("認証済みユーザー", () => {
  test("リクエストが許可され、201が返る", async () => {
    const response = await request.authorized.POST(
      "/api/reflection",
      requestReflection
    );
    expect(response).toBe(201);
  });
});
