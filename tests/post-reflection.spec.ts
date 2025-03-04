import { expect, test } from "@playwright/test";
import { mockAuthSessionCookie } from "@/src/mocks/mockAuthSessionCookie";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  // MEMO: クッキーを設定してログイン状態で投稿ページにアクセスできる
  await page.context().addCookies([mockAuthSessionCookie]);
});

test.describe("投稿系", () => {
  test("テスト環境ではログイン状態で投稿ページにアクセスできる", async ({
    page
  }) => {
    await page.goto("/post");
    expect(await page.url()).toContain("/post");
  });
});
