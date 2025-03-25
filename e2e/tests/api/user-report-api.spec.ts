import { expect, test } from "@playwright/test";
import { authSessionCookie } from "@/e2e/mocks/auth/authSessionCookie";
import { refty } from "@/e2e/mocks/auth/user";

test.describe("未認証ユーザー", () => {
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
  });

  test("指定したユーザーネームが存在しない場合、404エラーが返される", async ({
    page
  }) => {
    const responseAllContent = await page.request.get(
      "/api/abcdef/report/all-content"
    );
    expect(responseAllContent.status()).toBe(404);

    const responsePublicPrivate = await page.request.get(
      "/api/abcdef/report/public-private-reflection"
    );
    expect(responsePublicPrivate.status()).toBe(404);

    const responseProfile = await page.request.get(
      "/api/abcdef/report/profile"
    );
    expect(responseProfile.status()).toBe(404);

    const responseReflectionTime = await page.request.get(
      "/api/abcdef/report/reflection-time"
    );
    expect(responseReflectionTime.status()).toBe(404);

    const responseTagCount = await page.request.get(
      "/api/abcdef/report/tag-count"
    );
    expect(responseTagCount.status()).toBe(404);
  });
});

test.describe("認証済みユーザー", () => {
  test.beforeEach(async ({ page }) => {
    await page.context().addCookies([authSessionCookie]);
  });

  test("200が返される", async ({ page }) => {
    const responseAllContent = await page.request.get(
      `/api/${refty.username}/report/all-content`
    );
    expect(responseAllContent.status()).toBe(200);

    const responsePublicPrivate = await page.request.get(
      `/api/${refty.username}/report/public-private-reflection`
    );
    expect(responsePublicPrivate.status()).toBe(200);

    const responseProfile = await page.request.get(
      `/api/${refty.username}/report/profile`
    );
    expect(responseProfile.status()).toBe(200);

    const responseReflectionTime = await page.request.get(
      `/api/${refty.username}/report/reflection-time`
    );
    expect(responseReflectionTime.status()).toBe(200);

    const responseTagCount = await page.request.get(
      `/api/${refty.username}/report/tag-count`
    );
    expect(responseTagCount.status()).toBe(200);
  });
});
