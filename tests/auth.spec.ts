import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("認証系", () => {
  test("ログインしていない時投稿ページにアクセスできない", async ({ page }) => {
    await page.goto("/post");
    await page.goto("/login");
    expect(await page.url()).toContain("/login");
  });
});
