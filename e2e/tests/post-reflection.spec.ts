import { expect, test } from "@playwright/test";
import { authSessionCookie } from "@/e2e/mocks/auth/authSessionCookie";

test.describe("未認証ユーザー", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.context().clearCookies();
  });

  test("投稿ページにアクセスするとログインページへリダイレクトされる", async ({
    page
  }) => {
    await page.goto("/post");
    expect(page.url()).toContain("/login");
  });
});

test.describe("認証済みユーザー", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // NOTE:ログイン状態を再現するためにモックの認証クッキーを追加
    await page.context().addCookies([authSessionCookie]);
  });

  test("投稿ページに正常にアクセスできる", async ({ page }) => {
    await page.goto("/post");
    expect(page.url()).toContain("/post");
  });
});
