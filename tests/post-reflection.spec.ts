import { expect, test } from "@playwright/test";
import { testSessionCookie } from "@/src/mocks/testCookies";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("投稿系", () => {
  test("ログインしていない時投稿できない", async ({ page }) => {
    await page.goto("/post");
    await page.goto("/login");
    expect(await page.url()).toContain("/login");
  });

  test("テスト環境ではログイン状態で投稿ページにアクセスできる", async ({
    page
  }) => {
    await page.context().addCookies([testSessionCookie]);
    await page.goto("/post");

    expect(await page.url()).toContain("/post");
  });
});
