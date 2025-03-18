import { expect, test } from "@playwright/test";
import { authJwt } from "@/e2e/mocks/auth/authJwt";
import { authSessionCookie } from "@/e2e/mocks/auth/authSessionCookie";

test.describe("未認証ユーザー", () => {
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
  });

  test("指定したユーザーネームが存在しない場合、404エラーが返される", async ({
    page
  }) => {
    const response = await page.request.get("/api/username/report/all-content");
    expect(response.status()).toBe(404);
  });
});

test.describe("認証済みユーザー", () => {
  test.beforeEach(async ({ page }) => {
    await page.context().addCookies([authSessionCookie]);
  });

  test("200が返される", async ({ page }) => {
    const decodedJwt = await authJwt.decode();
    if (!decodedJwt) {
      throw new Error("decodedJwt is null");
    }
    const response = await page.request.get(
      `/api/${decodedJwt.username}/report/all-content`
    );
    expect(response.status()).toBe(200);
  });
});
