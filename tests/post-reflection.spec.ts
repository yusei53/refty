import { expect, test } from "@playwright/test";

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
    // クッキーを手動で設定
    //TODO: クッキーの処理をヘルパーにしてどこからでも呼び出せるようにする
    const testSessionCookie = {
      name: "next-auth.session-token",
      value: "dummy",
      domain: "localhost",
      path: "/",
      httpOnly: true,
      secure: false,
      sameSite: "Lax" as const
    };

    await page.context().addCookies([testSessionCookie]);
    await page.goto("/post");

    expect(await page.url()).toContain("/post");
  });
});
