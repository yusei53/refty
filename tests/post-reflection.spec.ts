import { expect, test } from "@playwright/test";
import { mockAuthSessionCookie } from "@/src/mocks/mockAuthSessionCookie";

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
    // MEMO: クッキーを設定してログイン状態で投稿ページにアクセスできる
    await page.context().addCookies([mockAuthSessionCookie]);
    await page.goto("/post");

    expect(await page.url()).toContain("/post");
  });
});
