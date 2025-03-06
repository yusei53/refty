import { expect, test } from "@playwright/test";
import { authSessionCookie } from "@/e2e/mocks/auth/authSessionCookie";
import { requestReflection } from "@/e2e/mocks/reflection/reflection";

test.describe("未認証ユーザー", () => {
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
  });

  test("リクエストが拒否され、401エラーが返される", async ({ page }) => {
    const response = await page.request.post("/api/reflection", {
      data: requestReflection
    });
    expect(response.status()).toBe(401);
  });
});

test.describe("認証済みユーザー", () => {
  test.beforeEach(async ({ page }) => {
    await page.context().addCookies([authSessionCookie]);
  });

  test("リクエストが許可され、201が返る", async ({ page }) => {
    const response = await page.request.post("/api/reflection", {
      data: requestReflection
    });
    expect(response.status()).toBe(201);
  });
});
