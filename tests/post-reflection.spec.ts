import { expect, test } from "@playwright/test";
import { mockAuthSessionCookie } from "@/src/mocks/mockAuthSessionCookie";

test.describe("未認証ユーザー", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.context().clearCookies();
  });

  test("投稿ページにアクセスするとログインページへリダイレクトされる", async ({
    page
  }) => {
    await page.goto("/post");
    expect(await page.url()).toContain("/login");
  });
});

test.describe("認証済みユーザー", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // ログイン状態を再現するためにモックの認証クッキーを追加
    await page.context().addCookies([mockAuthSessionCookie]);
  });

  test("投稿ページに正常にアクセスできる", async ({ page }) => {
    await page.goto("/post");
    expect(await page.url()).toContain("/post");
  });
});
